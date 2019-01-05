import Fingerprint2 from 'fingerprintjs2';
import string from './string';
let fingerInfo = null;
new Fingerprint2().get(function(result, components) {
    let identify = new Fingerprint2().x64hash128(components.map(function(pair) { return pair.value }).join(), 31);
    mixpanel_modul.data.identify = identify;
    mixpanel.identify(identify);
});

const mixpanel_modul = {
    data: {
        identify: "",
        tabId: string.getRandomString(10),
        data: null,
    },
    track: function(action, inputData) {
        let data = { ...mixpanel_modul.data, data: inputData };
        mixpanel.track(action, data);
    }
};
export default mixpanel_modul;