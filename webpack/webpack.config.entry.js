const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');

const APP_DIR = path.resolve(__dirname, '../src/js');
const CSS_DIR = path.resolve(__dirname, '../src/css');
const CSS_DIR_PUBLIC = path.resolve(__dirname, '../dist/css');
const PUBLIC_DIR = path.resolve(__dirname, '../dist');


const getFileList = function(objectKey, filePath, ignoreFileName = [], matchExt = []){
    let storage = {};
    fs.readdirSync(filePath).forEach((fileName) => {
        if (fs.statSync(path.join(filePath, fileName)).isDirectory()) {
            if (ignoreFileName.indexOf(fileName) === -1) {
                storage = Object.assign({},
                    storage,
                    getFileList(
                        `${objectKey}/${fileName}`,
                        `${filePath}/${fileName}`,
                        ignoreFileName,
                        matchExt,
                    ));
            }
        } else {
            let matchFlag = false;

            if (matchExt.length === 0) {
                matchFlag = true;
            } else {
                const ext = fileName.split('.').pop();

                if (matchExt.indexOf(ext) !== -1) {
                    matchFlag = true;
                }
            }

            if (matchFlag) {
                if (ignoreFileName.indexOf(fileName) !== -1) {
                    matchFlag = false;
                }
            }

            if (matchFlag) {
                const tmpFile = fileName.split('.').slice(0, -1).join('.');
                const ext = fileName.split('.').pop();

                if (matchExt.indexOf(ext) !== -1) {
                    // for css
                    storage[`${objectKey}/${tmpFile}`] = [`${filePath}/${fileName}`];
                } else {
                    // for js
                    storage[`${objectKey}/${tmpFile}`] = ['@babel/polyfill', `${filePath}/${fileName}`];
                }
            }
        }
    });

    return storage;
};


const PUBLIC_GITIGNORE_CONTENT = '/js\n/css\n/img\n!.gitignore';
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
}
fs.writeFileSync(`${PUBLIC_DIR}/.gitignore`, PUBLIC_GITIGNORE_CONTENT);


/** 在 public 中建立 js css img */
const PUBLIC_DEFAULT_FOLDER = ['', 'js', 'css', 'img'];
PUBLIC_DEFAULT_FOLDER.forEach((keyName) => {
    const DIR = path.resolve(__dirname, `${PUBLIC_DIR}/${keyName}`);
    if (!fs.existsSync(DIR)) {
        fs.mkdirSync(DIR);
    }
});



/** Copy folder */
if (1) {
    const IMG_DIR = path.resolve(__dirname, '../src/img');
    const IMG_DIR_PUBLIC = path.resolve(__dirname, `${PUBLIC_DIR}/img`);

    const ICOMOON_FONT_DIR = path.resolve(__dirname, '../src/css/icomoon/');
    const ICOMOON_FONT_PUBLIC_DIR = path.resolve(__dirname, `${PUBLIC_DIR}/css/icomoon/`);

    // const CSS_VENDOR_DIR = path.resolve(__dirname, '../src/css/vendor/');
    // const CSS_VENDOR_PUBLIC_DIR = path.resolve(__dirname, `${PUBLIC_DIR}/css/vendor/`);

    // const JS_VENDOR_DIR = path.resolve(__dirname, '../src/js/vendor/');
    // const JS_VENDOR_PUBLIC_DIR = path.resolve(__dirname, `${PUBLIC_DIR}/js/vendor/`);

    const copyEntry = {};
    copyEntry[IMG_DIR] = IMG_DIR_PUBLIC;
    // copyEntry[ICOMOON_FONT_DIR] = ICOMOON_FONT_PUBLIC_DIR;
    // copyEntry[CSS_VENDOR_DIR] = CSS_VENDOR_PUBLIC_DIR;
    // copyEntry[JS_VENDOR_DIR] = JS_VENDOR_PUBLIC_DIR;

    // eslint-disable-next-line no-restricted-syntax
    for (const fromPath in copyEntry) {
        copydir.sync(fromPath, copyEntry[fromPath]);
    }
}

