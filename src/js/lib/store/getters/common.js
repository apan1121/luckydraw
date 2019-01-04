export default {
    config: state => state.config,

    triggerOpenEditList: state => state.triggerOpenEditList,

    triggerOpenLucky: state => state.triggerOpenLucky,

    triggerOpenResult: state => state.triggerOpenResult,

    triggerOpenSetting: state => state.triggerOpenSetting,

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