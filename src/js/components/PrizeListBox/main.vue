<template>
    <div id="PrizeListBox" ref="box" class="modal" tabindex="-1"
        role="dialog"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-award"></i>
                        獎項名單
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <draggable
                        v-model="inputPrizeList"
                        handle=".handler"
                        @change="sortCallback"
                    >
                        <transition-group>
                            <template v-for="prizeInfo in inputPrizeList">
                                <template v-if="prizeInfo.del === false">
                                    <div v-if="!!editPrizeInfo && editPrizeInfo.prize_sn === prizeInfo.prize_sn" :key="prizeInfo.prize_sn" class="input-group mb-3">
                                        <div class="input-group-prepend handler cursor-pointer">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i class="fas fa-bars"></i>
                                            </span>
                                        </div>
                                        <input v-model="editPrizeInfo.title" type="text"
                                            class="form-control" placeholder="編輯獎項名稱"
                                        >
                                        <input v-model.number="editPrizeInfo.amount" type="number"
                                            class="form-control" placeholder="數量"
                                            min="1"
                                            step="1"
                                        >
                                        <div class="input-group-append">
                                            <span class="input-group-text btn-success" style="cursor: pointer" @click="saveEditPrizeAct">
                                                <i class="far fa-save"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div v-else :key="prizeInfo.prize_sn" class="input-group mb-3 prizeListGroup">
                                        <div class="input-group-prepend handler cursor-pointer">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i class="fas fa-bars"></i>
                                            </span>
                                        </div>
                                        <div class="form-control">
                                            {{ prizeInfo.title }} ({{ prizeInfo.amount }})
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text" style="cursor: pointer" @click="openEditPrize(prizeInfo)">
                                                <i class="far fa-edit"></i>
                                            </span>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text" style="cursor: pointer" @click="delPrizeAct(prizeInfo)">
                                                <i class="fas fa-trash-alt"></i>
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </template>
                        </transition-group>
                    </draggable>

                    <template v-if="prizeList.length > 0">
                        <hr />
                    </template>

                    <template v-if="!addNewFlag">
                        <button id="AddPrize" type="button" class="btn btn-info btn-block" @click="openAddPrize(true)">
                            新增獎項
                        </button>
                    </template>
                    <template v-else>
                        <div id="AddPrizeGroup" class="input-group mb-3">
                            <input v-model="newPrize.title"
                                name="title"
                                type="text"
                                class="form-control"
                                placeholder="新增的獎項名稱"
                            >
                            <input v-model.number="newPrize.amount"
                                name="amount"
                                type="number"
                                class="form-control" placeholder="數量"
                                min="1"
                                step="1"
                            >
                            <div class="input-group-append">
                                <span class="input-group-text" style="cursor: pointer" @click="saveNewPrizeAct">
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
import draggable from 'vuedraggable'

