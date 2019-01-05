<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-user-edit"></i>
                        編輯名單
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <textarea class="form-control" v-model="shortlistTextarea" placeholder="請一行一行條列輸入候選名單"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button" class="btn btn-warning" v-on:click="randomSort">打亂排序</button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
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

export default {
    data: function() {
        return {
            shortlistTextarea: "",
        }
    },
    methods: {
        save: function(){
            const that = this;
            const params = {
                shortlistInput: that.shortlistTextarea
            };

            that.$store.dispatch("setShortListInput", params);
            targetDom.modal("hide");

            mixpanel.track("save shortlist", params);
        },
        randomSort: function(){
            const that = this;
            that.$store.dispatch("setShortlistRandomSort");
            const params = {
                shortlist_sort: that.shortlist_sort,
            };
            mixpanel.track("random sort shortlist", params);
        }
    },
    watch: {
        triggerOpenEditList: function(){
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenEditList",
            "shortlistInput",
            "shortlist_sort",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function(){
            that.shortlistTextarea = that.shortlistInput;
            mixpanel.track("open shortlist");
        });
    },
    props: {

    },
    components: {

    }
};
</script>
<style scope>
textarea{
    min-height: calc(100vh - 300px);
}
</style>