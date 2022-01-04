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

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/pressplay/workspace/DockerPP_V2/pp_app/web/luckydraw/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/pressplay/workspace/DockerPP_V2/pp_app/web/luckydraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "modal",
      attrs: {
        tabindex: "-1",
        role: "dialog",
        "data-backdrop": "static",
        "data-keyboard": "false",
      },
    },
    [
      _c("div", { staticClass: "modal-dialog", attrs: { role: "document" } }, [
        _c("div", { staticClass: "modal-content" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "modal-body" }, [
            _c("form", [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("網站標題"),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.webTitle,
                      expression: "input.webTitle",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.webTitle },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "webTitle", $event.target.value)
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  {
                    staticStyle: { display: "flex" },
                    attrs: { for: "exampleInputEmail1" },
                  },
                  [
                    _vm._v(
                      "\n                            Header 顏色\n                            "
                    ),
                    _c("span", {
                      style: {
                        background: _vm.input.headerColor,
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                        border: "1px solid #999",
                      },
                    }),
                  ]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.headerColor,
                      expression: "input.headerColor",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.headerColor },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "headerColor", $event.target.value)
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  {
                    staticStyle: { display: "flex" },
                    attrs: { for: "exampleInputEmail1" },
                  },
                  [
                    _vm._v(
                      "\n                            背景圖片\n                        "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.backgroundImg,
                      expression: "input.backgroundImg",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.backgroundImg },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "backgroundImg", $event.target.value)
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  {
                    staticStyle: { display: "flex" },
                    attrs: { for: "exampleInputEmail1" },
                  },
                  [
                    _vm._v(
                      "\n                            背景透明度\n                        "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.number",
                      value: _vm.input.backgroundOpacity,
                      expression: "input.backgroundOpacity",
                      modifiers: { number: true },
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "number", min: "0", max: "1", step: "0.1" },
                  domProps: { value: _vm.input.backgroundOpacity },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.input,
                        "backgroundOpacity",
                        _vm._n($event.target.value)
                      )
                    },
                    blur: function ($event) {
                      return _vm.$forceUpdate()
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊寬度 [" + _vm._s(_vm.input.boxWidth) + " px]"),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.boxWidth,
                      expression: "input.boxWidth",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "100", max: "200" },
                  domProps: { value: _vm.input.boxWidth },
                  on: {
                    __r: function ($event) {
                      return _vm.$set(
                        _vm.input,
                        "boxWidth",
                        $event.target.value
                      )
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊高度 [" + _vm._s(_vm.input.boxHeight) + " px]"),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.boxHeight,
                      expression: "input.boxHeight",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "50", max: "100" },
                  domProps: { value: _vm.input.boxHeight },
                  on: {
                    __r: function ($event) {
                      return _vm.$set(
                        _vm.input,
                        "boxHeight",
                        $event.target.value
                      )
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("標題大小 [" + _vm._s(_vm.input.titleSize) + " px]"),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.titleSize,
                      expression: "input.titleSize",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "15", max: "25" },
                  domProps: { value: _vm.input.titleSize },
                  on: {
                    __r: function ($event) {
                      return _vm.$set(
                        _vm.input,
                        "titleSize",
                        $event.target.value
                      )
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v(
                    "副標題大小 [" + _vm._s(_vm.input.subtitleSize) + " px]"
                  ),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.subtitleSize,
                      expression: "input.subtitleSize",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "15", max: "25" },
                  domProps: { value: _vm.input.subtitleSize },
                  on: {
                    __r: function ($event) {
                      return _vm.$set(
                        _vm.input,
                        "subtitleSize",
                        $event.target.value
                      )
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊預設顏色 "),
                  _c("div", {
                    staticClass: "show-blcok",
                    style: { background: _vm.input.defaultColor },
                  }),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.defaultColor,
                      expression: "input.defaultColor",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.defaultColor },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "defaultColor", $event.target.value)
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊選取顏色 "),
                  _c("div", {
                    staticClass: "show-blcok",
                    style: { background: _vm.input.focusColor },
                  }),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.focusColor,
                      expression: "input.focusColor",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.focusColor },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "focusColor", $event.target.value)
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊完成顏色 "),
                  _c("div", {
                    staticClass: "show-blcok",
                    style: { background: _vm.input.doneColor },
                  }),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.doneColor,
                      expression: "input.doneColor",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.doneColor },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "doneColor", $event.target.value)
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v(
                    "亂數跳動次數 [" + _vm._s(_vm.input.defaultRunTime) + " 次]"
                  ),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.defaultRunTime,
                      expression: "input.defaultRunTime",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "10", max: "100" },
                  domProps: { value: _vm.input.defaultRunTime },
                  on: {
                    __r: function ($event) {
                      return _vm.$set(
                        _vm.input,
                        "defaultRunTime",
                        $event.target.value
                      )
                    },
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c("div", { staticClass: "col-6 text-left" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  attrs: { type: "button" },
                  on: { click: _vm.clear },
                },
                [_vm._v("清除所有資料")]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-6 text-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.cancel },
                },
                [_vm._v("回復")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button" },
                  on: { click: _vm.save },
                },
                [_vm._v("儲存")]
              ),
            ]),
          ]),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h5", { staticClass: "modal-title" }, [
        _c("i", { staticClass: "fas fa-cog" }),
        _vm._v("\n                    設定\n                "),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

})
//# sourceMappingURL=index.b4f60e6fd9820f9bff1e.hot-update.js.map