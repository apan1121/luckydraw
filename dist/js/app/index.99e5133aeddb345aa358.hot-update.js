webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/resultModal.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/babel-loader/lib!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/resultModal.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
            resultList: [],
            luckyOption: {
                0: "未中獎",
                1: "中獎"
            },
            editsortList: null
        };
    },
    methods: {
        download: function download() {
            var that = this;
            var resultList = JSON.parse(JSON.stringify(that.resultList));

            var cvs = "姓名,職位,獎項\n" + resultList.map(function (Obj) {
                var data = [];
                data.push(Obj.name);
                data.push(Obj.pos);
                data.push(Obj.award || "--");
                return data.join(",");
            }).join("\r\n");

            var csvContent = "data:text/csv;charset=utf-8," + cvs;
            var encodedUri = encodeURI(csvContent);

            var link = document.createElement("a");
            link.style.display = "none";
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "中獎名單.csv");
            document.body.appendChild(link); // Required for FF
            link.click();
        },
        openEdit: function openEdit(index, editFlag) {
            var that = this;
            var resultList = JSON.parse(JSON.stringify(that.resultList));

            resultList = resultList.map(function (data) {
                data.edit = false;
                return data;
            });
            resultList[index].edit = editFlag;

            if (editFlag) {
                that.editsortList = JSON.parse(JSON.stringify(resultList[index]));
            }

            that.resultList = resultList;
        },
        save: function save() {
            var that = this;
            var editsortList = JSON.parse(JSON.stringify(that.editsortList));
            var params = {
                data: editsortList
            };
            that.$store.dispatch("editShortList", params);
        }
    },
    watch: {
        triggerOpenResult: function triggerOpenResult() {
            var that = this;
            targetDom.modal("show");
        },
        shortlistByLuckySN: function shortlistByLuckySN() {
            var that = this;
            var shortlistByLuckySN = JSON.parse(JSON.stringify(that.shortlistByLuckySN));
            that.resultList = shortlistByLuckySN.map(function (data) {
                data.lucky = that.luckySN.includes(data.sn) ? 1 : 0;
                data.edit = false;
                return data;
            });
        }
    },
    computed: _extends({}, (0, _vuex.mapGetters)(["triggerOpenResult", "shortlistByLuckySN", "luckySN", "config"])),
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
//# sourceMappingURL=index.99e5133aeddb345aa358.hot-update.js.map