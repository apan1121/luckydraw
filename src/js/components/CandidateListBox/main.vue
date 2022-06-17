<template>
    <div id="CandidateListBox" ref="box" class="modal" tabindex="-1"
        role="dialog"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-user-edit"></i>
                        編輯名單
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="height: 60vh">
                    <div class="form-group" style="display: flex;align-items: stretch;flex-direction: column;height: 100%">
                        <div class="alert alert-primary" role="alert" style="flex: none;">
                            請一行一行條列輸入候選名單
                        </div>
                        <textarea
                            v-model="candidateListTextarea"
                            name="candidateListTextarea"
                            class="form-control"
                            placeholder="姓名,職位"
                            style="flex: 1"
                        ></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button" class="btn btn-warning" @click="randomSort">
                            打亂排序
                        </button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="save">
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { trackJS } from 'lib/common/util';
import { mapMutations, mapGetters } from 'vuex';

// import { mixpanel } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {},
    filters: {},
    props: {},
    data(){
        return {
            candidateListTextarea: '',
        };
    },
    computed: {
        ...mapGetters([
            'triggerOpenCandidateList',
            'candidateList',
            'candidateList_sort',
        ]),
    },
    watch: {
        triggerOpenCandidateList: {
            immediate: true,
            handler(){
                const that = this;
                if (that.triggerOpenCandidateList) {
                    $(that.$refs.box).modal('show');
                } else {
                    $(that.$refs.box).modal('hide');
                }
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            const candidateList = JSON.parse(JSON.stringify(that.candidateList));
            let candidateListTextarea = [];
            candidateList.forEach((info) => {
                const data = [];
                data.push(info.name);
                if (!!info.pos) {
                    data.push(info.pos);
                }
                candidateListTextarea.push(data.join(','));
            });
            candidateListTextarea = candidateListTextarea.join('\n');
            that.candidateListTextarea = candidateListTextarea;
            trackJS.mixpanel('CandidateListOpen_click');
        });

        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('CandidateListClose_click');
        });

        if (that.triggerOpenCandidateList) {
            $(that.$refs.box).modal('show');
        } else {
            $(that.$refs.box).modal('hide');
        }
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapMutations({
            setCandidateListInput: 'setCandidateListInput',
            setCandidateListRandomSort: 'setCandidateListRandomSort',
        }),
        save(){
            const that = this;
            const params = {
                candidateListInput: JSON.parse(JSON.stringify(that.candidateListTextarea)),
            };
            that.setCandidateListInput(params);
            trackJS.mixpanel('CandidateListSave_click', that.candidateList);
            $(that.$refs.box).modal('hide');
        },
        randomSort(){
            const that = this;
            that.setCandidateListRandomSort();
            trackJS.mixpanel('CandidateListRandom_click', that.candidateList_sort);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>