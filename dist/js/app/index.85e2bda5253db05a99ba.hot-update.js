webpackHotUpdate("app/index",{

/***/ "./lib/store/getters/common.js":
/*!*************************************!*\
  !*** ./lib/store/getters/common.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    config: function config(state) {
        return state.config;
    },

    triggerOpenEditList: function triggerOpenEditList(state) {
        return state.triggerOpenEditList;
    },

    triggerOpenLucky: function triggerOpenLucky(state) {
        return state.triggerOpenLucky;
    },

    triggerOpenResult: function triggerOpenResult(state) {
        return state.triggerOpenResult;
    },

    triggerOpenSetting: function triggerOpenSetting(state) {
        return state.triggerOpenSetting;
    },

    shortlistInput: function shortlistInput(state) {
        return state.shortlistInput;
    },

    shortlistBySort: function shortlistBySort(state) {
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));
        var shortlist_sort = JSON.parse(JSON.stringify(state.shortlist_sort));

        var data = shortlist_sort.map(function (sn) {
            return shortlist[sn];
        });

        return data;
    },

    validShortlistSN: function validShortlistSN(state) {
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));
        var luckySN = JSON.parse(JSON.stringify(state.luckySN));

        var validSN = shortlist.filter(function (data) {
            return !luckySN.includes(data.sn) && !data.del;
        }).map(function (data) {
            return data.sn;
        });

        return validSN;
    },

    focusSN: function focusSN(state) {
        return state.focusSN;
    },
    luckySN: function luckySN(state) {
        return state.luckySN;
    },

    focusShortlist: function focusShortlist(state) {
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));

        var info = shortlist.filter(function (data) {
            return data.sn == state.focusSN;
        });

        return info[0] || null;
    },

    shortlistByLuckySN: function shortlistByLuckySN(state) {
        var luckySN = JSON.parse(JSON.stringify(state.luckySN));
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));

        var matchShortlist = luckySN.map(function (sn) {
            var data = JSON.parse(JSON.stringify(shortlist[sn]));
            data.award = data.award.join(";");
            return data;
        });

        var matchShortlist2 = shortlist.filter(function (data) {
            return !luckySN.includes(data.sn);
        }).map(function (data) {
            data = JSON.parse(JSON.stringify(data));
            data.award = data.award.join(";");
            return data;
        });

        return matchShortlist.concat(matchShortlist2);
    }
};

/***/ })

})
//# sourceMappingURL=index.85e2bda5253db05a99ba.hot-update.js.map