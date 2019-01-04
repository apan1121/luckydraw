import Vue from 'vue';
import Vuex from 'vuex';

import actionsStorage from './actions/index';
import stateStorage from './state/index';
import mutationsStorage from './mutations/index';
import gettersStorage from './getters/index';


Vue.use(Vuex);
export default {
}

export const createStore = (params) => {
    let actions = {};
    let state = {};
    let mutations = {};
    let getters = {};

    params.forEach(function(key){
        let keys = key.split(".");
        let tmpActions = {...actionsStorage};
        let tmpState = {...stateStorage};
        let tmpMutations = {...mutationsStorage};
        let tmpGetters = {...gettersStorage};
        while ( keys.length > 0 ) {
            key = keys.shift();

            if ([undefined].indexOf(tmpActions[key]) == -1) {
                 tmpActions = tmpActions[key];
            }

            if ([undefined].indexOf(tmpState[key]) == -1) {
                 tmpState = tmpState[key];
            }

            if ([undefined].indexOf(tmpMutations[key]) == -1) {
                 tmpMutations = tmpMutations[key];
            }

            if ([undefined].indexOf(tmpGetters[key]) == -1) {
                 tmpGetters = tmpGetters[key];
            }
        }
        actions = Object.assign({}, actions, tmpActions);
        state = Object.assign({}, state, tmpState);
        mutations = Object.assign({}, mutations, tmpMutations);
        getters = Object.assign({}, getters, tmpGetters);
    });

    // if ([null, undefined].indexOf(jsVars.debug) == -1 && jsVars.debug == 1) {
    //     // console.log({...actions}, {...state}, {...mutations}, {...getters});
    // }

    return new Vuex.Store({
      actions,
      state,
      mutations,
      getters,
      struct: true
    })
};