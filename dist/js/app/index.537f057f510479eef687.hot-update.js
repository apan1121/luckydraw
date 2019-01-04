webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/headerBarBox.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/babel-loader/lib!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/headerBarBox.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audio = {
    ding: new Audio("./dist/mp3/ding.mp3"),
    winner: [
    // new Audio("./dist/mp3/winner1.mp3"),
    new Audio("./dist/mp3/winner2.mp3")]
};

var waitTimeArr = [{
    "limit": 500,
    "wait": 30
}, {
    "limit": 100,
    "wait": 50
}, {
    "limit": 50,
    "wait": 50
}, {
    "limit": 6,
    "wait": 100
}, {
    "limit": 4,
    "wait": 500
}, {
    "limit": 3,
    "wait": 800
}, {
    "limit": 2,
    "wait": 1000
}, {
    "limit": 1,
    "wait": 1100
}];

var luckyActionTimer = null;

exports.default = {
    data: function data() {
        return {
            validSN: [],
            validSNLength: 0,
            validSNRandomRange: 0,
            defaultRunTime: 50,
            runTime: 0
        };
    },
    methods: {
        editList: function editList() {
            var that = this;
            that.$store.dispatch("triggerOpenEditListModal");
        },
        getLucky: function getLucky() {
            var that = this;
            that.validSN = that.validShortlistSN;
            that.validSNLength = that.validSN.length;
            that.validSNRandomRange = Math.pow(10, (that.validSNLength + "").length);

            that.$store.dispatch("setFocusSN", null);

            that.runTime = that.defaultRunTime;

            if (that.validSN.length > 0) {
                clearTimeout(luckyActionTimer);
                that.luckyAction();
            }
        },
        luckyAction: function luckyAction() {
            var that = this;
            var index = parseInt(Math.random() * 100000 % that.validSNLength);
            audio.ding.play();
            that.$store.dispatch("setFocusSN", that.validSN[index]);
            if (that.runTime > 0) {
                var waitTime = 0;
                for (var _index in waitTimeArr) {
                    if (that.runTime >= waitTimeArr[_index].limit) {
                        waitTime = waitTimeArr[_index].wait;
                        break;
                    }
                }

                that.runTime = that.runTime - 1;
                clearTimeout(luckyActionTimer);
                luckyActionTimer = setTimeout(function () {
                    audio.ding.pause();
                    audio.ding.currentTime = 0;
                    that.luckyAction();
                }, waitTime);
            } else {
                setTimeout(function () {
                    that.$store.dispatch("triggerOpenLuckyModal");
                    var index = parseInt(Math.random() * 10 % audio.winner.length);
                    audio.winner[index].play();
                }, 600);
            }
        },
        showResult: function showResult() {
            var that = this;
            that.$store.dispatch("triggerOpenResultModal");
        },
        showSetting: function showSetting() {
            var that = this;
            that.$store.dispatch("triggerOpenSettingModal");
        }
    },
    watch: {},
    computed: _extends({}, (0, _vuex.mapGetters)(["validShortlistSN"])),
    mounted: function mounted() {},

    props: {},
    components: {}
};

/***/ })

})
//# sourceMappingURL=index.537f057f510479eef687.hot-update.js.map