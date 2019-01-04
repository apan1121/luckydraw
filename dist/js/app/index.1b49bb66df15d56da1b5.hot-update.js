webpackHotUpdate("app/index",{

/***/ "../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/css-loader!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.show-blcok[data-v-41f90424]{\n    width: 30px;\n    height: 30px;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&":
false,

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
                _vm._m(1),
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
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "exampleInputEmail1" } }, [
      _vm._v("區塊預設顏色 "),
      _c("div", { staticClass: "showBlcok" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-style-loader/index.js!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-style-loader!/Users/apan1121/Documents/Web/luckyDraw/node_modules/css-loader!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/vue-loader/lib??vue-loader-options!./settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& */ "../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "../../node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("1b0ca334", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/vue-loader/lib??vue-loader-options!./settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& */ "../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&", function() {
     var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/vue-loader/lib??vue-loader-options!./settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& */ "../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./app/components/common/settingModal.vue":
/*!************************************************!*\
  !*** ./app/components/common/settingModal.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settingModal.vue?vue&type=template&id=41f90424&scoped=true& */ "./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&");
/* harmony import */ var _settingModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settingModal.vue?vue&type=script&lang=js& */ "./app/components/common/settingModal.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _settingModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _settingModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& */ "./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _settingModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "41f90424",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! /Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-hot-reload-api/dist/index.js */ "../../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('41f90424', component.options)
    } else {
      api.reload('41f90424', component.options)
    }
    module.hot.accept(/*! ./settingModal.vue?vue&type=template&id=41f90424&scoped=true& */ "./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settingModal.vue?vue&type=template&id=41f90424&scoped=true& */ "./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&");
(function () {
      api.rerender('41f90424', {
        render: _settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "app/components/common/settingModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/vue-loader/lib??vue-loader-options!./settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css& */ "../../node_modules/vue-style-loader/index.js!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=style&index=0&id=41f90424&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_style_index_0_id_41f90424_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./app/components/common/settingModal.vue?vue&type=template&id=41f90424&":
false,

/***/ "./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./settingModal.vue?vue&type=template&id=41f90424&scoped=true& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_settingModal_vue_vue_type_template_id_41f90424_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

})
//# sourceMappingURL=index.1b49bb66df15d56da1b5.hot-update.js.map