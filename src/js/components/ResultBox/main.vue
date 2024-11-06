<template>
    <div>
        <div id="ResultBox" ref="box" class="modal result-modal" tabindex="-1"
            role="dialog"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-vote-yea"></i>
                            中獎名單
                        </h5>
                        <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">排序方式</span>
                                    </div>
                                    <select v-model="sortType" class="form-control">
                                        <template v-for="(val, key) in sortTypeOptions">
                                            <option :key="key" :value="key" v-text="val"></option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <template v-if="ResultList.length > 0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width: 15%;">
                                            #
                                        </th>
                                        <th style="width: 30%;">
                                            姓名
                                        </th>
                                        <th>獎項</th>
                                        <th style="width: 20%;">
                                            功能
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(resultInfo, resultIndex) in ResultList">
                                        <template v-if="editCandidateInfo.sn === resultInfo.sn">
                                            <tr :key="resultInfo.sn">
                                                <th scope="row">
                                                    <select v-model="editCandidateInfo.haveAward" class="form-control">
                                                        <option v-for="(luckyName, luckyValue) in luckyOption" :key="luckyValue" :value="luckyValue">
                                                            {{ luckyName }}
                                                        </option>
                                                    </select>
                                                </th>
                                                <td>
                                                    <div>{{ resultInfo.name }}</div>
                                                    <div>
                                                        <small>{{ resultInfo.pos }}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <input v-model="editCandidateInfo.award_title" class="form-control">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info" @click="save()">
                                                        <i class="fas fa-save"></i>
                                                    </button>
                                                    <button class="btn btn-warning" @click="editCandidateInfo = false">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr :key="resultInfo.sn">
                                                <th scope="row">
                                                    {{ luckyOption[resultInfo.haveAward] }}
                                                </th>
                                                <td>
                                                    <div>{{ resultInfo.name }}</div>
                                                    <div>
                                                        <small>{{ resultInfo.pos }}</small>
                                                    </div>
                                                </td>
                                                <td>{{ !!resultInfo.award_title ? resultInfo.award_title : '--' }}</td>
                                                <td>
                                                    <button class="btn btn-success" @click="openEdit(resultInfo)">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </template>
                                    </template>
                                </tbody>
                            </table>
                            <google-support :trigger="triggerOpenResult"></google-support>
                        </template>
                        <h4 v-else class="text-center p-3">
                            無任何可下載的內容
                        </h4>
                    </div>
                    <div class="modal-footer">
                        <div class="col-6 text-left">
                        </div>
                        <div class="col-6 text-right">
                            <button type="button"
                                class="btn btn-primary download-btn"
                                :disabled="ResultList.length === 0"
                                @click="download"
                            >
                                下載
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div ref="download" class="modal result-modal" tabindex="-1"
            role="dialog"
            data-backdrop="static" data-keyboard="false"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p class="text-center mb-3" style="font-size: 50px;">
                            <i class="fa-spin fas fa-sync"></i>
                        </p>
                        <h5 class="text-center" style="font-size: 30px;">
                            資料處理中
                        </h5>
                        <google-support v-if="showGooglSupport"></google-support>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as Papa from 'papaparse';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { string, trackJS } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        GoogleSupport: () => import('components/GoogleSupport/main.vue'),
    },
    filters: {},
    props: {},
    data(){
        return {
            ResultList: [],
            luckyOption: {
                false: '未中獎',
                true: '中獎',
            },
            editCandidateInfo: false,
            showGooglSupport: false,

            sortType: 'candidateIndex',
            sortTypeOptions: {
                prizeIndex: '獎項順序',
                candidateIndex: '候選名單順序',
            },
        };
    },
    computed: {
        ...mapGetters([
            'config',
            'triggerOpenResult',
            'candidateList',
            'prizeList',
            'prizeMapping',
        ]),
    },
    watch: {
        triggerOpenResult(){
            const that = this;
            if (that.triggerOpenResult) {
                $(that.$refs.box).modal('show');
            } else {
                $(that.$refs.box).modal('hide');
            }
        },
        sortType: {
            immediate: true,
            handler(){
                const that = this;
                that.formatResultList();
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            // mixpanel.track('open result');
            that.formatResultList();
            trackJS.mixpanel('ResultOpen_click');
            trackJS.gtag('event', 'ResultOpen_click');
        });

        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('ResultClose_click');
            trackJS.gtag('event', 'ResultClose_click');
        });

        $(that.$refs.download).bind('shown.bs.modal', () => {
            that.showGooglSupport = true;
        });

        $(that.$refs.download).bind('hidden.bs.modal', () => {
            that.showGooglSupport = false;
        });


        if (that.triggerOpenResult) {
            $(that.$refs.box).modal('show');
        } else {
            $(that.$refs.box).modal('hide');
        }
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            setCandidateInfo: 'setCandidateInfo',
        }),
        formatResultList(){
            const that = this;
            clearTimeout(that.formatResultListTimer);

            that.formatResultListTimer = setTimeout(() => {
                const { sortType, prizeList } = that;
                const prizeMapping = JSON.parse(JSON.stringify(that.prizeMapping));
                let ResultList = [];
                let candidateList = JSON.parse(JSON.stringify(that.candidateList));
                candidateList = candidateList.filter(item => item.del === false);

                const candidatePadWithZeroLength = `${candidateList.length}`.length;
                const prizePadWithZeroLength = `${prizeList.length}`.length;

                candidateList.forEach((item, candidateIndex) => {
                    const candidateInfo = item;
                    const award = [];
                    const award_title = [];
                    let award_index = false;
                    candidateInfo.award.forEach((prize_sn) => {
                        if (prizeMapping[prize_sn] && 1) {
                            award.push(prize_sn);
                            award_title.push(prizeMapping[prize_sn].title);
                            award_index = prizeMapping[prize_sn].index;
                        }
                    });
                    candidateInfo.award = award;
                    candidateInfo.award_title = award_title.join(',');
                    candidateInfo.haveAward = award.length > 0;
                    candidateInfo.award_index = award_index;

                    const sort_index = [];
                    sort_index.push(candidateInfo.haveAward ? 0 : 1);
                    switch (sortType) {
                        case 'prizeIndex':
                            sort_index.push(that.padWithZeros(award_index, prizePadWithZeroLength));
                            sort_index.push(that.padWithZeros(candidateIndex, candidatePadWithZeroLength));
                            break;
                        default:
                        case 'candidateIndex':
                            sort_index.push(that.padWithZeros(candidateIndex, candidatePadWithZeroLength));
                            break;
                    }
                    candidateInfo.sort_index = sort_index.join(':');

                    ResultList.push(candidateInfo);
                });

                ResultList = ResultList.sort((a, b) => {
                    if (a.sort_index > b.sort_index) {
                        return 1;
                    }

                    if (a.sort_index === b.sort_index) {
                        return 0;
                    }

                    return -1;
                });
                that.ResultList = ResultList;
            });
        },
        openEdit(candidateInfo){
            trackJS.mixpanel('ResultEdit_click', candidateInfo);
            trackJS.gtag('event', 'ResultEdit_click', candidateInfo);
            this.editCandidateInfo = candidateInfo;
        },
        save(){
            const that = this;
            const prizeList = JSON.parse(JSON.stringify(that.prizeList));
            const prizeListTitle = {};
            prizeList.forEach((item) => {
                prizeListTitle[item.title] = item;
            });

            const award = [];
            if (that.editCandidateInfo.haveAward === 'true') {
                const award_titles = that.editCandidateInfo.award_title.split(',');
                award_titles.forEach((award_title) => {
                    award_title = award_title.trim();
                    if (!!prizeListTitle[award_title] && 1) {
                        award.push(prizeListTitle[award_title].prize_sn);
                    }
                });
            }

            const params = {
                sn: that.editCandidateInfo.sn,
                name: that.editCandidateInfo.name,
                pos: that.editCandidateInfo.pos,
                award,
                del: that.editCandidateInfo.del,
            };
            that.setCandidateInfo(params);
            that.editCandidateInfo = false;
            that.formatResultList();
            trackJS.mixpanel('ResultEditSave_click', params);
            trackJS.gtag('event', 'ResultEditSave_click', params);
        },
        download(){
            const that = this;
            $(that.$refs.box).modal('hide');
            $(that.$refs.download).modal('show');
            clearTimeout(that.downloadTimer);
            const waitTime = string.randRange(2000, 5000);
            that.downloadTimer = setTimeout(() => {
                const csv = Papa.unparse(that.ResultList, {
                    header: [
                        '姓名', '職位', '獎項',
                    ],
                    columns: [
                        'name',
                        'pos',
                        'award_title',
                    ],
                });
                const csvContent = `data:text/csv;charset=utf-8,${csv}`;
                const encodedUri = encodeURI(csvContent);

                const link = document.createElement('a');
                link.style.display = 'none';
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `${that.config.webTitle}中獎名單.csv`);
                document.body.appendChild(link); // Required for FF
                link.click();

                trackJS.mixpanel('ResultDownload_click', { csv });
                trackJS.gtag('event', 'ResultDownload_click', { csv });

                $(that.$refs.box).modal('show');
                $(that.$refs.download).modal('hide');
            }, waitTime);
        },
        padWithZeros(num, totalLength){
            return String(num).padStart(totalLength, '0');
        },
    },
};
</script>
<style lang="scss" scoped>
</style>