import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import {createStore} from 'lib/store/index';

import {history_route, string, mixpanel} from 'lib/common/util';

import headerBarBox from './components/common/headerBarBox';
import candidateBox from './components/common/candidateBox';

import editListModal from './components/common/editListModal';
import prizeListModal from './components/common/prizeListModal';
import getLuckyModal from './components/common/getLuckyModal';
import luckyModal from './components/common/luckyModal';
import resultModal from './components/common/resultModal';
import settingModal from './components/common/settingModal';


const store = createStore([
    "common",
]);

import 'jquery';
import 'bootstrap';

let saveToLocalStorageTimer = null;

var Page = new Vue({
    el: '#appBox',
    data: function() {
        return {
            popstats: false,
        }
    },
    methods: {
        init: function(){
            const that = this;
            mixpanel.track("init page");
            that.$store.dispatch("initSystem");
        },
        saveToLocalStorage: function(){
            const that = this;
            clearTimeout(saveToLocalStorageTimer);
            saveToLocalStorageTimer = setTimeout(function(){
                that.$store.dispatch("saveToLocalStorage");
            }, 500);
        },
    },
    watch: {
        config: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        luckySN: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        shortlist: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        shortlistInput: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        shortlist_sort: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        prizeList: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
    },
    computed: {
        ...mapGetters([
            "shortlistBySort",

            "config",
            "luckySN",
            "shortlist",
            "shortlistInput",
            "shortlist_sort",
            "prizeList",
        ])
    },
    mounted() {
        const that = this;
        that.init();
    },
    components: {
        headerBarBox,
        candidateBox,
        editListModal,
        prizeListModal,
        getLuckyModal,
        luckyModal,
        resultModal,
        settingModal,
    },
    store,
});