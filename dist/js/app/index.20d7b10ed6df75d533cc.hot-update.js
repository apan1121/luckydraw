webpackHotUpdate("app/index",{

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");

var _index = __webpack_require__(/*! lib/store/index */ "./lib/store/index.js");

var _util = __webpack_require__(/*! lib/common/util */ "./lib/common/util.js");

var _headerBarBox = __webpack_require__(/*! ./components/common/headerBarBox */ "./app/components/common/headerBarBox.vue");

var _headerBarBox2 = _interopRequireDefault(_headerBarBox);

var _candidateBox = __webpack_require__(/*! ./components/common/candidateBox */ "./app/components/common/candidateBox.vue");

var _candidateBox2 = _interopRequireDefault(_candidateBox);

var _editListModal = __webpack_require__(/*! ./components/common/editListModal */ "./app/components/common/editListModal.vue");

var _editListModal2 = _interopRequireDefault(_editListModal);

var _luckyModal = __webpack_require__(/*! ./components/common/luckyModal */ "./app/components/common/luckyModal.vue");

var _luckyModal2 = _interopRequireDefault(_luckyModal);

var _resultModal = __webpack_require__(/*! ./components/common/resultModal */ "./app/components/common/resultModal.vue");

var _resultModal2 = _interopRequireDefault(_resultModal);

var _settingModal = __webpack_require__(/*! ./components/common/settingModal */ "./app/components/common/settingModal.vue");

var _settingModal2 = _interopRequireDefault(_settingModal);

__webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! bootstrap */ "../../node_modules/bootstrap/dist/js/bootstrap.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _index.createStore)(["common"]);

var Page = new _vue2.default({
    el: '#appBox',
    data: function data() {
        return {
            popstats: false
        };
    },
    methods: {
        init: function init() {
            var that = this;
        }
    },
    watch: {},
    computed: _extends({}, (0, _vuex.mapGetters)(["shortlistBySort"])),
    mounted: function mounted() {
        var that = this;
        that.init();
    },

    components: {
        headerBarBox: _headerBarBox2.default,
        candidateBox: _candidateBox2.default,
        editListModal: _editListModal2.default,
        luckyModal: _luckyModal2.default,
        resultModal: _resultModal2.default,
        settingModal: _settingModal2.default
    },
    store: store
});

/***/ })

})
//# sourceMappingURL=index.20d7b10ed6df75d533cc.hot-update.js.map