/** JS_Bundle_Entry */
let JS_Bundle_Entry = {};
if (1) {
    const JS_FOLDER = {
        app: `${APP_DIR}/app`,
    };

    let JS_Entry = {};
    Object.keys(JS_FOLDER).forEach((objectKey) => {
        const FILE_PATH = JS_FOLDER[objectKey];
        JS_Entry = Object.assign(JS_Entry, getFileList(objectKey, FILE_PATH, ['component', 'components', 'app.js']));
    });

    JS_Bundle_Entry = Object.assign({}, JS_Bundle_Entry, JS_Entry);
}

/** CSS_Bundle_Entry */
let CSS_Bundle_Entry = {};
if (1) {
    // copydir.sync(CSS_DIR + "/" + "admin", CSS_DIR_PUBLIC + "/" + "admin");

    const CSS_FOLDER = {
        // layout: `${CSS_DIR}/layout`,
        page: `${CSS_DIR}/page`,
        // adminlte: `${CSS_DIR}/adminlte`,
        // vendor: `${CSS_DIR}/vendor`,
    };

    let CSS_Entry = {};
    Object.keys(CSS_FOLDER).forEach((objectKey) => {
        const FILE_PATH = CSS_FOLDER[objectKey];
        CSS_Entry = Object.assign(CSS_Entry, getFileList(objectKey, FILE_PATH, [], ['css', 'scss']));
        CSS_Bundle_Entry = Object.assign({}, CSS_Bundle_Entry, CSS_Entry);
    });
}



/* 動態載入 component */
const splitChunks_dynamic_FOLDER = {
    dynamicComponents: `${APP_DIR}/components`,
};

const getDynamicGroupFileList = (objectKey, filePath, approveFileName = [], matchExt = []) => {
    let storage = {};

    fs.readdirSync(filePath).forEach((fileName) => {
        if (fs.statSync(path.join(filePath, fileName)).isDirectory()) {
            storage = Object.assign({},
                storage,
                getDynamicGroupFileList(
                    `${objectKey}_${fileName}`,
                    `${filePath}/${fileName}`,
                    approveFileName,
                    matchExt,
                ));
        } else {
            let matchFlag = false;

            const tmpFile = fileName.split('.').slice(0, -1).join('.');
            const ext = fileName.split('.').pop();

            if (matchExt.length === 0) {
                matchFlag = true;
            } else {
                if (matchExt.indexOf(ext) !== -1) {
                    matchFlag = true;
                }
            }

            if (matchFlag) {
                if (approveFileName.indexOf(tmpFile) !== -1) {
                    matchFlag = true;
                } else {
                    matchFlag = false;
                }
            }


            if (matchFlag) {
                const new_path = filePath.replace(APP_DIR, '');
                const regex = new RegExp(`/js${new_path}`.replace(/\//ig, '[\\/]'));

                storage[objectKey] = {
                    test: regex,
                    name: `chunk${new_path}`,
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 1,
                    enforce: true,
                    priority: 900,
                };
            }
        }
    });

    return storage;
};


let dynamicGroups_entry = {};
Object.keys(splitChunks_dynamic_FOLDER).forEach((objectKey) => {
    const FILE_PATH = splitChunks_dynamic_FOLDER[objectKey];

    dynamicGroups_entry = Object.assign(dynamicGroups_entry, getDynamicGroupFileList(objectKey, FILE_PATH, ['main'], ['vue', 'js', 'jsx']));
    // JS_Entry = Object.assign(JS_Entry, getFileList(objectKey, FILE_PATH, ['component', 'components', 'baseApp.jsx']));
});

console.log(CSS_Bundle_Entry);

module.exports = {
    js: JS_Bundle_Entry,
    css: CSS_Bundle_Entry,

    js_dynamic_group: dynamicGroups_entry,
};