<template>
    <div class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-cog"></i>
                        設定
                    </h5>
                    <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> -->
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">網站標題</label>
                            <input type="text" class="form-control"   v-model="input.webTitle">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" style="display: flex;">
                                Header 顏色
                                <span :style="{ background: input.headerColor, width: '20px', height: '20px', display: 'inline-block', border: '1px solid #999' }"></span>
                            </label>
                            <input type="text" class="form-control"   v-model="input.headerColor">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" style="display: flex;">
                                背景圖片
                            </label>
                            <input type="text" class="form-control"   v-model="input.backgroundImg">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" style="display: flex;">
                                背景透明度
                            </label>
                            <input type="number" class="form-control" v-model.number="input.backgroundOpacity" min="0" max="1" step="0.1">
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="exampleInputEmail1">區塊寬度 [{{input.boxWidth}} px]</label>
                            <input type="range" class="form-control"  min="100" max="200" v-model="input.boxWidth">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">區塊高度 [{{input.boxHeight}} px]</label>
                            <input type="range" class="form-control" min="50" max="100" v-model="input.boxHeight">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">標題大小 [{{input.titleSize}} px]</label>
                            <input type="range" class="form-control" min="15" max="25" v-model="input.titleSize">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">副標題大小 [{{input.subtitleSize}} px]</label>
                            <input type="range" class="form-control" min="15" max="25" v-model="input.subtitleSize">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">區塊預設顏色 <div class="show-blcok" v-bind:style="{background: input.defaultColor}"></div></label>
                            <input type="text" class="form-control"   v-model="input.defaultColor">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">區塊選取顏色 <div class="show-blcok" v-bind:style="{background: input.focusColor}"></div></label>
                            <input type="text" class="form-control"   v-model="input.focusColor">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">區塊完成顏色 <div class="show-blcok" v-bind:style="{background: input.doneColor}"></div></label>
                            <input type="text" class="form-control"   v-model="input.doneColor">
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="exampleInputEmail1">亂數跳動次數 [{{input.defaultRunTime}} 次]</label>
                            <input type="range" class="form-control" min="10" max="100" v-model="input.defaultRunTime">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button" class="btn btn-danger" v-on:click="clear">清除所有資料</button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-default" v-on:click="cancel">回復</button>
                        <button type="button" class="btn btn-primary" v-on:click="save">儲存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import {mixpanel} from 'lib/common/util';

let targetDom = null;

let mixpanelTrackerTimer = null;

export default {
    data: function() {
        return {
            input: {
                webTitle: "",
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                boxWidth: 0,
                boxHeight: 0,
                titleSize: 0,
                subtitleSize: 0,
                defaultColor: "#FFF",
                focusColor: "#FFC",
                doneColor: "#FCC",
                defaultRunTime:0,
            },
            orgInput: {
                webTitle: "",
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                boxWidth: 0,
                boxHeight: 0,
                titleSize: 0,
                subtitleSize: 0,
                defaultColor: "#FFF",
                focusColor: "#FFC",
                doneColor: "#FCC",
                defaultRunTime:0,
            },
        }
    },
    methods: {
        save: function() {
            const that = this;
            const params = {
                config: that.input,
            };
            mixpanel.track("save setting", params);
            targetDom.modal("hide");
        },
        cancel: function(){
            const that = this;
            const params = {
                config: that.orgInput,
            };
            that.$store.dispatch("setConfig", params);
            mixpanel.track("cancel setting", params);
            targetDom.modal("hide");
        },
        clear: function(){
            const that = this;
            if (confirm("您確定要清除所有的資料嗎？")) {
                that.$store.dispatch("clearAllData");
                mixpanel.track("clear all data");
                targetDom.modal("hide");
            }
        },
    },
    watch: {
        input: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                const params = {
                    config: that.input,
                };
                that.$store.dispatch("setConfig", params);

                clearTimeout(mixpanelTrackerTimer);
                mixpanelTrackerTimer = setTimeout(function(){
                    mixpanel.track("try setting", params);
                },2000);
            },
        },
        triggerOpenSetting: function() {
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenSetting",
            "config",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
            let config = JSON.parse(JSON.stringify(that.config));
            that.input = { ...that.input, ...config};
            that.orgInput = { ...that.orgInput, ...config};
            mixpanel.track("open setting");
        });
    },
    props: {

    },
    components: {

    }
};
</script>
<style scoped>
.show-blcok{
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20px;
    height: 20px;
}
</style>