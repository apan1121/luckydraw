import Vue from 'vue';
import $ from 'jquery';
import 'vendor/imgLiquid/imgLiquid';
import { jsVars } from 'lib/common/util';

Vue.config.debug = process.env.NODE_ENV !== 'production';
Vue.config.devtools = process.env.NODE_ENV !== 'production';

/* 全頁偵測 resize Image */
let resizeImageTimer = null;
$('body').on('resizeImg', () => {
    clearTimeout(resizeImageTimer);
    resizeImageTimer = setTimeout(() => {
        $('.imgLiquidFill').imgLiquid();
    }, 50);
});


const { origin, pathname } = window.location;
const BASE_API_HOST = `${origin}${pathname}`;
jsVars.set('API_CONFIG.API_HOST', BASE_API_HOST);
jsVars.set('ASSETS_HOST', BASE_API_HOST);