webpackHotUpdate("app/index",{

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
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
        "data-keyboard": "false"
      }
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
                  _vm._v("網站標題")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.webTitle,
                      expression: "input.webTitle"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.webTitle },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "webTitle", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊寬度 [" + _vm._s(_vm.input.boxWidth) + " px]")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.boxWidth,
                      expression: "input.boxWidth"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "100", max: "200" },
                  domProps: { value: _vm.input.boxWidth },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "boxWidth", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊高度 [" + _vm._s(_vm.input.boxHeight) + " px]")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.boxHeight,
                      expression: "input.boxHeight"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "50", max: "100" },
                  domProps: { value: _vm.input.boxHeight },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "boxHeight", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("標題大小 [" + _vm._s(_vm.input.titleSize) + " px]")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.titleSize,
                      expression: "input.titleSize"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "15", max: "25" },
                  domProps: { value: _vm.input.titleSize },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "titleSize", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v(
                    "副標題大小 [" + _vm._s(_vm.input.subtitleSize) + " px]"
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.subtitleSize,
                      expression: "input.subtitleSize"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "15", max: "25" },
                  domProps: { value: _vm.input.subtitleSize },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "subtitleSize", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊預設顏色 "),
                  _c("div", {
                    staticClass: "show-blcok",
                    style: { background: _vm.input.defaultColor }
                  })
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.defaultColor,
                      expression: "input.defaultColor"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.defaultColor },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "defaultColor", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊選取顏色 "),
                  _c("div", {
                    staticClass: "show-blcok",
                    style: { background: _vm.input.focusColor }
                  })
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.focusColor,
                      expression: "input.focusColor"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.focusColor },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "focusColor", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("區塊預設顏色 "),
                  _c("div", {
                    staticClass: "show-blcok",
                    style: { background: _vm.input.defaultColor }
                  })
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.defaultColor,
                      expression: "input.defaultColor"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.defaultColor },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "defaultColor", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v(
                    "亂數跳動次數 [" + _vm._s(_vm.input.defaultRunTime) + " 次]"
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.defaultRunTime,
                      expression: "input.defaultRunTime"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "10", max: "100" },
                  domProps: { value: _vm.input.defaultRunTime },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "defaultRunTime", $event.target.value)
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c("div", { staticClass: "col-6 text-left" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  attrs: { type: "button" },
                  on: { click: _vm.clear }
                },
                [_vm._v("清除所有資料")]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-6 text-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.cancel }
                },
                [_vm._v("回復")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button" },
                  on: { click: _vm.save }
                },
                [_vm._v("儲存")]
              )
            ])
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h5", { staticClass: "modal-title" }, [
        _c("i", { staticClass: "fas fa-cog" }),
        _vm._v("\n                    設定\n                ")
      ])
    ])
  }
]
render._withStripped = true



/***/ })

})
//# sourceMappingURL=index.dd55d497cbd662dffd5b.hot-update.js.map