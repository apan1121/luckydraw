import string_module from './util/string';
import history_route_module from './util/history_route';
import mixpanel_module from './util/mixpanel';


const util = {
    string: string_module,
    history_route: history_route_module,
    mixpanel: mixpanel_module,
};

export const string = string_module;
export const history_route = history_route_module;
export const mixpanel = mixpanel_module;
export default util;
