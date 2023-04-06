<template>
    <div
        id="SettingBox"
        ref="box"
        class="modal"
        tabindex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-cog"></i>
                        設定
                    </h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="webTitle">網站標題</label>
                            <input v-model="input.webTitle"
                                type="text"
                                class="form-control"
                                name="webTitle"
                                placeholder="LuckyDraw"
                                autocomplete="off"
                            >
                        </div>
                        <div class="form-group">
                            <label for="headerColor"
                                style="display: flex;"
                            >
                                Header 顏色
                                <span :style="{
                                    background: input.headerColor,
                                    width: '20px', height: '20px',
                                    display: 'inline-block',
                                    border: '1px solid #999'
                                }"
                                ></span>
                            </label>
                            <input v-model="input.headerColor"
                                type="text"
                                class="form-control"
                                name="headerColor"
                                autocomplete="off"
                            >
                        </div>
                        <div class="form-group">
                            <label for="backgroundImg" style="display: flex;">
                                背景圖片
                            </label>
                            <div class="input-group mb-3">
                                <input v-model="input.backgroundImg"
                                    type="text"
                                    class="form-control"
                                    name="backgroundImg"
                                    placeholder="請輸入圖片網址"
                                    autocomplete="off"
                                >
                                <div class="input-group-append">
                                    <span class="input-group-text" style="cursor: pointer" @click="getBgImg">
                                        <i :class="diceArr[diceFocus]"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="backgroundOpacity" style="display: flex;">
                                背景透明度
                            </label>
                            <input
                                v-model.number="input.backgroundOpacity"
                                type="number"
                                class="form-control"
                                name="backgroundOpacity"
                                min="0" max="1" step="0.1"
                                autocomplete="off"
                            >
                        </div>

                        <google-support :trigger="triggerOpenSetting"></google-support>

                        <div class="box-setting" rel="boxSize">
                            <div class="form-group">
                                <label for="boxWidth">區塊寬度 [{{ input.boxWidth }} px]</label>
                                <input v-model.number="input.boxWidth" type="range" class="form-control"
                                    min="100" max="200" name="boxWidth"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxHeight">區塊高度 [{{ input.boxHeight }} px]</label>
                                <input v-model.number="input.boxHeight" type="range" class="form-control"
                                    min="50" max="100" name="boxHeight"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxMH">區塊左右間距 [{{ input.boxMH }} px]</label>
                                <input v-model.number="input.boxMH" type="range" class="form-control"
                                    min="1" max="30" name="boxMH"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxMV">區塊上下間距 [{{ input.boxMV }} px]</label>
                                <input v-model.number="input.boxMV" type="range" class="form-control"
                                    min="1" max="30" name="boxMV"
                                >
                            </div>
                        </div>
                        <div class="box-setting" rel="fontSize">
                            <div class="form-group">
                                <label for="titleSize">標題大小 [{{ input.titleSize }} px]</label>
                                <input v-model.number="input.titleSize" type="range" class="form-control"
                                    min="15" max="25" name="titleSize"
                                >
                            </div>
                            <div class="form-group">
                                <label for="subtitleSize">副標題大小 [{{ input.subtitleSize }} px]</label>
                                <input v-model="input.subtitleSize" type="range" class="form-control"
                                    min="15" max="25" name="subtitleSize"
                                >
                            </div>
                        </div>
                        <div class="box-setting" rel="boxColor">
                            <div class="form-group">
                                <label for="defaultColor">
                                    區塊預設顏色
                                    <!-- <span :style="{
                                        background: input.defaultColor,
                                        width: '20px', height: '20px',
                                        display: 'inline-block',
                                        border: '1px solid #999'
                                    }"
                                    ></span> -->
                                    <input v-model="input.defaultColor" type="color">
                                </label>
                                <input
                                    v-model="input.defaultColor"
                                    type="text"
                                    class="form-control"
                                    name="defaultColor"
                                    autocomplete="off"
                                >
                            </div>
                            <div class="form-group">
                                <label for="focusColor">區塊選取顏色
                                    <!-- <span :style="{
                                        background: input.focusColor,
                                        width: '20px', height: '20px',
                                        display: 'inline-block',
                                        border: '1px solid #999'
                                    }"
                                    ></span> -->
                                    <input v-model="input.focusColor" type="color">
                                </label>
                                <input v-model="input.focusColor" type="text" class="form-control"
                                    name="focusColor"
                                >
                            </div>
                            <div class="form-group">
                                <label for="doneColor">區塊完成顏色
                                    <!-- <span :style="{
                                        background: input.doneColor,
                                        width: '20px', height: '20px',
                                        display: 'inline-block',
                                        border: '1px solid #999'
                                    }"
                                    ></span> -->
                                    <input v-model="input.doneColor" type="color">
                                </label>
                                <input v-model="input.doneColor" type="text" class="form-control"
                                    name="doneColor"
                                >
                            </div>
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="defaultRunTime">亂數跳動次數 [{{ input.defaultRunTime }} 次]</label>
                            <input v-model.number="input.defaultRunTime" type="range" class="form-control"
                                min="10" max="100"
                            >
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <h4>贊助一杯咖啡</h4>
                            </div>
                            <div class="col-12">
                                <a href="https://www.buymeacoffee.com/apan1121" target="_blank" @click="donateAct">
                                    <div class="donate-image">
                                        <img width="100%" :src="'./dist/img/buymeacoffee.jpeg'">
                                    </div>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button"
                            class="btn btn-danger clearAllBtn"
                            @click="clear"
                        >
                            清除所有資料
                        </button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button"
                            class="btn btn-default"
                            @click="cancel"
                        >
                            回復
                        </button>
                        <button type="button"
                            class="btn btn-primary"
                            @click="save"
                        >
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { popup, string, trackJS } from 'lib/common/util';

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
            input: {
                webTitle: '',
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                boxWidth: 0,
                boxHeight: 0,
                boxMH: 3,
                boxMV: 3,
                titleSize: 0,
                subtitleSize: 0,
                defaultColor: '#FFF',
                focusColor: '#FFC',
                doneColor: '#FCC',
                defaultRunTime: 0,
            },
            orgInput: {
                webTitle: '',
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                boxWidth: 0,
                boxHeight: 0,
                boxMH: 3,
                boxMV: 3,
                titleSize: 0,
                subtitleSize: 0,
                defaultColor: '#FFF',
                focusColor: '#FFC',
                doneColor: '#FCC',
                defaultRunTime: 0,
            },
            diceArr: [
                'fas fa-dice-one',
                'fas fa-dice-two',
                'fas fa-dice-three',
                'fas fa-dice-four',
                'fas fa-dice-five',
                'fas fa-dice-six',
            ],
            diceFocus: 2,
        };
    },
    computed: {
        ...mapGetters([
            'config',
            'triggerOpenSetting',
            'randomBgImg',
        ]),
    },
    watch: {
        triggerOpenSetting: {
            immediate: true,
            handler(){
                const that = this;
                if (this.triggerOpenSetting) {
                    $(that.$refs.box).modal('show');
                } else {
                    $(that.$refs.box).modal('hide');
                }
            },
        },
        input: {
            deep: true,
            handler(val, oldVal){
                const that = this;
                const params = {
                    config: that.input,
                };
                that.setConfig(params);

                clearTimeout(that.mixpanelTrackerTimer);
                that.mixpanelTrackerTimer = setTimeout(() => {
                    trackJS.mixpanel('SettingTry_click', that.config);
                    trackJS.gtag('event', 'SettingTry_click', that.config);
                }, 2000);
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            const config = JSON.parse(JSON.stringify(that.config));
            that.input = { ...that.input, ...config };
            that.orgInput = { ...that.orgInput, ...config };

            trackJS.mixpanel('SettingOpen_click');
            trackJS.gtag('event', 'SettingOpen_click');
        });


        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('SettingClose_click');
            trackJS.gtag('event', 'SettingClose_click');
        });
        $(that.$refs.box).modal('show');
    },
    updated(){
    },
    destroyed(){
        const that = this;
    },
    methods: {
        ...mapMutations({
            setConfig: 'setConfig',
            clearAllData: 'clearAllData',
        }),
        clear(){
            const that = this;
            popup.warning({
                html: '您確定要清除所有的資料嗎？',
            }, () => {
                that.clearAllData();
                trackJS.mixpanel('SettingClearAll_click');
                trackJS.gtag('event', 'SettingClearAll_click');
                $(that.$refs.box).modal('hide');
            }, () => {

            });
        },
        cancel(){
            const that = this;
            const params = {
                config: that.orgInput,
            };
            that.setConfig(params);
            trackJS.mixpanel('SettingCancel_click');
            trackJS.gtag('event', 'SettingCancel_click');
            $(that.$refs.box).modal('hide');
        },
        save(){
            const that = this;
            const params = {
                config: that.input,
            };
            trackJS.mixpanel('SettingSave_click', that.config);
            trackJS.gtag('event', 'SettingSave_click', that.config);
            $(that.$refs.box).modal('hide');
        },
        getBgImg(){
            const that = this;
            const randomBgImg = that.randomBgImg.split(',');

            const getRandomBgImg = () => {
                const index = string.randRange(0, randomBgImg.length - 1);
                const name = randomBgImg.splice(index, 1);
                return name[0];
            };

            const input = JSON.parse(JSON.stringify(that.input));
            input.backgroundImg = getRandomBgImg();
            that.input = input;
            that.diceFocus = string.randRange(0, that.diceArr.length - 1);
        },
        donateAct(){
            trackJS.gtag('event', 'donate_click', {
            });
            trackJS.mixpanel('donate_click', {
            });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>