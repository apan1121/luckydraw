<template>
    <div id="LuckyBox" ref="box" class="modal lucky-modal"
        tabindex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-vote-yea"></i>
                        恭喜中獎
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="text-center p-4 lucky-info">
                        <h4>恭喜中獎</h4>
                        <template v-if="focusCandidateInfo">
                            <candidate-box
                                :key="focusCandidateInfo.sn"
                                :candidate-index="0"
                                :candidate-info="focusCandidateInfo"
                            ></candidate-box>
                        </template>
                        <template v-else>
                            無法對應
                        </template>

                        <h5 class="mt-4">
                            中獎獎項
                        </h5>
                        <div class="form-group">
                            <div class="form-control text-center" v-text="focusPrizeInfo.title"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button" class="btn btn-secondary cancel" data-dismiss="modal"
                            @click="cancel"
                        >
                            取消
                        </button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-primary save" @click="save">
                            確定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { trackJS } from 'lib/common/util';
import { mapActions, mapMutations, mapGetters } from 'vuex';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        CandidateBox: () => import('components/CandidateBox/main.vue'),
    },
    filters: {},
    props: {},
    data(){
        return {
            award: '',
        };
    },
    computed: {
        ...mapGetters([
            'triggerOpenLucky',
            'focusPrizeSN',
            'focusCandidateSN',
            'prizeList',

            'candidateMapping',
            'prizeMapping',
        ]),
        focusCandidateInfo(){
            return this.candidateMapping[this.focusCandidateSN] || false;
        },
        focusPrizeInfo(){
            return this.prizeMapping[this.focusPrizeSN] || false;
        },
    },
    watch: {
        triggerOpenLucky: {
            handler(){
                const that = this;
                $(that.$refs.box).modal('show');
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            /**
             * 得獎 icon
             */
            that.setFavicon('award');
            trackJS.mixpanel('LuckyOpen_click', { candidate: that.focusCandidateInfo, prize: that.focusPrizeInfo });
            trackJS.gtag('event', 'LuckyOpen_click', { candidate: that.focusCandidateInfo, prize: that.focusPrizeInfo });
        });
        $(that.$refs.box).bind('hidden.bs.modal', () => {
            /**
             * default icon
             */
            that.setFavicon('default');
            trackJS.mixpanel('LuckyClose_click');
            trackJS.gtag('event', 'LuckyClose_click');
        });
        $(that.$refs.box).modal('show');
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            setFavicon: 'setFavicon',
            setFocusCandidateBindPrize: 'setFocusCandidateBindPrize',
        }),
        save(){
            const that = this;
            const params = {
                prize_sn: that.focusPrizeSN,
                candidate_sn: that.focusCandidateSN,
            };
            trackJS.mixpanel('LuckyConfirm_click', { candidate: that.focusCandidateInfo, prize: that.focusPrizeInfo });
            trackJS.gtag('event', 'LuckyConfirm_click', { candidate: that.focusCandidateInfo, prize: that.focusPrizeInfo });
            that.setFocusCandidateBindPrize(params);
            $(that.$refs.box).modal('hide');
        },
        cancel(){
            const that = this;
            trackJS.mixpanel('LuckyCancel_click', { candidate: that.focusCandidateInfo, prize: that.focusPrizeInfo });
            trackJS.gtag('event', 'LuckyCancel_click', { candidate: that.focusCandidateInfo, prize: that.focusPrizeInfo });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>