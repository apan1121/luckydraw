<template>
    <div class="modal prize-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-award"></i>
                        獎項名單
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <template v-for="(prize, prizeSN) in prizeList">
                        <div class="input-group mb-3" v-if="focusEditSN === prizeSN">
                            <input type="text" ref="prizeEdit" class="form-control" v-model="editPrize" placeholder="編輯獎項名稱">
                            <div class="input-group-append">
                                <span class="input-group-text btn-success" style="cursor: pointer" v-on:click="saveEditPrize(prize)">
                                    <i class="far fa-save"></i>
                                </span>
                            </div>
                        </div>
                        <div class="input-group mb-3" v-else>
                            <div class="form-control">{{prize}}</div>
                            <div class="input-group-append">
                                <span class="input-group-text" style="cursor: pointer" v-on:click="openEditPrize(prizeSN, prize)">
                                    <i class="far fa-edit"></i>
                                </span>
                            </div>
                        </div>
                    </template>

                    <hr/>

                    <template v-if="!addNewFlag">
                        <button type="button" class="btn btn-info btn-block" v-on:click="openAddPrize(true)">新增獎項</button>
                    </template>
                    <template v-else>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="newPrize" placeholder="新增的獎項名稱">
                            <div class="input-group-append">
                                <span class="input-group-text" style="cursor: pointer" v-on:click="saveNewPrize">
                                    <i class="far fa-save"></i>
                                </span>
                            </div>
                        </div>
                    </template>


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

export default {
    data: function() {
        return {
            addNewFlag: false,
            newPrize: '',

            focusEditSN: false,
            editPrize: '',
        }
    },
    methods: {
        openEditPrize: function(prizeSN, prizeName){
            const that = this;
            that.focusEditSN = prizeSN;
            that.editPrize = prizeName;
        },
        saveEditPrize: function(prize){
            const that = this;
            if ( !!that.editPrize) {
                let prizeList = JSON.parse( JSON.stringify( that.prizeList) );
                let match = prizeList.filter(function(prize, index){
                    return that.editPrize == prize && (index != that.focusEditSN);
                });

                if (match.length == 0) {
                    const params = {
                        sn: that.focusEditSN,
                        prize: that.editPrize,
                        orgPrize: prize,
                    }

                    that.$store.dispatch("saveEditPrize", params);
                    that.editPrize = "";
                    that.focusEditSN = false;

                    mixpanel.track("edit prize", params);
                } else {
                    alert("已有相同的獎項");
                }
            }
        },
        openAddPrize: function( flag){
            const that = this;
            that.addNewFlag = flag;
        },
        saveNewPrize: function() {
            const that = this;
            if ( !!that.newPrize) {
                let prizeList = JSON.parse( JSON.stringify( that.prizeList) );

                if (!prizeList.includes(that.newPrize)) {
                    const params = {
                        prize: that.newPrize,
                    }
                    that.$store.dispatch("saveNewPrize", params);
                    that.newPrize = "";
                    that.addNewFlag = false;

                    mixpanel.track("add prize", params);
                } else {
                    alert("已有相同的獎項");
                }
            }
        },
    },
    watch: {
        triggerOpenPrizeList: function() {
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenPrizeList",
            "prizeList",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
            that.addNewFlag = false;
            that.newPrize = "";

            that.focusEditSN = false;
            that.editPrize= '';

            mixpanel.track("open prize list");
        });
    },
    props: {

    },
    components: {

    }
};
</script>