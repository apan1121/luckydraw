/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable no-extra-boolean-cast */

const main = {
    callbackStorage: {},
    init(){
        const that = this;
        if (!that.storage) {
            that.storage = window.localStorage;

            window.addEventListener('storage', (e) => {
                const { key } = e;
                if (!!that.callbackStorage[key]) {
                    const val = that.get(key);
                    that.callbackStorage[key](val);
                }
            });

            that.clear_PPOldData();
        }
    },
    set(key, data, merge){
        const that = this;
        that.init();
        if (!!merge) {
            const default_data = that.get(key, {});
            data = { ...default_data, ...data };
        }
        that.storage.setItem(key, JSON.stringify(data));
        return true;
    },
    push(key, data){
        const that = this;
        let default_data = that.get(key, []);
        if (!Array.isArray(default_data)) {
            default_data = [];
        }
        default_data.push(data);
        that.storage.setItem(key, JSON.stringify(default_data));
        return true;
    },
    get(key, defaultData){
        const that = this;
        that.init();
        let data = that.storage.getItem(key);
        if (!!data) {
            data = JSON.parse(data);
            return data;
        }

        if (typeof defaultData !== 'undefined') {
            return defaultData;
        }
        return false;
    },
    del(key){
        const that = this;
        that.storage.removeItem(key);
    },
    listen(key, callback){
        const that = this;
        that.callbackStorage[key] = callback;
    },
    clear_PPOldData(){
        const that = this;
        const regex = new RegExp('timeline\.[A-Z0-9_]{1,}\.tmp', 'ig');
        const now = new Date().getTime();
        const limitTime = (now - 86400 * 7);
        let count = 0;

        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = that.storage.key(i);
            if (regex.test(key)) {
                const data = that.get(key);
                if (data.update_time < limitTime) {
                    count += 1;
                    that.del(key);
                }
            }
        }
    },
};

main.init();
// const data = {"timeline_key":"","from":"local","update_time":"1559287484343","timeline_title":"","release_time":"","timeline_desc":"<p>dasasdasdasd</p>"};
// for (let i = 0; i < 100000; i++) {
//     console.log(i);
//     data.update_time -= 86400;

//     main.set(`timeline.723CACAED0BB52676FE5484640D832C5_${i}.tmp`, data);
// }

export default main;