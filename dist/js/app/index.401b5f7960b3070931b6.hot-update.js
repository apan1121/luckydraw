webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/luckyModal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/babel-loader/lib!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/luckyModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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

var _vue = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");

var _candidateBox = __webpack_require__(/*! ./candidateBox */ "./app/components/common/candidateBox.vue");

var _candidateBox2 = _interopRequireDefault(_candidateBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var targetDom = null;

exports.default = {
    data: function data() {
        return {
            award: ""
        };
    },
    methods: _extends({
        save: function save() {
            var that = this;
            var params = {
                award: that.award
            };
            that.$store.dispatch("setFocusSN2LuckySN", params);
            targetDom.modal("hide");
        }
    }, (0, _vuex.mapActions)({})),
    watch: {
        triggerOpenLucky: function triggerOpenLucky() {
            var that = this;
            targetDom.modal("show");
        }
    },
    computed: _extends({}, (0, _vuex.mapGetters)(["triggerOpenLucky", "focusShortlist", "focusSN"])),
    mounted: function mounted() {
        var that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function () {
            that.award = "";
        });
    },

    props: {},
    components: {
        candidateBox: _candidateBox2.default
    }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/luckyModal.vue?vue&type=template&id=115e4a4c&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/apan1121/Documents/Web/luckyDraw/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/luckyModal.vue?vue&type=template&id=115e4a4c&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "modal lucky-modal",
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
            _c("div", { staticClass: "text-center" }, [
              _c("h4", [_vm._v("恭喜中獎")]),
              _vm._v(" "),
              _vm.focusShortlist
                ? _c(
                    "div",
                    [
                      _c("candidate-box", {
                        attrs: { "candidate-info": _vm.focusShortlist }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v("\n                    中獎獎項\n                    "),
              _c("div", { staticClass: "form-group" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.award,
                      expression: "award"
                    }
                  ],
                  staticClass: "form-control text-center",
                  attrs: { type: "text", placeholder: "輸入獎項名稱" },
                  domProps: { value: _vm.award },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.award = $event.target.value
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _vm._m(1),
            _vm._v(" "),
            _c("div", { staticClass: "col-6 text-right" }, [
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
        _c("i", { staticClass: "fas fa-vote-yea" }),
        _vm._v("\n                    恭喜中獎\n                ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-6 text-left" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-secondary",
          attrs: { type: "button", "data-dismiss": "modal" }
        },
        [_vm._v("取消")]
      )
    ])
  }
]
render._withStripped = true



/***/ })

})
//# sourceMappingURL=index.401b5f7960b3070931b6.hot-update.js.map