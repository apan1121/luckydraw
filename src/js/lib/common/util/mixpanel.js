import Fingerprint2 from 'fingerprintjs2';
import string from './string';
let fingerInfo = null;
new Fingerprint2().get(function(result, components) {
    let identify = new Fingerprint2().x64hash128(components.map(function(pair) { return pair.value }).join(), 31);
    mixpanel_modul.data.identify = identify;
    mixpanel.identify(identify);
    mixpanel_modul.actWaitFunc();
});

const mixpanel_modul = {
    data: {
        identify: "",
        tabId: string.getRandomString(10),
        data: null,
    },
    waitFunc: [],
    actWaitFunc: function(){
        if (mixpanel_modul.waitFunc.length >= 0) {
            console.log("actWaitFunc", mixpanel_modul.waitFunc);
            mixpanel_modul.waitFunc.forEach(function(actFunc){
                actFunc();
            });
        }
    },
    track: function(action, inputData) {

        let actionFunc = function(){
            let data = { ...mixpanel_modul.data, data: inputData };
            mixpanel.track(action, data);
        };

        if (!!mixpanel_modul.data.identify) {
            actionFunc();
        } else {
            mixpanel_modul.waitFunc.push(actionFunc);
        }
    }
};
export default mixpanel_modul;