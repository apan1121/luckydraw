import { localStorage, popup, string, trackJS } from 'lib/common/util';

export default {
    setFavicon(state, key){
        document.querySelector('link[type="image/x-icon"]').setAttribute('href', state.favicon[key]);
    },

    CheckAdBlock(state, data){
        state.adBlocked = data;
    },
    /**
     * 系統初始化
     */
    initSystem(state, params){
        const luckyDrawSetting = localStorage.get('luckyDrawSetting', false);
        const luckyDrawStorage = localStorage.get('luckyDrawStorage', {});
        const luckyDrawKeyList = Object.keys(luckyDrawStorage);

        if (!!luckyDrawSetting && 1) {
            this.commit('triggerModal', { key: 'UpgradeData' });
            // this.commit('upgradeLuckyDrawData', luckyDrawSetting);
        } else if (luckyDrawKeyList.length === 0) {
            this.commit('createDefaultLuckyDraw', []);
        } else {
            this.commit('setLuckyDrawChooseList', []);
        }
    },

    /**
     * 舊結構轉成新結構
     */
    upgradeLuckyDrawData(state){
        const params = localStorage.get('luckyDrawSetting', false);
        const defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));
        const { config, prizeList, shortlist, shortlist_sort } = params;
        const luckyDrawFocusKey = string.getRandomString(20);

        const newPrizeList = [];
        const prizeMapping = {};

        prizeList.forEach((prize_title) => {
            const prize_sn = string.getRandomString(10);
            newPrizeList.push({
                prize_sn,
                title: prize_title,
                amount: 1,
                del: false,
            });
            prizeMapping[prize_title] = prize_sn;
        });


        const prizeCount = {};
        const candidateList = [];
        const candidateMapping = {};

        shortlist.forEach((shortInfo) => {
            if (shortInfo.del === false) {
                const sn = string.getRandomString(10);
                const award = [];
                shortInfo.award.forEach((prize_title) => {
                    const prize_sn = prizeMapping[prize_title];
                    award.push(prize_sn);
                    if (!prizeCount[prize_sn]) {
                        prizeCount[prize_sn] = 0;
                    }
                    prizeCount[prize_sn] += 1;
                });

                candidateList.push({
                    sn,
                    name: shortInfo.name,
                    pos: shortInfo.pos,
                    award,
                    del: false,
                });
                candidateMapping[shortInfo.sn] = sn;
            }
        });

        const candidateList_sort = [];
        shortlist_sort.forEach((sn) => {
            const new_sn = candidateMapping[sn];
            candidateList_sort.push(new_sn);
        });

        newPrizeList.forEach((item) => {
            item.amount = prizeCount[item.prize_sn] || 1;
        });

        if (!config.webTitle) {
            config.webTitle = 'Lucky Draw';
        }

        state.luckyDrawFocusKey = luckyDrawFocusKey;
        state.config = {
            ...defaultConfig,
            ...config,
        };
        state.prizeList = newPrizeList;
        state.candidateList_sort = candidateList_sort;
        state.candidateList = candidateList;

        state.luckyDrawChooseList = [];
        this.commit('formatHaveAwardCandidateSN');
        localStorage.del('luckyDrawSetting');
    },

    /**
     * 建立舊資料選單
     */
    setLuckyDrawChooseList(state){
        const luckyDrawStorage = localStorage.get('luckyDrawStorage', {});
        const luckyDrawChooseList = [];
        Object.keys(luckyDrawStorage).forEach((key) => {
            luckyDrawChooseList.push({
                key,
                title: luckyDrawStorage[key].config.webTitle,
            });
        });
        state.luckyDrawChooseList = luckyDrawChooseList;
    },

    /**
     * 建立一筆預設抽獎活動
     */
    createDefaultLuckyDraw(state, params){
        trackJS.mixpanel('createDefaultLuckyDraw_trigger', params);
        const luckyDrawFocusKey = string.getRandomString(20);

        const config = JSON.parse(JSON.stringify(state.defaultConfig));
        if (!!params.LuckyDrawName && 1) {
            config.webTitle = params.LuckyDrawName;
        }
        const candidateList = [];
        const candidateList_sort = [];
        const prizeList = [];

        state.luckyDrawFocusKey = luckyDrawFocusKey;
        state.config = config;
        state.candidateList = candidateList;
        state.candidateList_sort = candidateList_sort;
        state.prizeList = prizeList;

        state.luckyDrawChooseList = [];
        this.commit('formatHaveAwardCandidateSN');
    },

    /**
     * 選擇抽獎活動
     */
    chooseLuckDrawFromStorage(state, key){
        const luckyDrawStorage = localStorage.get('luckyDrawStorage', {});

        if (luckyDrawStorage[key]) {
            const { config, candidateList, candidateList_sort, prizeList } = luckyDrawStorage[key];

            state.luckyDrawFocusKey = key;
            state.config = config;
            state.candidateList = candidateList;
            state.candidateList_sort = candidateList_sort;
            state.prizeList = prizeList;

            state.luckyDrawChooseList = [];
            trackJS.mixpanel('LuckyDrawChooseResetData_trigger', { key, config, candidateList, candidateList_sort, prizeList });
            this.commit('formatHaveAwardCandidateSN');
        }
    },

    /**
     * LocalStorage Listen 同步回 state
     */
    listenLocalStorageChange(state, params){
        const { luckyDrawFocusKey } = state;
        const luckyDrawStorage = localStorage.get('luckyDrawStorage', {});
        if (!!luckyDrawStorage[luckyDrawFocusKey] && 1) {
            const storage = luckyDrawStorage[luckyDrawFocusKey];
            const LSData = {
                config: JSON.parse(JSON.stringify(storage.config)),
                candidateList: JSON.parse(JSON.stringify(storage.candidateList)),
                candidateList_sort: JSON.parse(JSON.stringify(storage.candidateList_sort)),
                prizeList: JSON.parse(JSON.stringify(storage.prizeList)),
            };

            const NowData = {
                config: JSON.parse(JSON.stringify(state.config)),
                candidateList: JSON.parse(JSON.stringify(state.candidateList)),
                candidateList_sort: JSON.parse(JSON.stringify(state.candidateList_sort)),
                prizeList: JSON.parse(JSON.stringify(state.prizeList)),
            };

            if (JSON.stringify(LSData) !== JSON.stringify(NowData)) {
                trackJS.mixpanel('LuckyDrawLS_sync', { key: luckyDrawFocusKey, ...storage });
                state.config = storage.config;
                state.candidateList = storage.candidateList;
                state.candidateList_sort = storage.candidateList_sort;
                state.prizeList = storage.prizeList;
                this.commit('formatHaveAwardCandidateSN');
            }
        }
    },

    /**
     * 刪除抽獎活動
     */
    removeLuckDrawFromStorage(state, key){
        const luckyDrawStorage = localStorage.get('luckyDrawStorage', {});
        delete luckyDrawStorage[key];
        localStorage.set('luckyDrawStorage', luckyDrawStorage);
        this.commit('setLuckyDrawChooseList', []);
    },

    /**
     * 儲存到 localStorage
     */
    saveToLocalStorage(state){
        const luckyDrawStorage = localStorage.get('luckyDrawStorage', {});
        const { luckyDrawFocusKey, config, candidateList, candidateList_sort, prizeList } = state;
        luckyDrawStorage[luckyDrawFocusKey] = {
            config,
            candidateList,
            candidateList_sort,
            prizeList,
        };
        localStorage.set('luckyDrawStorage', luckyDrawStorage);
    },

    /**
     * 設定列表
     */
    setConfig(state, params){
        let config = JSON.parse(JSON.stringify(state.config));
        config = { ...config, ...params.config };
        state.config = config;
    },

    /**
     * 清除此抽獎活動所有資訊
     */
    clearAllData(state, params){
        const defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));
        state.config = {
            ...defaultConfig,
            webTitle: state.config.webTitle,
        };
        // state.luckySN = [];
        // state.shortlist = [];
        // state.shortlist_sort = [];
        // state.prizeList = [];

        state.candidateList = [];
        state.candidateList_sort = [];
        state.prizeList = [];
        state.focusCandidateSN = null;
        state.focusPrizeSN = null;

        this.commit('formatHaveAwardCandidateSN');
    },

    /**
     * 開啟 Modal
     */
    triggerModal(state, params){
        const { key } = params;
        const triggerKey = `triggerOpen${key}`;
        if (typeof state[triggerKey] !== 'undefined') {
            if (typeof params.close === 'undefined') {
                state[triggerKey] = new Date().getTime();
            } else {
                state[triggerKey] = false;
            }

        }
    },

    /**
     * 儲存候選人列表
     */
    setCandidateListInput(state, params){
        const { candidateListInput } = params;
        let candidateList = JSON.parse(JSON.stringify(state.candidateList));
        let candidateList_sort = JSON.parse(JSON.stringify(state.candidateList_sort));


        const candidateListInputObj = {};
        candidateListInput.split('\n').map((data) => {
            const info = data.split(',').map(text => text.trim());

            const Obj = {
                name: info[0],
                pos: info[1] || '',
            };
            return Obj;
        }).forEach((data) => {
            if (data.name) {
                candidateListInputObj[`${data.name}`] = data;
                return !!data.name;
            }
            return true;
        });

        const matchName = [];
        candidateList = candidateList.map((data) => {
            const info = data;
            info.del = !candidateListInputObj[info.name];
            if (!info.del) {
                matchName.push(info.name);
                info.pos = candidateListInputObj[info.name].pos;
                if (!candidateList_sort.includes(info.sn)) {
                    candidateList_sort.push(info.sn);
                }
            } else {
                candidateList_sort = candidateList_sort.filter(sn => sn !== data.sn);
            }
            return info;
        });

        Object.keys(candidateListInputObj).forEach((key) => {
            const info = candidateListInputObj[key];
            if (!matchName.includes(info.name)) {
                const sn = string.getRandomString(10);
                candidateList.push({
                    sn,
                    name: info.name,
                    pos: info.pos,
                    award: [],
                    del: false,
                });
                candidateList_sort.push(sn);
            }
        });
        state.candidateList = candidateList;
        state.candidateList_sort = candidateList_sort;
        this.commit('formatHaveAwardCandidateSN');
    },

    /**
     * 建立亂數候選人
     */
    setCandidateListRandomSort(state, params){
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        const candidateListSN = candidateList.filter(data => !data.del).map(data => data.sn);

        const loopTime = candidateListSN.length;
        const candidateListSN_new = [];
        for (let i = 0; i < loopTime; i += 1) {
            const { length } = candidateListSN;
            const index = parseInt((Math.random() * 100) % length);
            candidateListSN_new.push(candidateListSN[index]);
            candidateListSN.splice(index, 1);
        }

        state.candidateList_sort = candidateListSN_new;
    },

    /**
     * 設定候選人資訊
     */
    setCandidateInfo(state, params){
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        let index = false;
        candidateList.forEach((candidateInfo, candidateIndex) => {
            if (candidateInfo.sn === params.sn) {
                index = candidateIndex;
            }
        });

        if (index !== false) {
            candidateList[index] = {
                ...candidateList[index],
                ...params,
            };
        }
        state.candidateList = candidateList;
    },

    /**
     * 同步禮物資訊
     */
    syncPrizeList(state, params){
        state.prizeList = JSON.parse(JSON.stringify(params));
    },

    /**
     * 設定 focus 候選人 SN
     */
    setFocusCandidateSN(state, params){
        state.focusCandidateSN = params;
    },

    /**
     * 設定 focus 獎項 SN
     */
    setFocusPrizeSN(state, params){
        state.focusPrizeSN = params;
    },

    /**
     * 更新中獎名單
     */
    formatHaveAwardCandidateSN(state){
        const ValidatePrizeSN = [];
        const haveAwardCandidateSN = [];

        state.prizeList.forEach((item) => {
            if (!!item && item.del === false) {
                ValidatePrizeSN.push(item.prize_sn);
            }
        });

        state.candidateList.forEach((candidateInfo) => {
            if (candidateInfo.del === false && candidateInfo.award) {
                let award = false;
                candidateInfo.award.forEach((prize_sn) => {
                    if (ValidatePrizeSN.includes(prize_sn)) {
                        award = true;
                    }
                });
                if (award === true) {
                    haveAwardCandidateSN.push(candidateInfo.sn);
                }
            }
        });

        state.haveAwardCandidateSN = haveAwardCandidateSN;
    },

    /**
     * 綁定獎項與候選人
     */
    setFocusCandidateBindPrize(state, params){
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        const { prize_sn, candidate_sn } = params;
        let focusIndex = false;
        candidateList.forEach((item, index) => {
            if (candidate_sn === item.sn) {
                focusIndex = index;
            }
        });

        if (focusIndex !== false) {
            candidateList[focusIndex].award.push(prize_sn);
        }

        state.focusPrizeSN = false;
        state.focusCandidateSN = false;
        state.candidateList = candidateList;
        this.commit('formatHaveAwardCandidateSN');
    },

    /**
     * 隨機建立抽獎資訊
     */
    createRandomLuckyDraw(state){
        const randomCandidateNames = state.randomCandidateNames.split(',');
        const randomCandidatePos = state.randomCandidatePos.split(',');
        const randomPrize = state.randomPrize.split(',');
        const randomColor = state.randomColor.split(',');
        const randomBgImg = state.randomBgImg.split(',');
        const randomConfig = JSON.parse(JSON.stringify(state.randomConfig));
        const config = JSON.parse(JSON.stringify(state.config));

        const getRandomCandidateName = () => {
            const index = string.randRange(0, randomCandidateNames.length - 1);
            const name = randomCandidateNames.splice(index, 1);
            return name[0];
        };

        const getRandomPrize = () => {
            const index = string.randRange(0, randomPrize.length - 1);
            const name = randomPrize.splice(index, 1);
            return name[0];
        };

        const getRandomColor = () => {
            const index = string.randRange(0, randomColor.length - 1);
            const name = randomColor.splice(index, 1);
            return name[0];
        };

        const getRandomBgImg = () => {
            const index = string.randRange(0, randomBgImg.length - 1);
            const name = randomBgImg.splice(index, 1);
            return name[0];
        };

        const getRandomCandidatePos = () => {
            const index = string.randRange(0, randomCandidatePos.length - 1);
            let pos = randomCandidatePos[index];
            if (pos.includes('_o')) {
                pos = pos.replace('_o', '');
                randomCandidatePos.splice(index, 1);
            }
            return pos;
        };

        randomConfig.defaultColor = getRandomColor();
        randomConfig.doneColor = getRandomColor();
        randomConfig.focusColor = getRandomColor();
        randomConfig.titleSize = string.randRange(15, 25);
        randomConfig.subtitleSize = string.randRange(randomConfig.titleSize - 10, randomConfig.titleSize - 5);
        randomConfig.defaultRunTime = string.randRange(10, 100);
        randomConfig.backgroundImg = getRandomBgImg();
        randomConfig.boxMV = string.randRange(3, 30);
        randomConfig.boxMH = string.randRange(3, 30);

        const CandidateCount = string.randRange(10, 60);
        const candidateList = [];
        for (let i = 0; i < CandidateCount; i++) {
            const sn = string.getRandomString(10);
            candidateList.push({
                sn,
                name: getRandomCandidateName(),
                pos: getRandomCandidatePos(),
                award: [],
                del: false,
            });
        }

        const PrizeCount = string.randRange(5, 20);
        const prizeList = [];
        for (let i = 0; i < PrizeCount; i++) {
            const prize_sn = string.getRandomString(10);
            prizeList.push({
                prize_sn,
                title: getRandomPrize(),
                amount: string.randRange(1, 10),
                del: false,
            });
        }

        state.candidateList = candidateList;
        state.luckyDrawIsRandom = true;
        state.prizeList = prizeList;
        state.config = {
            ...config,
            ...randomConfig,
        };
        this.commit('formatHaveAwardCandidateSN');
        this.commit('setCandidateListRandomSort');
    },


    setIsTutorial(state, bool){
        state.isTutorial = !!bool;
    },
};