webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/babel-loader/lib!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vue = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var targetDom = null;

exports.default = {
    data: function data() {
        return {
            width: 0
        };
    },
    methods: {
        onChg: function onChg(e) {
            this.width = e.target.value;
        }
    },
    watch: {
        triggerOpenSetting: function triggerOpenSetting() {
            var that = this;
            targetDom.modal("show");
        }
    },
    computed: _extends({}, (0, _vuex.mapGetters)(["triggerOpenSetting"])),
    mounted: function mounted() {
        var that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function () {});
    },

    props: {},
    components: {}
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js")))

/***/ })

})
//# sourceMappingURL=index.7c656ac1591af61f18ca.hot-update.js.map