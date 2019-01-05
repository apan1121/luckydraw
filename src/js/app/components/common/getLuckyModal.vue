<template>
    <div class="modal get-lucky-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-vote-yea"></i>
                        選取獎項
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <template v-if="prizeListByAward.length > 0">
                        <button type="button" class="btn btn-success btn-lg btn-block" v-on:click="getLucky(prizeInfo)" v-for="(prizeInfo, prizeIndex) in prizeListByAward">
                            <div class="row">
                                <div class="col-9">{{prizeInfo.prize}}</div>
                                <div class="col-3">[{{prizeInfo.count}}]</div>
                            </div>
                        </button>
                    </template>
                    <template v-else>
                        <h3 class="text-center">
                            請先建立獎項
                        </h3>
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

const audio = {
    ding: new Audio("./dist/mp3/ding.mp3"),
    winner: [
        // new Audio("./dist/mp3/winner1.mp3"),
        new Audio("./dist/mp3/winner2.mp3"),
    ]
}

let waitTimeArr = [
    {
        "limit": 500,
        "wait": 10,
    },
    {
        "limit": 100,
        "wait": 20,
    },
    {
        "limit": 50,
        "wait": 30,
    },
    {
        "limit": 30,
        "wait": 80,
    },
    {
        "limit": 6,
        "wait": 100,
    },
    {
        "limit": 4,
        "wait": 500,
    },
    {
        "limit": 3,
        "wait": 800,
    },
    {
        "limit": 2,
        "wait": 1000,
    },
    {
        "limit": 1,
        "wait": 1100,
    },
];

let targetDom = null;

let luckyActionTimer = null;


export default {
    data: function(){
        return {
            validSN: [],
            validSNLength: 0,
            validSNRandomRange: 0,
            defaultRunTime: 50,
            runTime: 0,
        }
    },
    methods: {
        getLucky: function(prizeInfo){
            const that = this;
            that.validSN = that.validShortlistSN;
            that.validSNLength = that.validSN.length;
            that.validSNRandomRange = Math.pow(10, (that.validSNLength+"").length);

            that.$store.dispatch("setFocusSN", null);
            that.$store.dispatch("setFocusPrizeSN", prizeInfo.sn);

            that.runTime = that.config.defaultRunTime;

            targetDom.modal("hide");

            mixpanel.track("get lucky!!");
            if (that.validSN.length > 0) {
                clearTimeout(luckyActionTimer);
                that.luckyAction();
            }
        },
        luckyAction: function(){
            const that = this;
            let index = parseInt(Math.random() * 100000 % that.validSNLength);
            audio.ding.play();
            that.$store.dispatch("setFocusSN", that.validSN[index]);
            if (that.runTime > 0) {
                let waitTime = 0;
                for (let index in waitTimeArr) {
                    if (that.runTime >= waitTimeArr[index].limit) {
                        waitTime = waitTimeArr[index].wait;
                        break;
                    }
                }

                that.runTime = that.runTime - 1;
                clearTimeout(luckyActionTimer);
                luckyActionTimer = setTimeout(function(){
                    audio.ding.pause();
                    audio.ding.currentTime = 0;
                    that.luckyAction();
                }, waitTime);
            } else {
                setTimeout(function(){
                    that.$store.dispatch("triggerOpenLuckyModal");
                    let index = parseInt(Math.random() * 10 % audio.winner.length);
                    audio.winner[index].play();
                }, 600);

            }
        },
    },
    watch: {
        triggerOpenGetLucky: function(){
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "config",
            "triggerOpenGetLucky",
            "prizeListByAward",
            "validShortlistSN",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
            that.award = "";
            mixpanel.track("open getLucky");
        });
    },
    props: {

    },
    components: {

    }
};
</script>