export default {
    config: state => state.config,

    triggerOpenEditList: state => state.triggerOpenEditList,

    triggerOpenPrizeList: state => state.triggerOpenPrizeList,

    triggerOpenGetLucky: state => state.triggerOpenGetLucky,

    triggerOpenLucky: state => state.triggerOpenLucky,

    triggerOpenResult: state => state.triggerOpenResult,

    triggerOpenSetting: state => state.triggerOpenSetting,

    prizeList: state => state.prizeList,

    prizeListByAward: function(state){
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let prizeList = JSON.parse(JSON.stringify(state.prizeList));

        let matchPrize = {};
        shortlist.forEach(function(data){
            if (data.award.length > 0) {
                data.award.forEach(function(award){
                    if (!!award) {
                        if (!!matchPrize[award]) {
                            matchPrize[award] += 1;
                        } else {
                            matchPrize[award] = 1;
                        }
                    }
                });
            }
        });

        let prizeListByAward = prizeList.map(function(prize, sn){
            return {
                sn: sn,
                prize: prize,
                count: matchPrize[prize] || 0,
            };
        });

        return prizeListByAward;
    },

    shortlist: state => state.shortlist,

    shortlistInput: state => state.shortlistInput,

    shortlist_sort: state => state.shortlist_sort,

    shortlistBySort: function(state) {
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let shortlist_sort = JSON.parse(JSON.stringify(state.shortlist_sort));

        let data = shortlist_sort.map(function(sn) {
            return shortlist[sn];
        });

        return data;
    },

    validShortlistSN: function(state) {
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));
        let luckySN = JSON.parse(JSON.stringify(state.luckySN));


        let validSN = shortlist.filter(function(data) {
            return !luckySN.includes(data.sn) && !data.del;
        }).map(function(data) {
            return data.sn;
        });

        return validSN;
    },

    focusPrizeSN: state => state.focusPrizeSN,
    focusSN: state => state.focusSN,
    luckySN: state => state.luckySN,

    focusShortlist: function(state) {
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));

        let info = shortlist.filter(function(data) {
            return data.sn == state.focusSN;
        });

        return info[0] || null;
    },

    shortlistByLuckySN: function(state){
        let luckySN = JSON.parse(JSON.stringify(state.luckySN));
        let shortlist = JSON.parse(JSON.stringify(state.shortlist));

        let matchShortlist = luckySN.map(function(sn){
            let data = JSON.parse(JSON.stringify( shortlist[sn] ));
            data.award = data.award.join(";");
            return data;
        });

        let matchShortlist2 = shortlist.filter(function(data){
            return !luckySN.includes(data.sn);
        }).map(function(data){
            data = JSON.parse(JSON.stringify( data ));
            data.award = data.award.join(";");
            return data;
        });

        return matchShortlist.concat(matchShortlist2);
    },

}