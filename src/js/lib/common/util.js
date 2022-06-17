import string_module from './util/string';
import history_route_module from './util/history_route';
import mixpanel_module from './util/mixpanel';
import jsVars_module from './util/jsVars';
import popup_module from './util/popup';
import localStorage_module from './util/localStorage';
import linkRegister_module from './util/linkRegister';
import trackJS_module from './util/trackJS';
import tutorial_module from './util/tutorial';


const util = {
    string: string_module,
    history_route: history_route_module,
    mixpanel: mixpanel_module,
    jsVars: jsVars_module,
    popup: popup_module,
    localStorage: localStorage_module,
    linkRegister: linkRegister_module,
    trackJS: trackJS_module,
    Tutorial: tutorial_module,
};

export const string = string_module;
export const history_route = history_route_module;
export const mixpanel = mixpanel_module;
export const jsVars = jsVars_module;
export const popup = popup_module;
export const localStorage = localStorage_module;
export const linkRegister = linkRegister_module;
export const trackJS = trackJS_module;
export const Tutorial = tutorial_module;
export default util;
