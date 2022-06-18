import jsVars from './jsVars';
import mixpanel from './mixpanel';
import localStorage from './localStorage';

const luckyDrawDebug = localStorage.get('luckyDrawDebug', false);
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-param-reassign */
const main = {
    default: {
    },
    fbq(action, event, data){
        // console.log('fbq', action, event, data);
        if (!!window.fbq) {
            if (!!data) {
                window.fbq(action, event, data);
            } else {
                window.fbq(action, event);
            }
        }
    },
    gtag(event, action, data){
        // console.log('gtag', action, event, data);
        if (!!window.gtag) {
            if (!!data) {
                window.gtag(event, action, data);
            } else {
                window.gtag(event, action);
            }
        }
    },
    mixpanel(action, data){
        if (luckyDrawDebug) {
            console.log('mixpanel', action, data);
        } else {
            mixpanel.track(action, data);
        }
    },
};

export default main;