import { popup, string, trackJS } from 'lib/common/util';
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
    components: {
        draggable,
    },
    filters: {},
    props: {},
    data(){
        return {
            addNewFlag: false,
            newPrize: {
                title: '',
                amount: 1,
            },
            inputPrizeList: [],
            editPrizeInfo: null,
        };
    },
    computed: {
        ...mapGetters([
            'triggerOpenPrizeList',
            'prizeList',
        ]),
    },
    watch: {
        triggerOpenPrizeList: {
            handler(){
                if (this.triggerOpenPrizeList) {
                    $(this.$refs.box).modal('show');
                } else {
                    $(this.$refs.box).modal('hide');
                }
            },
        },
        inputPrizeList: {
            deep: true,
            handler(){
                const that = this;
                const prizeList = JSON.stringify(that.prizeList);
                const inputPrizeList = JSON.stringify(that.inputPrizeList);
                if (prizeList !== inputPrizeList) {
                    that.syncPrizeList(JSON.parse(inputPrizeList));
                }
            },
        },
    },
    created(){},
    mounted(){
        const that = this;

        $(this.$refs.box).bind('shown.bs.modal', () => {
            that.inputPrizeList = JSON.parse(JSON.stringify(that.prizeList));
            that.addNewFlag = false;
            that.newPrize = {
                title: '',
                amount: 1,
            };

            if (that.inputPrizeList.length === 0) {
                that.addNewFlag = true;
            }
            that.editPrizeInfo = null;

            trackJS.mixpanel('PrizeListOpen_click');
            trackJS.gtag('event', 'PrizeListOpen_click');
        });

        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('PrizeListClose_click');
            trackJS.gtag('event', 'PrizeListClose_click');
        });

        if (this.triggerOpenPrizeList) {
            $(this.$refs.box).modal('show');
        } else {
            $(this.$refs.box).modal('hide');
        }
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            syncPrizeList: 'syncPrizeList',
        }),
        openAddPrize(){
            const that = this;
            that.newPrize = {
                title: '',
                amount: 1,
            };
            that.addNewFlag = true;
        },
        saveNewPrizeAct(){
            const that = this;
            if (!!that.newPrize.title) {
                const inputPrizeList = JSON.parse(JSON.stringify(that.inputPrizeList));
                const prizeListTitle = inputPrizeList.map(item => item.title);

                if (!prizeListTitle.includes(that.newPrize.title)) {
                    const params = {
                        prize_sn: string.getRandomString(10),
                        title: '獎勵',
                        amount: 1,
                        del: false,
                        ...that.newPrize,
                    };
                    that.inputPrizeList.push(params);
                    that.addNewFlag = false;

                    trackJS.mixpanel('PrizeListAdd_click', params);
                    trackJS.gtag('event', 'PrizeListAdd_click', params);
                } else {
                    popup.warning({
                        html: '已有相同的獎項',
                    });
                }
            } else {
                that.addNewFlag = false;
            }
        },
        openEditPrize(prizeInfo){
            const that = this;
            that.editPrizeInfo = JSON.parse(JSON.stringify(prizeInfo));
        },
        saveEditPrizeAct(){
            const that = this;
            if (that.editPrizeInfo) {
                const editPrizeInfo = JSON.parse(JSON.stringify(that.editPrizeInfo));
                const inputPrizeList = JSON.parse(JSON.stringify(that.inputPrizeList));

                let match = false;
                inputPrizeList.forEach((item) => {
                    if (item.prize_sn !== editPrizeInfo.prize_sn && item.title === editPrizeInfo.title) {
                        match = true;
                    }
                });

                if (!match) {
                    let focus_index = false;
                    inputPrizeList.forEach((item, index) => {
                        if (item.prize_sn === editPrizeInfo.prize_sn) {
                            focus_index = index;
                        }
                    });

                    if (focus_index === false) {
                        inputPrizeList.del = false;
                        inputPrizeList.push(editPrizeInfo);
                    } else {
                        inputPrizeList[focus_index] = editPrizeInfo;
                    }

                    that.inputPrizeList = inputPrizeList;
                    trackJS.mixpanel('PrizeListEditSave_click', editPrizeInfo);
                    trackJS.gtag('event', 'PrizeListEditSave_click', editPrizeInfo);
                    that.editPrizeInfo = null;
                } else {
                    popup.warning({
                        html: '已有相同的獎項',
                    });
                }
            }
        },
        delPrizeAct(prizeInfo){
            const that = this;
            popup.warning({
                html: '您確定要刪除此筆獎項嗎？對應的得獎資訊也都會消除唷',
            }, () => {
                const inputPrizeList = JSON.parse(JSON.stringify(that.inputPrizeList));
                let focus_index = false;
                inputPrizeList.forEach((item, index) => {
                    if (item.prize_sn === prizeInfo.prize_sn) {
                        focus_index = index;
                    }
                });
                if (focus_index !== false) {
                    inputPrizeList[focus_index].del = true;
                    trackJS.mixpanel('PrizeListEditDel_click', inputPrizeList[focus_index]);
                    trackJS.gtag('event', 'PrizeListEditDel_click', inputPrizeList[focus_index]);
                }
                that.inputPrizeList = inputPrizeList;
            });
        },
        sortCallback(){
            const that = this;
            const inputPrizeList = JSON.parse(JSON.stringify(that.inputPrizeList));
            trackJS.mixpanel('PrizeListSort_trigger', inputPrizeList);
            trackJS.gtag('event', 'PrizeListSort_trigger', inputPrizeList);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>