import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';


import { createStore } from 'lib/store/index';
import { jsVars } from 'lib/common/util';
import app from './app';

import 'jquery';
import 'bootstrap';


const store = createStore([
    'common',
]);

const Page = new Vue({
    el: '#appBox',
    components: {
        MainPage: () => import('components/MainPage/main.vue'),
    },
    data(){
        return {
            input: 'here',
        };
    },
    computed: {
        ...mapGetters([
        ]),
    },
    watch: {

    },
    mounted(){
    },
    methods: {
        init(){
        },
    },
    store,
});