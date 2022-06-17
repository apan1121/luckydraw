/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
let jsVarsStorage = JSON.parse(JSON.stringify(window.jsVars));

const main = {
    set($key, $value = null, $merge = true){
        if (typeof ($key) === 'string') {
            const $newKey = {};
            $newKey[$key] = $value;
            $key = $newKey;
        }

        for (const $arrayKey in $key) {
            const $arrayValue = $key[$arrayKey];
            main._set($arrayKey, $arrayValue, $merge);
        }

        main._deployJsVars();
        return $value;
    },
    get($key, $defaultValue){
        if (!!$key) {
            const getValue = main._get($key);
            if (!!getValue) {
                return getValue;
            }

            if (typeof $defaultValue !== 'undefined') {
                return $defaultValue;
            }

            return getValue;
        }
        return JSON.parse(JSON.stringify(jsVarsStorage));
    },
    _set($key, $value, $merge = true){
        let $array = jsVarsStorage;

        if (!$key) {
            jsVarsStorage = $value;
            return jsVarsStorage;
        }

        const $keys = $key.split('.');
        while ($keys.length > 1) {
            $key = $keys.shift();

            if (!$array[$key]) {
                $array[$key] = {};
            }

            $array = $array[$key];
        }
        /* 需要有 merge 功能 */
        if ($merge) {
            /* 取最後一筆 */
            const $lastKey = $keys.shift();
            /* 如果被已經存在 */
            if (!!$array[$lastKey]) {
                if (typeof ($value) === 'object') {
                    $array[$lastKey] = { ...$array[$lastKey], ...$value };
                } else {
                    $array[$lastKey] = $value;
                }
            } else {
                $array[$lastKey] = $value;
            }
        } else {
            /* 直接蓋過去 */
            const $lastKey = $keys.shift();
            $array[$lastKey] = $value;
        }

        return $array;
    },
    _get($key){
        let $array = JSON.parse(JSON.stringify(jsVarsStorage));

        /* 拆解 $key 取到最後一層 */
        const $keys = $key.split('.');

        while ($keys.length > 1) {
            /* 取一筆 */
            $key = $keys.shift();

            /* 如果不存在 定義起來  */
            if (!$array[$key]) {
                $array[$key] = false;
            } else {
                $array = $array[$key];
            }
        }

        $key = $keys.shift();
        if (!!$array[$key]) {
            return $array[$key];
        }
        return false;
    },
    _deployJsVars(){
        window.jsVars = JSON.parse(JSON.stringify(jsVarsStorage));
    },
};
export default main;