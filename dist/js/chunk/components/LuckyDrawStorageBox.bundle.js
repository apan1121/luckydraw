(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{349:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"box",staticClass:"modal",attrs:{tabindex:"-1",role:"dialog","data-backdrop":"static","data-keyboard":"false"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),a("div",{staticClass:"modal-body"},[a("h6",{staticClass:"pb-2"},[t._v("\n                    發現你有建立過 "+t._s(t.luckyDrawChooseList.length)+" 個抽獎活動\n                ")]),t._v(" "),a("div",{staticClass:"lucky-draw-choose-list"},[t._l(t.luckyDrawChooseList,(function(e,r){return[a("div",{key:r,staticClass:"lucky-draw-choose-item mb-3"},[a("div",{staticClass:"lucky-draw-choose-text",on:{click:function(e){return t.chooseLuckDraw(r)}}},[t._v("\n                                "+t._s(e.title)+"\n                            ")]),t._v(" "),a("div",{staticClass:"lucky-draw-choose-del",on:{click:function(e){return t.removeLuckDraw(r)}}},[a("i",{staticClass:"fas fa-trash-alt"})])])]}))],2),t._v(" "),a("h6",{staticClass:"pb-2"},[t._v("\n                    或建立一組新的抽獎活動\n                ")]),t._v(" "),!1===t.createDefaultLuckyDrawFlag?[a("button",{staticClass:"btn btn-warning btn-lg btn-block",attrs:{type:"button"},on:{click:function(e){t.createDefaultLuckyDrawFlag=!0}}},[t._v("\n                        建立新抽獎活動\n                    ")])]:[a("div",{staticClass:"input-group input-group-lg mb-3"},[t._m(1),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.LuckyDrawName,expression:"LuckyDrawName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"活動名稱"},domProps:{value:t.LuckyDrawName},on:{input:function(e){e.target.composing||(t.LuckyDrawName=e.target.value)}}}),t._v(" "),a("div",{staticClass:"input-group-append"},[a("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.create}},[t._v("\n                                建立\n                            ")])])])],t._v(" "),a("hr"),t._v(" "),a("google-support")],2)])])])};r._withStripped=!0;var o=a(98).a,c=a(9),n=Object(c.a)(o,r,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title"},[e("i",{staticClass:"fas fa-box-open"}),this._v("\n                    抽獎列表\n                ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text",attrs:{id:"basic-addon2"}},[this._v("活動名稱")])])}],!1,null,"35e894f2",null);n.options.__file="components/LuckyDrawStorageBox/main.vue";e.default=n.exports},98:function(t,e,a){"use strict";(function(t){var r=a(2),o=a(0);function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function n(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){i(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}e.a={components:{GoogleSupport:function(){return a.e(1).then(a.bind(null,141))}},filters:{},props:{},data:function(){return{createDefaultLuckyDrawFlag:!1,LuckyDrawName:""}},computed:n({},Object(r.c)(["luckyDrawChooseList"])),watch:{luckyDrawChooseList:{deep:!0,immediate:!0,handler:function(){var e=this;this.luckyDrawChooseList.length>0?this.$nextTick((function(){t(e.$refs.box).modal("show")})):t(this.$refs.box).modal("hide")}}},created:function(){},mounted:function(){t(this.$refs.box).bind("shown.bs.modal",(function(){o.g.mixpanel("LuckyDrawStorageOpen_click"),o.g.gtag("event","LuckyDrawStorageOpen_click")})),t(this.$refs.box).bind("hidden.bs.modal",(function(){o.g.mixpanel("LuckyDrawStorageClose_click"),o.g.gtag("event","LuckyDrawStorageClose_click")}))},updated:function(){},destroyed:function(){},methods:n(n(n({},Object(r.b)({})),Object(r.d)({createDefaultLuckyDraw:"createDefaultLuckyDraw",chooseLuckDrawFromStorage:"chooseLuckDrawFromStorage",removeLuckDrawFromStorage:"removeLuckDrawFromStorage"})),{},{chooseLuckDraw:function(t){var e=this.luckyDrawChooseList[t];o.g.mixpanel("LuckyDrawStorageActionChoose_click",e),o.g.gtag("event","LuckyDrawStorageActionChoose_click",e),this.chooseLuckDrawFromStorage(e.key)},removeLuckDraw:function(t){var e=this,a=e.luckyDrawChooseList[t];o.e.warning({html:"你確定要刪除 ".concat(a.title,' 此筆抽獎嗎？<br><div class="text-danger">刪除後將無法回復</div>')},(function(){e.removeLuckDrawFromStorage(a.key),o.g.mixpanel("LuckyDrawStorageActionRemove_click",a),o.g.gtag("event","LuckyDrawStorageActionRemove_click",a)}))},create:function(){var t={LuckyDrawName:this.LuckyDrawName};this.createDefaultLuckyDraw(t),o.g.mixpanel("LuckyDrawStorageActionCreate_click",t),o.g.gtag("event","LuckyDrawStorageActionCreate_click",t)}})}}).call(this,a(14))}}]);