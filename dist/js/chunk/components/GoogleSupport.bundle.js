(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{106:function(e,t,o){"use strict";(function(e){var r=o(2);function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function n(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){s(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}t.a={components:{},filters:{},props:{trigger:{type:[String,Number,Boolean],default:0}},data:function(){return{show:!1,height:!1}},computed:n({},Object(r.c)(["adBlocked","isTutorial"])),watch:{isTutorial:{handler:function(){var e=this;this.isTutorial||this.$nextTick((function(){e.resetGoogleSupport()}))}},trigger:{handler:function(){var e=this;this.$nextTick((function(){e.resetGoogleSupport()}))}}},created:function(){},mounted:function(){var e=this;this.$nextTick((function(){e.resetGoogleSupport()}))},updated:function(){},destroyed:function(){},methods:n(n(n({},Object(r.b)({})),Object(r.d)({})),{},{resetGoogleSupport:function(){var e=this;clearTimeout(e.resetGoogleSupportTimer),e.show=!1,e.resetGoogleSupportTimer=setTimeout((function(){e.openGoogleSupport()}),10)},openGoogleSupport:function(){var e=this;clearTimeout(e.openGoogleSupportTimer),e.show=!0,e.openGoogleSupportTimer=setTimeout((function(){(window.adsbygoogle=window.adsbygoogle||[]).push({}),e.waitToReset()}),500)},waitToReset:function(){var t=this;clearTimeout(t.waitToResetTimer),t.waitToResetTimer=setTimeout((function(){t.height=e(t.$refs.box).find(".adsbygoogle").height(),t.resetGoogleSupport()}),1e4)}})}}).call(this,o(14))},141:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return e.isTutorial?e._e():o("div",{ref:"box",staticClass:"google-support-box",style:{height:!!e.height&&e.height+"px"}},[e.adBlocked?[o("div",{staticClass:"error"},[e._v("AdBlock 啟用，Google AdSense 無法使用")])]:[e.show?o("ins",{staticClass:"adsbygoogle",staticStyle:{display:"block"},attrs:{"data-ad-format":"fluid","data-ad-layout-key":"-fb+5w+4e-db+86","data-ad-client":"ca-pub-3068501078221920","data-ad-slot":"1897408904"}}):e._e()]],2)};r._withStripped=!0;var i=o(106).a,n=o(9),s=Object(n.a)(i,r,[],!1,null,"47320726",null);s.options.__file="components/GoogleSupport/main.vue";t.default=s.exports}}]);