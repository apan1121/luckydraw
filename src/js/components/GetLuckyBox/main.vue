<template>
    <div id="GetLuckyBox" ref="box" class="modal" tabindex="-1"
        role="dialog"
        data-backdrop="static" data-keyboard="false"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-vote-yea"></i>
                        選取獎項
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="needSetWebTitle" role="alert" class="alert alert-primary" style="flex: 0 0 auto;">
                        請先設定屬於您的抽獎活動名稱
                        <button class="btn btn-success btn-sm" @click="gotoSetWebTitle">立刻去</button>
                    </div>
                    <div class="get-lucky-list" :class="{ disabled: needSetWebTitle }">
                        <template v-if="prizeListByAward.length > 0">
                            <button v-for="prizeInfo in prizeListByAward"
                                :key="prizeInfo.prize_sn"
                                type="button"
                                class="btn btn-success btn-lg btn-block mb-3 prizeInfo"
                                :disabled="prizeInfo.amount <= prizeInfo.count"
                                @click="getLucky(prizeInfo)"
                            >
                                <div class="row">
                                    <div class="col-9">
                                        {{ prizeInfo.title }}
                                    </div>
                                    <div class="col-3">
                                        [{{ prizeInfo.count }} / {{ prizeInfo.amount }}]
                                    </div>
                                </div>
                            </button>
                        </template>
                        <template v-else>
                            <h4 class="text-center p-3">
                                您尚未建立獎項，無法進行抽獎
                            </h4>
                            <button class="btn btn-warning btn-block btn-lg"
                                @click="editPrizeList"
                            >
                                建立獎項
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { Tutorial, popup, trackJS } from 'lib/common/util';

