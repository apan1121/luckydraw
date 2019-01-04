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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
    initSystem: function initSystem(state, params) {
        var defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));

        var config = JSON.parse(localStorage.getItem('config'));
        var luckySN = JSON.parse(localStorage.getItem('luckySN'));
        var shortlist = JSON.parse(localStorage.getItem('shortlist'));
        var shortlistInput = JSON.parse(localStorage.getItem('shortlistInput'));
        var shortlist_sort = JSON.parse(localStorage.getItem('shortlist_sort'));

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) != "object") {
            config = {};
        }

        if (!Array.isArray(luckySN)) {
            luckySN = [];
        }

        if (!Array.isArray(shortlist)) {
            shortlist = [];
        }

        if (!Array.isArray(shortlist_sort)) {
            shortlist_sort = [];
        }

        if (typeof shortlistInput != "string") {
            shortlistInput = "";
        }

        state.config = _extends({}, defaultConfig, config);
        state.luckySN = luckySN;
        state.shortlist = shortlist;
        state.shortlistInput = shortlistInput;
        state.shortlist_sort = shortlist_sort;
    },
    saveToLocalStorage: function saveToLocalStorage(state, params) {
        var config = JSON.stringify(state.config);
        var luckySN = JSON.stringify(state.luckySN);
        var shortlist = JSON.stringify(state.shortlist);
        var shortlistInput = JSON.stringify(state.shortlistInput);
        var shortlist_sort = JSON.stringify(state.shortlist_sort);

        localStorage.setItem('config', config);
        localStorage.setItem('luckySN', luckySN);
        localStorage.setItem('shortlist', shortlist);
        localStorage.setItem('shortlistInput', shortlistInput);
        localStorage.setItem('shortlist_sort', shortlist_sort);
    },
    setConfig: function setConfig(state, params) {
        var config = JSON.parse(JSON.stringify(state.config));
        config = _extends({}, config, params.config);
        state.config = config;
    },
    clearAllData: function clearAllData(state, params) {
        var defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));
        state.config = defaultConfig;
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
//# sourceMappingURL=index.671172bf2d20831c62ae.hot-update.js.map