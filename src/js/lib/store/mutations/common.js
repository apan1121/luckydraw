export default {
    initSystem(state, params) {
        let defaultConfig = JSON.parse( JSON.stringify( state.defaultConfig) );

        let config = JSON.parse(localStorage.getItem('config'));
        let luckySN = JSON.parse(localStorage.getItem('luckySN'));
        let shortlist = JSON.parse(localStorage.getItem('shortlist'));
        let shortlistInput = JSON.parse(localStorage.getItem('shortlistInput'));
        let shortlist_sort = JSON.parse(localStorage.getItem('shortlist_sort'));


        if ( typeof config != "object") {
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


        if ( typeof shortlistInput != "string") {
            shortlistInput = "";
        }


        state.config = {...defaultConfig, ...config};
        state.luckySN = luckySN;
        state.shortlist = shortlist;
        state.shortlistInput = shortlistInput;
        state.shortlist_sort = shortlist_sort;
    },
    saveToLocalStorage(state, params) {
        let config = JSON.stringify( state.config) ;
        let luckySN = JSON.stringify( state.luckySN);
        let shortlist = JSON.stringify( state.shortlist);
        let shortlistInput = JSON.stringify( state.shortlistInput);
        let shortlist_sort = JSON.stringify( state.shortlist_sort);


        localStorage.setItem('config', config);
        localStorage.setItem('luckySN', luckySN);
        localStorage.setItem('shortlist', shortlist);
        localStorage.setItem('shortlistInput', shortlistInput);
        localStorage.setItem('shortlist_sort', shortlist_sort);
    },

    setConfig(state, params) {
        let config = JSON.parse( JSON.stringify( state.config) );
        config = {...config, ...params.config};
        state.config = config;
    },

    clearAllData(state, params) {
        let defaultConfig = JSON.parse( JSON.stringify( state.defaultConfig) );
        state.config = defaultConfig;
        state.luckySN = [];
        state.shortlist = [];
        state.shortlistInput = "";
        state.shortlist_sort = [];
    },

    triggerOpenEditListModal(state, params) {
        state.triggerOpenEditList = new Date().getTime();
    },

    triggerOpenLuckyModal(state, params) {
        state.triggerOpenLucky = new Date().getTime();
    },

    triggerOpenResultModal(state,params) {
        state.triggerOpenResult = new Date().getTime();
    },

    triggerOpenSettingModal(state,params) {
        state.triggerOpenSetting = new Date().getTime();
    },

    editShortList(state, params) {
        let data = params.data;
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let luckySN = JSON.parse(JSON.stringify(state.luckySN));

        let sn = data.sn;
        if (data.lucky == "1") {
            if (!luckySN.includes(sn)) {
                luckySN.push(sn);
            }
        } else {
            let index = luckySN.indexOf(sn);
            if (index >= 0) {
                luckySN.splice(index, 1);
            }
        }

        shortlist[sn].award = data.award.split(",");

        state.shortlist = shortlist;
        state.luckySN = luckySN;
    },

    setShortListInput(state, params) {
        let shortlistInput = params.shortlistInput;
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let shortlist_sort = JSON.parse(JSON.stringify(state.shortlist_sort));


        let shortlistInputObj = {};
        let shortlistInputArr = shortlistInput.split("\n").map(function(data) {
            data = data.split("|").map(function(string) {
                return string.trim();
            });
            let Obj = {
                name: data[0],
                pos: data[1] || "",
            };
            return Obj;
        }).filter(function(data) {
            if (!!data.name) {
                shortlistInputObj[data.name] = data;
                return !!data.name;
            } else {
                return false;
            }
        });


        let matchName = [];
        shortlist = shortlist.map(function(data) {
            data.del = !!!shortlistInputObj[data.name];
            if (!data.del) {
                matchName.push(data.name);
                data.pos = shortlistInputObj[data.name].pos;
                if (!shortlist_sort.includes(data.sn)) {
                    shortlist_sort.push(data.sn);
                }
            } else {
                shortlist_sort = shortlist_sort.filter(function(sn) {
                    return sn != data.sn;
                });
            }
            return data;
        });

        shortlistInputArr.forEach(function(data) {
            if (!matchName.includes(data.name)) {
                let sn = shortlist.length;
                shortlist.push({
                    sn: sn,
                    name: data.name,
                    pos: data.pos,
                    award: [],
                    del: false,
                });
                shortlist_sort.push(sn);
            }
        });

        state.shortlistInput = shortlistInputArr.map(function(data) {
            return ["name", "pos"].map(function(key) {
                return data[key]
            }).filter(function(value) { return !!value }).join("|");
        }).join("\n");
        state.shortlist = shortlist;
        state.shortlist_sort = shortlist_sort;
    },

    setShortlistRandomSort(state, params) {
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let shortlist_sort = JSON.parse(JSON.stringify(state.shortlist_sort));

        let shortlistSN = shortlist.filter(function(data) {
            return !data.del;
        }).map(function(data) {
            return data.sn;
        });

        let loopTime = shortlistSN.length;
        let shortlistSN_new = [];
        for (let i = 0; i < loopTime; i++) {
            let length = shortlistSN.length;
            let index = parseInt(Math.random() * 100 % length);
            shortlistSN_new.push(shortlistSN[index]);
            shortlistSN.splice(index, 1);
        }
        state.shortlist_sort = shortlistSN_new;
    },

    setFocusSN(state, params) {
        state.focusSN = params;
    },

    setFocusSN2LuckySN(state, params) {
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let luckySN = JSON.parse(JSON.stringify(state.luckySN));
        let focusSN = JSON.parse(JSON.stringify(state.focusSN));

        let filterResult = shortlist.filter(function(data) {
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
}