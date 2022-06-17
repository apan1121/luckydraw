import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters';

const module_name = 'Common/Demo';
const module_store = {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
};


export default {
    module_name,
    ...module_store,
};
export { module_name, module_store };