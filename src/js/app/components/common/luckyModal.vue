<template>
    <div class="modal lucky-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-vote-yea"></i>
                        恭喜中獎
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <h4>恭喜中獎</h4>
                        <div v-if="focusShortlist">
                            <candidate-box v-bind:candidate-info="focusShortlist"></candidate-box>
                        </div>
                        中獎獎項
                        <div class="form-group">
                            <div class="form-control text-center" v-html="award"></div>
                            <!-- <input type="text" class="form-control text-center" v-model="award" placeholder="輸入獎項名稱"> -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button" class="btn btn-secondary" v-on:click="cancel" data-dismiss="modal">取消</button>
                    </div>
                    <div class="col-6 text-right">
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

import candidateBox from './candidateBox';
import {mixpanel} from 'lib/common/util';

let targetDom = null;

export default {
    data: function() {
        return {
            award: "",
        }
    },
    methods: {
        save: function() {
            const that = this;
            const params = {
                award: that.award,
                winner: that.focusShortlist.name,
            };
            that.$store.dispatch("setFocusSN2LuckySN", params);
            targetDom.modal("hide");

            mixpanel.track("confirm winner", params);
        },
        cancel: function(){
            const that = this;
            const params = {
                award: that.award,
                winner: that.focusShortlist.name,
            };
            mixpanel.track("cancel winner", params);
        },
        ...mapActions({})
    },
    watch: {
        triggerOpenLucky: function() {
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenLucky",
            "focusShortlist",
            "focusSN",
            "focusPrizeSN",
            "prizeList",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
            that.award = that.prizeList[ that.focusPrizeSN ];
            const params = {
                award: that.award,
                winner: that.focusShortlist.name,
            };
            mixpanel.track("open lucky", params);
        });
    },
    props: {},
    components: {
        candidateBox,
    }
};
</script>

<style scoped>
.candidate-wrapper{
    margin: 10px auto;
}
</style>