const audio = {
    ding: new Audio('./dist/mp3/ding.mp3'),
    winner: [
        // new Audio("./dist/mp3/winner1.mp3"),
        new Audio('./dist/mp3/winner2.mp3'),
    ],
};

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
            ValidateCandidateSN: null,
            ValidSNRandomRange: 0,

            defaultRunTime: 50,
            runTime: 0,
            orgRunTime: 0,
        };
    },
    computed: {
        ...mapGetters([
            'config',
            'triggerOpenGetLucky',
            'prizeListByAward',
            'candidateList',
            'haveAwardCandidateSN',
            'getLuckyWaitTimeArr',
        ]),
        needSetWebTitle(){
            const that = this;
            let needSetWebTitle = false;
            if (!that.config.isTutorial && (!that.config.webTitle || ['Lucky Draw', 'LuckyDraw', 'luckydraw'].includes(that.config.webTitle))) {
                needSetWebTitle = true;
            }
            return needSetWebTitle;
        },
    },
    watch: {
        triggerOpenGetLucky: {
            immediate: true,
            handler(){
                const that = this;
                if (that.triggerOpenGetLucky) {
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
            that.award = '';
            trackJS.mixpanel('GetLuckyOpen_click');
            trackJS.gtag('event', 'GetLuckyOpen_click');
        });
        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('GetLuckyClose_click');
            trackJS.gtag('event', 'GetLuckyClose_click');
        });

        if (that.triggerOpenGetLucky) {
            $(that.$refs.box).modal('show');
        } else {
            $(that.$refs.box).modal('hide');
        }
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapMutations({
            setFavicon: 'setFavicon',
            setFocusCandidateSN: 'setFocusCandidateSN',
            setFocusPrizeSN: 'setFocusPrizeSN',
            triggerModal: 'triggerModal',
        }),
        gotoSetWebTitle(){
            const that = this;
            // that.triggerModal({ key: 'GetLucky', close: true });
            // setTimeout(() => {
            //     that.triggerModal({ key: 'Setting' });
            // }, 100);

            that.triggerModal({ key: 'GetLucky', close: true });
            const config = {
                offset: {
                    top: 60,
                    bottom: 60,
                },
                startCallback(){
                    trackJS.mixpanel('TutorialStart_trigger', { type: 'WebsiteTitle' });
                    trackJS.gtag('event', 'TutorialStart_trigger', { type: 'WebsiteTitle' });
                },
                closeCallback(){
                    trackJS.mixpanel('TutorialEnd_trigger', { type: 'WebsiteTitle' });
                    trackJS.gtag('event', 'TutorialEnd_trigger', { type: 'WebsiteTitle' });
                },
                step_callback(node, IntroInfo){
                    trackJS.mixpanel('TutorialStep_trigger', { type: 'WebsiteTitle', index: IntroInfo.index });
                    trackJS.gtag('event', 'TutorialStep_trigger', { type: 'WebsiteTitle', index: IntroInfo.index });
                },
            };

            const step = [
                {
                    target: '#SettingBox input[name="webTitle"]',
                    title: '獨特的抽獎',
                    intro: '在抽獎前，設定一個屬於您的獨特抽獎活動名稱。',
                    beforeAction(Element, TutorialNode, $next){
                        that.triggerModal({ key: 'Setting' });
                        setTimeout(() => {
                            $next();
                        }, 200);
                    },
                },
            ];
            const tutorial1 = new Tutorial(step, config);
            tutorial1.run();
        },
        editPrizeList(){
            const that = this;
            $(this.$refs.box).modal('hide');
            that.triggerModal({ key: 'PrizeList' });
        },
        getLucky(prizeInfo){
            const that = this;
            trackJS.mixpanel('GetLuckyChoosePrize_click', prizeInfo);
            trackJS.gtag('event', 'GetLuckyChoosePrize_click', prizeInfo);
            if (prizeInfo.count <= prizeInfo.amount) {
                const { haveAwardCandidateSN } = that;
                const ValidateCandidateSN = [];

                that.candidateList.forEach((candidateInfo) => {
                    if (candidateInfo.del === false && !haveAwardCandidateSN.includes(candidateInfo.sn)) {
                        ValidateCandidateSN.push(candidateInfo.sn);
                    }
                });

                if (ValidateCandidateSN.length > 0) {
                    that.ValidateCandidateSN = ValidateCandidateSN;
                    that.ValidSNRandomRange = Math.pow(10, (`${that.ValidateCandidateSN.length}`).length);

                    $(that.$refs.box).modal('hide');

                    that.runTime = that.config.defaultRunTime;
                    that.orgRunTime = that.config.defaultRunTime;
                    trackJS.mixpanel('GetLuckyChoosePrizeRun_trigger', prizeInfo);
                    trackJS.gtag('event', 'GetLuckyChoosePrizeRun_trigger', prizeInfo);
                    that.setFocusCandidateSN(null);
                    that.setFocusPrizeSN(prizeInfo.prize_sn);
                    that.luckyAction();
                } else {
                    trackJS.mixpanel('GetLuckyChoosePrizeError_trigger', { error: 'no candidate' });
                    trackJS.gtag('event', 'GetLuckyChoosePrizeError_trigger', { error: 'no candidate' });
                    popup.warning({
                        html: '無候選人可以抽',
                    });
                }
            } else {
                trackJS.mixpanel('GetLuckyChoosePrizeError_trigger', { error: 'not enough' });
                trackJS.gtag('event', 'GetLuckyChoosePrizeError_trigger', { error: 'not enough' });
                popup.warning({
                    html: '此獎項沒有足夠的數量',
                });
            }
        },
        luckyAction(){
            const that = this;
            const sn_index = parseInt((Math.random() * 100000) % that.ValidateCandidateSN.length);
            that.setFocusCandidateSN(that.ValidateCandidateSN[sn_index]);
            audio.ding.play();
            that.setFavicon('run');
            const { getLuckyWaitTimeArr } = that;
            if (that.runTime > 0 && that.ValidateCandidateSN.length > 1) {
                let waitTime = 0;
                if (that.orgRunTime < 10) {
                    waitTime = 100;
                } else {
                    for (const index in getLuckyWaitTimeArr) {
                        if (that.runTime >= getLuckyWaitTimeArr[index].limit) {
                            waitTime = getLuckyWaitTimeArr[index].wait;
                            break;
                        }
                    }
                }
                console.log('waitTime', waitTime);
                that.runTime -= 1;
                clearTimeout(that.luckyActionTimer);
                that.luckyActionTimer = setTimeout(() => {
                    audio.ding.pause();
                    audio.ding.currentTime = 0;
                    that.luckyAction();
                }, waitTime);
            } else {
                setTimeout(() => {
                    trackJS.mixpanel('GetLuckyChoosePrizeStop_trigger');
                    trackJS.gtag('event', 'GetLuckyChoosePrizeStop_trigger');
                    that.triggerModal({ key: 'Lucky' });
                    const index = parseInt((Math.random() * 10) % audio.winner.length);
                    audio.winner[index].play();
                }, 600);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
</style>