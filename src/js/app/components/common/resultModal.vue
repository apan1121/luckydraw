<template>
    <div class="modal result-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-vote-yea"></i>
                        中獎名單
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="width: 15%;">#</th>
                                <th style="width: 30%;">姓名</th>
                                <th>獎項</th>
                                <th style="width: 20%;">功能</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(shortlist, shortlistIndex) in resultList">
                                <template v-if="shortlist.edit">
                                    <tr :key="shortlist.sn" v-if="editsortList != null">
                                        <th scope="row">
                                            <select class="form-control" v-model="editsortList.lucky">
                                                <option v-for="(luckyName, luckyValue) in luckyOption" :value="luckyValue">{{luckyName}}</option>
                                            </select>
                                        </th>
                                        <td>{{editsortList.name}}</td>
                                        <td >
                                            <input class="form-control" v-model="editsortList.award">
                                        </td>
                                        <td>
                                            <button class="btn btn-info" v-on:click="save()">
                                                <i class="fas fa-save"></i>
                                            </button>
                                            <button class="btn btn-warning" v-on:click="openEdit(shortlistIndex, false)">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr :key="shortlist.sn">
                                        <th scope="row">
                                            {{luckyOption[shortlist.lucky]}}
                                        </th>
                                        <td>{{shortlist.name}}</td>
                                        <td >{{shortlist.award || "--"}}</td>
                                        <td>
                                            <button class="btn btn-success" v-on:click="openEdit(shortlistIndex, true)">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </template>

                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-primary" v-on:click="download">下載</button>
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
            resultList: [],
            luckyOption: {
                0: "未中獎",
                1: "中獎",
            },
            editsortList: null,
        }
    },
    methods: {
        download: function(){
            const that = this;
            let resultList = JSON.parse(JSON.stringify(that.resultList));

            let cvs = "姓名,職位,獎項\n" + resultList.map(function(Obj){
                let data = [];
                data.push( Obj.name );
                data.push( Obj.pos );
                data.push( Obj.award || "--" );
                return data.join(",");
            }).join("\r\n");

            let csvContent = "data:text/csv;charset=utf-8," + cvs;
            let encodedUri = encodeURI(csvContent);

            let link = document.createElement("a");
            link.style.display = "none";
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", that.config.webTitle + "中獎名單.csv");
            document.body.appendChild(link); // Required for FF
            link.click();

            mixpanel.track("download result", cvs);
        },
        openEdit: function(index, editFlag){
            const that = this;
            let resultList = JSON.parse(JSON.stringify(that.resultList));

            resultList = resultList.map(function(data){
                data.edit = false;
                return data;
            });
            resultList[index].edit = editFlag;

            if (editFlag) {
                that.editsortList = JSON.parse(JSON.stringify(resultList[index]));
            }

            that.resultList = resultList;

            mixpanel.track("want edit", { editInfo: that.editsortList});
        },
        save: function(){
            const that = this;
            let editsortList = JSON.parse(JSON.stringify(that.editsortList));
            const params = {
                data: editsortList,
            };
            that.$store.dispatch("editShortList", params);

            mixpanel.track("save edit", params);
        },
    },
    watch: {
        triggerOpenResult: function() {
            const that = this;
            targetDom.modal("show");
        },
        shortlistByLuckySN: function(){
            const that = this;
            let shortlistByLuckySN = JSON.parse(JSON.stringify(that.shortlistByLuckySN));
            that.resultList = shortlistByLuckySN.map(function(data){
                data.lucky = that.luckySN.includes(data.sn)?1:0;
                data.edit = false;
                return data;
            });
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenResult",
            "shortlistByLuckySN",
            "luckySN",
            "config",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
            mixpanel.track("open result");
        });
    },
    props: {

    },
    components: {

    }
};
</script>
<style scoped>
.modal-body{
    height: calc( 100vh - 200px);
    overflow: auto;
}
</style>