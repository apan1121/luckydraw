import Fingerprint2 from 'fingerprintjs2';
import string from './string';

const fingerInfo = null;
new Fingerprint2().get((result, components) => {
    const identify = new Fingerprint2().x64hash128(components.map(pair => pair.value).join(), 31);
    // console.log(identify);
    mixpanel_module.data.identify = identify;
    mixpanel.identify(identify);
    mixpanel_module.actWaitFunc();
});

const mixpanel_module = {
    data: {
        identify: '',
        tabId: string.getRandomString(10),
        data: null,
    },
    waitFunc: [],
    actWaitFunc(){
        if (mixpanel_module.waitFunc.length >= 0) {
            // console.log('actWaitFunc', mixpanel_module.waitFunc);
            mixpanel_module.waitFunc.forEach((actFunc) => {
                actFunc();
            });
        }
    },
    track(action, inputData){
        const actionFunc = function(){
            const data = { ...mixpanel_module.data, data: inputData };
            // console.log('mixpanel', action, data);
            window.mixpanel.track(action, data);
        };

        if (mixpanel_module.data.identify) {
            actionFunc();
        } else {
            mixpanel_module.waitFunc.push(actionFunc);
        }
    },
};
export default mixpanel_module;