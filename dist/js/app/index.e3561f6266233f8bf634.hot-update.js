webpackHotUpdate("app/index",{

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/candidateBox.vue?vue&type=template&id=c60614a2&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/candidateBox.vue?vue&type=template&id=c60614a2& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
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
  return !!_vm.candidateInfo
    ? _c(
        "div",
        {
          staticClass: "candidate-box",
          class: {
            focus: _vm.focusSN == _vm.candidateInfo.sn,
            done: _vm.luckySN.includes(_vm.candidateInfo.sn)
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "candidate-wrapper",
              style: {
                width: _vm.config.boxWidth + "px",
                height: _vm.config.boxHeight + "px"
              }
            },
            [
              _c(
                "div",
                {
                  staticClass: "candidate-name",
                  style: { "font-size": _vm.config.titleSize + "px" }
                },
                [
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.candidateInfo.name) +
                      "\n        "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "candidate-pos",
                  style: { "font-size": _vm.config.subtitleSize + "px" }
                },
                [
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.candidateInfo.pos) +
                      "\n        "
                  )
                ]
              )
            ]
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

})
//# sourceMappingURL=index.e3561f6266233f8bf634.hot-update.js.map