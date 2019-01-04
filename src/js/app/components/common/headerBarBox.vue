<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

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
        editList: function(){
            const that = this;
            that.$store.dispatch("triggerOpenEditListModal");
        },
        getLucky: function(){
            const that = this;
            that.validSN = that.validShortlistSN;
            that.validSNLength = that.validSN.length;
            that.validSNRandomRange = Math.pow(10, (that.validSNLength+"").length);

            that.$store.dispatch("setFocusSN", null);

            that.runTime = that.config.defaultRunTime;

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
        showResult: function(){
            const that = this;
            that.$store.dispatch("triggerOpenResultModal");
        },
        showSetting: function(){
            const that = this;
            that.$store.dispatch("triggerOpenSettingModal");
        },
    },
    watch: {

    },
    computed: {
        ...mapGetters([
            "validShortlistSN",
            "config",
        ])
    },
    mounted() {
    },
    props: {

    },
    components: {

    }
};
</script>