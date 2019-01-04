webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/candidateBox.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/babel-loader/lib!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/candidateBox.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _vue = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {};
    },
    methods: _extends({}, (0, _vuex.mapActions)({})),
    watch: {},
    computed: _extends({
        boxColor: function boxColor() {
            var that = this;
            var color = that.config.defaultColor;
            if (that.luckySN.includes(that.candidateInfo.sn)) {}
        }
    }, (0, _vuex.mapGetters)(["focusSN", "luckySN", "config"])),
    mounted: function mounted() {},

    props: {
        candidateIndex: {
            default: null
        },
        candidateInfo: {
            default: null
        }
    },
    components: {}
};

/***/ })

})
//# sourceMappingURL=index.0c2aa92ad1c1e9a6b5d4.hot-update.js.map