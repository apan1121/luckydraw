export default {
    initSystem({ commit }, params) {
        commit("initSystem", params);
    },
    saveToLocalStorage({ commit }, params) {
        commit("saveToLocalStorage", params);
    },
    setConfig({ commit }, params) {
        commit("setConfig", params);
    },
    clearAllData({ commit }, params) {
        commit("clearAllData", params);
    },
    setCommon({ commit }, params) {
        commit("setDailyFilter", params);
    },
    triggerOpenEditListModal({ commit }, params) {
        commit("triggerOpenEditListModal", params);
    },
    triggerOpenEditPrizeModal({ commit }, params) {
        commit("triggerOpenEditPrizeModal", params);
    },
    triggerOpenGetLuckyModal({ commit }, params) {
        commit("triggerOpenGetLuckyModal", params);
    },
    triggerOpenLuckyModal({ commit }, params) {
        commit("triggerOpenLuckyModal", params);
    },
    triggerOpenResultModal({ commit }, params){
        commit("triggerOpenResultModal", params);
    },
    triggerOpenSettingModal({ commit }, params){
        commit("triggerOpenSettingModal", params);
    },
    setShortListInput({ commit }, params) {
        commit("setShortListInput", params);
    },
    setShortlistRandomSort({ commit}, params) {
        commit("setShortlistRandomSort", params);
    },

    setFocusSN({commit}, params) {
        commit("setFocusSN", params);
    },
    setFocusPrizeSN({commit}, params) {
        commit("setFocusPrizeSN", params);
    },

    setFocusSN2LuckySN({commit}, params) {
        commit("setFocusSN2LuckySN", params);
    },

    editShortList({commit}, params) {
        commit("editShortList", params);
    },

    saveNewPrize({commit}, params) {
        commit("saveNewPrize", params);
    },
    saveEditPrize({commit}, params) {
        commit("saveEditPrize", params);
    },
};