webpackHotUpdate("app/index",{

/***/ "./lib/store/mutations/common.js":
/*!***************************************!*\
  !*** ./lib/store/mutations/common.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = {
    initSystem: function initSystem(state, params) {
        var defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));

        state.config = defaultConfig;
    },
    saveToLocalStorage: function saveToLocalStorage(state, params) {},
    setConfig: function setConfig(state, params) {
        var config = JSON.parse(JSON.stringify(state.config));
        config = _extends({}, config, params.config);
        state.config = config;
    },
    triggerOpenEditListModal: function triggerOpenEditListModal(state, params) {
        state.triggerOpenEditList = new Date().getTime();
    },
    triggerOpenLuckyModal: function triggerOpenLuckyModal(state, params) {
        state.triggerOpenLucky = new Date().getTime();
    },
    triggerOpenResultModal: function triggerOpenResultModal(state, params) {
        state.triggerOpenResult = new Date().getTime();
    },
    triggerOpenSettingModal: function triggerOpenSettingModal(state, params) {
        state.triggerOpenSetting = new Date().getTime();
    },
    editShortList: function editShortList(state, params) {
        var data = params.data;
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));
        var luckySN = JSON.parse(JSON.stringify(state.luckySN));

        var sn = data.sn;
        if (data.lucky == "1") {
            if (!luckySN.includes(sn)) {
                luckySN.push(sn);
            }
        } else {
            var index = luckySN.indexOf(sn);
            if (index >= 0) {
                luckySN.splice(index, 1);
            }
        }

        shortlist[sn].award = data.award.split(",");

        state.shortlist = shortlist;
        state.luckySN = luckySN;
    },
    setShortListInput: function setShortListInput(state, params) {
        var shortlistInput = params.shortlistInput;
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));
        var shortlist_sort = JSON.parse(JSON.stringify(state.shortlist_sort));

        var shortlistInputObj = {};
        var shortlistInputArr = shortlistInput.split("\n").map(function (data) {
            data = data.split("|").map(function (string) {
                return string.trim();
            });
            var Obj = {
                name: data[0],
                pos: data[1] || ""
            };
            return Obj;
        }).filter(function (data) {
            if (!!data.name) {
                shortlistInputObj[data.name] = data;
                return !!data.name;
            } else {
                return false;
            }
        });

        var matchName = [];
        shortlist = shortlist.map(function (data) {
            data.del = !!!shortlistInputObj[data.name];
            if (!data.del) {
                matchName.push(data.name);
                data.pos = shortlistInputObj[data.name].pos;
                if (!shortlist_sort.includes(data.sn)) {
                    shortlist_sort.push(data.sn);
                }
            } else {
                shortlist_sort = shortlist_sort.filter(function (sn) {
                    return sn != data.sn;
                });
            }
            return data;
        });

        shortlistInputArr.forEach(function (data) {
            if (!matchName.includes(data.name)) {
                var sn = shortlist.length;
                shortlist.push({
                    sn: sn,
                    name: data.name,
                    pos: data.pos,
                    award: [],
                    del: false
                });
                shortlist_sort.push(sn);
            }
        });

        state.shortlistInput = shortlistInputArr.map(function (data) {
            return ["name", "pos"].map(function (key) {
                return data[key];
            }).filter(function (value) {
                return !!value;
            }).join("|");
        }).join("\n");
        state.shortlist = shortlist;
        state.shortlist_sort = shortlist_sort;
    },
    setShortlistRandomSort: function setShortlistRandomSort(state, params) {
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));
        var shortlist_sort = JSON.parse(JSON.stringify(state.shortlist_sort));

        var shortlistSN = shortlist.filter(function (data) {
            return !data.del;
        }).map(function (data) {
            return data.sn;
        });

        var loopTime = shortlistSN.length;
        var shortlistSN_new = [];
        for (var i = 0; i < loopTime; i++) {
            var length = shortlistSN.length;
            var index = parseInt(Math.random() * 100 % length);
            shortlistSN_new.push(shortlistSN[index]);
            shortlistSN.splice(index, 1);
        }
        state.shortlist_sort = shortlistSN_new;
    },
    setFocusSN: function setFocusSN(state, params) {
        state.focusSN = params;
    },
    setFocusSN2LuckySN: function setFocusSN2LuckySN(state, params) {
        var shortlist = JSON.parse(JSON.stringify(state.shortlist));
        var luckySN = JSON.parse(JSON.stringify(state.luckySN));
        var focusSN = JSON.parse(JSON.stringify(state.focusSN));

        var filterResult = shortlist.filter(function (data) {
            if (data.sn == focusSN) {
                data.award.push(params.award);
                return true;
            } else {
                return false;
            }
        });

        if (filterResult.length > 0 && !luckySN.includes(focusSN)) {
            luckySN.push(focusSN);
        }

        state.focusSN = null;
        state.luckySN = luckySN;
        state.shortlist = shortlist;
    }
};

/***/ })

})
//# sourceMappingURL=index.0fd880f0e60a53ef7f88.hot-update.js.map