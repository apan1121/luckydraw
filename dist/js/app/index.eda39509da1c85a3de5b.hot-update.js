webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/pressplay/workspace/DockerPP_V2/pp_app/web/luckydraw/node_modules/babel-loader/lib!/Users/pressplay/workspace/DockerPP_V2/pp_app/web/luckydraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var lib_common_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib/common/util */ "./lib/common/util.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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



var targetDom = null;
var mixpanelTrackerTimer = null;
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      input: {
        webTitle: "",
        headerColor: '#343a40',
        backgroundImg: '',
        backgroundOpacity: 0.5,
        boxWidth: 0,
        boxHeight: 0,
        titleSize: 0,
        subtitleSize: 0,
        defaultColor: "#FFF",
        focusColor: "#FFC",
        doneColor: "#FCC",
        defaultRunTime: 0
      },
      orgInput: {
        webTitle: "",
        boxWidth: 0,
        boxHeight: 0,
        titleSize: 0,
        subtitleSize: 0,
        defaultColor: "#FFF",
        focusColor: "#FFC",
        doneColor: "#FCC",
        defaultRunTime: 0
      }
    };
  },
  methods: {
    save: function save() {
      var that = this;
      var params = {
        config: that.input
      };
      lib_common_util__WEBPACK_IMPORTED_MODULE_2__["mixpanel"].track("save setting", params);
      targetDom.modal("hide");
    },
    cancel: function cancel() {
      var that = this;
      var params = {
        config: that.orgInput
      };
      that.$store.dispatch("setConfig", params);
      lib_common_util__WEBPACK_IMPORTED_MODULE_2__["mixpanel"].track("cancel setting", params);
      targetDom.modal("hide");
    },
    clear: function clear() {
      var that = this;

      if (confirm("您確定要清除所有的資料嗎？")) {
        that.$store.dispatch("clearAllData");
        lib_common_util__WEBPACK_IMPORTED_MODULE_2__["mixpanel"].track("clear all data");
        targetDom.modal("hide");
      }
    }
  },
  watch: {
    input: {
      deep: true,
      handler: function handler(val, oldVal) {
        var that = this;
        var params = {
          config: that.input
        };
        that.$store.dispatch("setConfig", params);
        clearTimeout(mixpanelTrackerTimer);
        mixpanelTrackerTimer = setTimeout(function () {
          lib_common_util__WEBPACK_IMPORTED_MODULE_2__["mixpanel"].track("try setting", params);
        }, 2000);
      }
    },
    triggerOpenSetting: function triggerOpenSetting() {
      var that = this;
      targetDom.modal("show");
    }
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"])(["triggerOpenSetting", "config"])),
  mounted: function mounted() {
    var that = this;
    targetDom = $(that.$el);
    targetDom.bind("shown.bs.modal", function () {
      var config = JSON.parse(JSON.stringify(that.config));
      that.input = _objectSpread(_objectSpread({}, that.input), config);
      that.orgInput = _objectSpread(_objectSpread({}, that.orgInput), config);
      lib_common_util__WEBPACK_IMPORTED_MODULE_2__["mixpanel"].track("open setting");
    });
  },
  props: {},
  components: {}
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js")))

/***/ })

})
//# sourceMappingURL=index.eda39509da1c85a3de5b.hot-update.js.map