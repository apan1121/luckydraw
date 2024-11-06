export default {
    adBlocked: state => state.adBlocked,
    favicon: state => state.favicon,

    config: state => state.config,

    /**
     * 舊抽獎活動選單
     */
    luckyDrawChooseList: state => state.luckyDrawChooseList,

    luckyDrawFocusKey: state => state.luckyDrawFocusKey,

    luckyDrawIsRandom: state => state.luckyDrawIsRandom,

    /**
     * 重新排序的列表
     */
    candidateListBySort(state){
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        const candidateListMapping = {};
        candidateList.forEach((item) => {
            candidateListMapping[item.sn] = item;
        });
        const candidateList_sort = JSON.parse(JSON.stringify(state.candidateList_sort));
        const data = candidateList_sort.map(sn => candidateListMapping[sn]);

        return data;
    },

    /**
     * 候選人列表
     */
    candidateList: state => state.candidateList,

    /**
     * 候選人對應表
     */
    candidateMapping(state){
        const candidateMapping = {};
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        candidateList.forEach((item) => {
            candidateMapping[item.sn] = item;
        });
        return candidateMapping;
    },

    /**
     * 候選人列表亂數排序
     */
    candidateList_sort: state => state.candidateList_sort,


    /**
     * 開啟候選人列表
     */
    triggerOpenCandidateList: state => state.triggerOpenCandidateList,

    /**
     * 開啟抽獎列表
     */
    triggerOpenGetLucky: state => state.triggerOpenGetLucky,

    /**
     * 開啟設定
     */
    triggerOpenSetting: state => state.triggerOpenSetting,

    /**
     * 開啟獎品列表
     */
    triggerOpenPrizeList: state => state.triggerOpenPrizeList,

    /**
     * 開啟中獎訊息
     */
    triggerOpenLucky: state => state.triggerOpenLucky,

    /**
     * 開啟結果頁面
     */
    triggerOpenResult: state => state.triggerOpenResult,

    /**
     * 開啟資料轉換
     */
    triggerOpenUpgradeData: state => state.triggerOpenUpgradeData,

    /**
     * 獎品列表
     */
    prizeList(state){
        return state.prizeList.filter((item) => {
            return !!item && item.del === false;
        });
        // return state.prizeList.filter(item => item.del === false);
    },

    /**
     * 獎勵與中獎人
     */
    prizeListByAward(state){
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        const prizeList = JSON.parse(JSON.stringify(state.prizeList));

        const prizeListCount = {};
        candidateList.forEach((candidate) => {
            if (candidate.del === false) {
                candidate.award.forEach((prize_sn) =>{
                    if (!prizeListCount[prize_sn]) {
                        prizeListCount[prize_sn] = 0;
                    }
                    prizeListCount[prize_sn] += 1;
                });
            }
        });

        const prizeListByAward = [];
        prizeList.forEach((prizeInfo) => {
            if (prizeInfo.del === false) {
                prizeInfo.count = prizeListCount[prizeInfo.prize_sn] || 0;
                prizeListByAward.push(prizeInfo);
            }
        });
        return prizeListByAward;
    },

    /**
     * 獎勵對應表
     */
    prizeMapping(state){
        const prizeList = JSON.parse(JSON.stringify(state.prizeList));
        const prizeMapping = {};
        prizeList.forEach((item, index) => {
            if (item.del === false) {
                item.index = index;
                prizeMapping[item.prize_sn] = item;
            }
        });
        return prizeMapping;
    },

    /**
     * 正在抽的人
     */
    focusCandidateSN: state => state.focusCandidateSN,

    /**
     * 正在抽的獎項
     */
    focusPrizeSN: state => state.focusPrizeSN,

    /**
     * 已經抽到獎的候選人
     */
    haveAwardCandidateSN: state => state.haveAwardCandidateSN,

    /**
     * 抽獎跑循環等待時間
     */
    getLuckyWaitTimeArr: state => state.getLuckyWaitTimeArr,


    /**
     * 有效的候選人
     */
    validCandidateListSN(state){
        const candidateList = JSON.parse(JSON.stringify(state.candidateList));
        const luckySN = JSON.parse(JSON.stringify(state.luckySN));


        const validSN = candidateList.filter(data => !luckySN.includes(data.sn) && !data.del).map(data => data.sn);

        return validSN;
    },

    randomCandidateNames: state => state.randomCandidateNames,
    randomCandidatePos: state => state.randomCandidatePos,
    randomPrize: state => state.randomPrize,
    randomBgImg: state => state.randomBgImg,

    isTutorial: state => state.isTutorial,
};