(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{104:function(t,e,r){"use strict";(function(t){var a=r(0),n=r(2);function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){s(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e,r){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var a=r.call(t,e||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}e.a={components:{},filters:{},props:{},data:()=>({}),computed:o({},Object(n.c)([])),watch:{},created(){},mounted(){var e=this;t(e.$refs.box).bind("shown.bs.modal",()=>{a.g.mixpanel("UpgradeDataOpen_click"),a.g.gtag("event","UpgradeDataOpen_click");var r=a.f.randRange(2,3);setTimeout(()=>{e.upgradeLuckyDrawData(),t(e.$refs.box).modal("hide")},1e3*r)}),t(e.$refs.box).bind("hidden.bs.modal",()=>{a.g.mixpanel("UpgradeDataClose_click"),a.g.gtag("event","UpgradeDataClose_click")}),t(e.$refs.box).modal("show")},updated(){},destroyed(){},methods:o(o({},Object(n.b)({})),Object(n.d)({upgradeLuckyDrawData:"upgradeLuckyDrawData"}))}}).call(this,r(14))},360:function(t,e,r){"use strict";r.r(e);var a=function(){return(0,this._self._c)("div",{ref:"box",staticClass:"modal result-modal",attrs:{tabindex:"-1",role:"dialog"}},[this._m(0)])};a._withStripped=!0;var n=r(104).a,i=r(9),o=Object(i.a)(n,a,[function(){var t=this._self._c;return t("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[t("div",{staticClass:"modal-content"},[t("div",{staticClass:"modal-body"},[t("p",{staticClass:"text-center mb-3",staticStyle:{"font-size":"50px"}},[t("i",{staticClass:"fa-spin fas fa-sync"})]),this._v(" "),t("h5",{staticClass:"text-center",staticStyle:{"font-size":"30px"}},[this._v("\n                        資料轉換中\n                    ")])])])])}],!1,null,"3c039441",null);e.default=o.exports}}]);