<template>
    <div ref="box" class="modal" tabindex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-box-open"></i>
                        抽獎列表
                    </h5>
                </div>
                <div class="modal-body">
                    <h6 class="pb-2">
                        發現你有建立過 {{ luckyDrawChooseList.length }} 個抽獎活動
                    </h6>
                    <div class="lucky-draw-choose-list">
                        <template v-for="(luckyDrawChoose, luckyDrawChooseIndex) in luckyDrawChooseList">
                            <div :key="luckyDrawChooseIndex" class="lucky-draw-choose-item mb-3">
                                <div class="lucky-draw-choose-text" @click="chooseLuckDraw(luckyDrawChooseIndex)">
                                    {{ luckyDrawChoose.title }}
                                </div>
                                <div class="lucky-draw-choose-del" @click="removeLuckDraw(luckyDrawChooseIndex)">
                                    <i class="fas fa-trash-alt"></i>
                                </div>
                            </div>
                        </template>
                    </div>

                    <h6 class="pb-2">
                        或建立一組新的抽獎活動
                    </h6>

                    <template v-if="createDefaultLuckyDrawFlag === false">
                        <button
                            type="button"
                            class="btn btn-warning btn-lg btn-block"
                            @click="createDefaultLuckyDrawFlag = true"
                        >
                            建立新抽獎活動
                        </button>
                    </template>
                    <template v-else>
                        <div class="input-group input-group-lg mb-3">
                            <div class="input-group-prepend">
                                <span id="basic-addon2" class="input-group-text">活動名稱</span>
                            </div>
                            <input v-model="LuckyDrawName"
                                type="text"
                                class="form-control"
                                placeholder="活動名稱"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-info" type="button" @click="create">
                                    建立
                                </button>
                            </div>
                        </div>
                    </template>

                    <hr>
                    <google-support></google-support>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

import { popup, trackJS } from 'lib/common/util';
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
            createDefaultLuckyDrawFlag: false,
            LuckyDrawName: '',
        };
    },
    computed: {
        ...mapGetters([
            'luckyDrawChooseList',
        ]),
    },
    watch: {
        luckyDrawChooseList: {
            deep: true,
            immediate: true,
            handler(){
                if (this.luckyDrawChooseList.length > 0) {
                    this.$nextTick(() => {
                        $(this.$refs.box).modal('show');
                    });
                } else {
                    $(this.$refs.box).modal('hide');
                }
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            trackJS.mixpanel('LuckyDrawStorageOpen_click');
            trackJS.gtag('event', 'LuckyDrawStorageOpen_click');
        });

        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('LuckyDrawStorageClose_click');
            trackJS.gtag('event', 'LuckyDrawStorageClose_click');
        });
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            createDefaultLuckyDraw: 'createDefaultLuckyDraw',
            chooseLuckDrawFromStorage: 'chooseLuckDrawFromStorage',
            removeLuckDrawFromStorage: 'removeLuckDrawFromStorage',
        }),
        chooseLuckDraw(index){
            const that = this;
            const luckyDrawChoose = that.luckyDrawChooseList[index];
            trackJS.mixpanel('LuckyDrawStorageActionChoose_click', luckyDrawChoose);
            trackJS.gtag('event', 'LuckyDrawStorageActionChoose_click', luckyDrawChoose);
            that.chooseLuckDrawFromStorage(luckyDrawChoose.key);
        },
        removeLuckDraw(index){
            const that = this;
            const luckyDrawChoose = that.luckyDrawChooseList[index];
            popup.warning({
                html: `你確定要刪除 ${luckyDrawChoose.title} 此筆抽獎嗎？<br><div class="text-danger">刪除後將無法回復</div>`,
            }, () => {
                that.removeLuckDrawFromStorage(luckyDrawChoose.key);
                trackJS.mixpanel('LuckyDrawStorageActionRemove_click', luckyDrawChoose);
                trackJS.gtag('event', 'LuckyDrawStorageActionRemove_click', luckyDrawChoose);
            });
        },
        create(){
            const that = this;
            const parmas = {
                LuckyDrawName: that.LuckyDrawName,
            };
            that.createDefaultLuckyDraw(parmas);
            trackJS.mixpanel('LuckyDrawStorageActionCreate_click', parmas);
            trackJS.gtag('event', 'LuckyDrawStorageActionCreate_click', parmas);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>