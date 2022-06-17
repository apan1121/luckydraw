/* eslint-disable no-use-before-define */
/* eslint-disable no-prototype-builtins */
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import $ from 'jquery';
import linkRegister from './linkRegister';

/* 設定預設值 */
const defaultConfig = {
    /**
     * 外部要掛上的客製化 class
     */
    custom_class: '',
    /**
     * offset 值
     */
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    /**
     * 啟動導覽列的 callback
     */
    startCallback: null,

    /**
     * 關閉導覽列的 callback
     */
    closeCallback: null,

    /**
     * 關閉導覽列的 callback
     */
    step_callback: null,

    /**
     * 點擊遮罩關閉
     */
    clickOuterClose: false,

    buttonLang: {
        next: '<i class="fas fa-angle-right"></i>',
        skip: '跳過',
        iKnow: '我知道了',
    },
};

/**
 * 預設步驟內容
 */
const DefaultTutorialStep = {
    /**
     * 此步驟的 key，run 的時候可以直接跳到這步驟
     */
    key: '',
    /**
     * 此步驟對應的對象（string, Node）
     */
    target: '',
    /**
     * 此步驟的標題
     */
    title: '',
    /**
     * 此步驟的導覽內容
     */
    intro: '',
    /**
     * 此步驟顯示前需要執行的動作
     */
    beforeAction: null,
    /**
     * 此步驟結束後需要執行的動作
     */
    afterAction: null,

    /**
     * 等待時間自動下一步
     */
    waitToNextAction: null,

    /**
     * 點擊對象執行
     */
    clickAction: null,


    /**
     * 點擊確認
     */
    confirmAction: null,

    /**
     * 確認文字
     */
    confirmText: '',

    /**
     * 點擊取消
     */
    cancelAction: null,

    /**
     * 取消文字
     */
    cancelText: '',

    /**
     * 此步驟對應的元素
     */
    element: null,

    scrollTarget: null,
};

/**
 *  導覽模組
 */
function Tutorial(input_steps, config){
    const that = this;

    /**
     * 產生亂數 key
     */
    const getRandomString = function(strLen){
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';
        for (let i = 0; i < strLen; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    /**
     * 步驟資訊
     */
    let stepsStorage = [];

    /**
     * config 內容
     */
    let configStorage = {};

    /**
     * 產生亂碼的名稱
     */
    const TutorialKey = `tutorial_${getRandomString(20)}`;

    /**
     * 最後一次看的 index
     */
    let LastIndex = false;

    /**
     * 最後一個 Intro 內容
     */
    let LastIntroInfo = false;

    /**
     * 螢幕調整尺寸的等待閥值
     */
    let windowResizeTimer = null;

    /**
     * 執行導覽等待閥值
     */
    let runTimer = null;

    /**
     * 停留時間計時器
     */
    let dwellTimeTimer = null;

    /**
     * 停留時間紀錄
     */
    let dwellTimeStorage = null;

    /**
     * 設定 body
     */
    const body = document.querySelector('body');

    /**
     * 預設 className
     */
    const className = {
        bodyRelative: 'tutorial-relative',
        tutorialBox: 'tutorial-box',
        tutorialMask: 'tutorial-mask',
        tutorialIntro: 'tutorial-intro',
        tutorialIntroWrapper: 'tutorial-intro-wrapper',
        tutorialIntroBox: 'tutorial-intro-box',
        tutorialIntroBoxTitle: 'tutorial-intro-box-title',
        tutorialIntroBoxContent: 'tutorial-intro-box-content',
        tutorialIntroBoxTools: 'tutorial-intro-box-tools',
        tutorialIntroBoxToolsPager: 'tutorial-intro-box-tools-pager',
        tutorialIntroBoxToolsPagerCurrent: 'tutorial-intro-box-tools-current',
        tutorialIntroBoxToolsPagerTotal: 'tutorial-intro-box-tools-total',
        tutorialIntroBoxToolsSkip: 'tutorial-intro-box-tools-skip',
        tutorialIntroBoxToolsPrev: 'tutorial-intro-box-tools-prev',
        tutorialIntroBoxToolsNext: 'tutorial-intro-box-tools-next',
        tutorialIntroArrow: 'tutorial-intro-arrow',
        tutorialIntroExit: 'tutorial-intro-exit',
    };

    /**
     * 模板
     */
    const template = {
        tutorial_box: `
            <div class='{tutorialBox} {outerClassName}' ref='{tutorialKey}'>
            </div>
        `,
        tutorial_mask_box: `
            <div class='{tutorialMask}'>
            </div>
        `,
        tutorial_intro_box: `
            <div class='{tutorialIntro}' direction="center">
                <div class="{tutorialIntroWrapper}">
                    <div class="{tutorialIntroArrow}">
                    </div>
                    <div class='{tutorialIntroBox}'>
                        <div class='{tutorialIntroBoxTitle}'></div>
                        <div class='{tutorialIntroBoxContent}'></div>
                        <div class='{tutorialIntroBoxTools}'>
                        </div>
                    </div>
                    <div class="{tutorialIntroExit}">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            </div>
        `,
        tutorial_intro_pager: `
            <div class='{tutorialIntroBoxToolsPager}'>
                <span class='{tutorialIntroBoxToolsPagerCurrent}'>{CurrentNumber}</span> / <span class='{tutorialIntroBoxToolsPagerTotal}'>{TotalNumber}</span>
            </div>
        `,
        tutorial_intro_skip: `
            <div class='{tutorialIntroBoxToolsSkip}'>
                {skip}
            </div>
        `,
        tutorial_intro_prev: `
            <div class='{tutorialIntroBoxToolsPrev}'>
                <i class="fas fa-angle-left"></i>
            </div>
        `,
        tutorial_intro_next: `
            <div class='{tutorialIntroBoxToolsNext}'>
                <i class="fas fa-angle-right"></i>
            </div>
        `,
    };

    /**
     * 載入 css
     */
    const loadCss = async function(){
        return new Promise((resolve, reject) => {
            /* set popup  */
            linkRegister.register([
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: 'dist/css/page/tutorial.css',
                    onload(){
                        console.log('css load done');
                        resolve();
                    },
                },
            ]);
        });
    };
    loadCss();

    /**
     * 檢查是否為物件
     */
    const isObject = function(item){
        return (item && typeof item === 'object' && !Array.isArray(item));
    };

    /**
     * 檢查 element isHidden
     */
    const isHidden = function(element){
        const style = window.getComputedStyle(element, null);
        const rect = getElementRect(element);
        return ((style.display === 'none' || style.visibility === 'hidden') || (rect.width === 0 && rect.height === 0));
    };

    /**
     * 深層 merge
     */
    const mergeDeep = function(target, ...sources){
        if (!sources.length) return target;
        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return mergeDeep(target, ...sources);
    };

    /**
     * 設定 config
     */
    this.setConfig = function(_config_){
        configStorage = mergeDeep({}, defaultConfig, configStorage, { ..._config_ });
    };

    /**
     * 設導覽步驟
     */
    this.setSteps = function(_input_steps_){
        let format_steps = [];

        if (Array.isArray(_input_steps_)) {
            /**
             * 帶進來的是陣列
             */
            _input_steps_.forEach((_data_, _index_) => {
                const __step__ = {
                    ...DefaultTutorialStep,
                    ..._data_,
                    element: getElement(_data_.target),
                };

                if (__step__.confirmText === '') {
                    if (_index_ === _input_steps_.length - 1) {
                        __step__.confirmText = configStorage.buttonLang.iKnow;
                    } else {
                        __step__.confirmText = configStorage.buttonLang.next;
                    }
                }

                if (__step__.cancelText === '') {
                    __step__.cancelText = configStorage.buttonLang.skip;
                }

                format_steps.push(__step__);
            });
        } else if (typeof list === 'object') {
            const __step__ = {
                ...DefaultTutorialStep,
                ..._input_steps_,
                element: getElement(_input_steps_.target),
            };

            if (__step__.confirmText === '') {
                __step__.confirmText = configStorage.buttonLang.iKnow;
            }

            if (__step__.cancelText === '') {
                __step__.cancelText = configStorage.buttonLang.skip;
            }

            /**
             * 帶進來的是物件
             */
            format_steps.push(__step__);
        } else {
            let NodeItems = null;
            if (Node.prototype.isPrototypeOf(_input_steps_)) {
                /**
                 * 帶進來的是 Node
                 */
                NodeItems = [];
                NodeItems.push(_input_steps_);
            } else if (NodeList.prototype.isPrototypeOf(_input_steps_)) {
                /**
                 * 帶進來的是 NodeList 結構
                 */
                NodeItems = _input_steps_;
            } else if (typeof _input_steps_ === 'string') {
                /**
                 * 帶進來的是字串，嘗試去 querySelectorAll
                 */
                NodeItems = document.querySelectorAll(_input_steps_);
            }

            const tmp_format_steps = [];
            if (NodeList.prototype.isPrototypeOf(NodeItems) || Array.isArray(NodeItems)) {
                NodeItems.forEach((NodeItem) => {
                    const key = NodeItem.dataset.key || NodeItem.id || '';
                    let order = parseInt(NodeItem.dataset.order || 999999999999);
                    if (!Number.isInteger(order)) {
                        order = 999999999999;
                    }
                    tmp_format_steps.push({
                        ...DefaultTutorialStep,
                        element: NodeItem,
                        key,
                        order,
                    });
                });
            }

            /**
             * 檢查 element 排序
             */
            tmp_format_steps.sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }

                if (a.order === b.order) {
                    return 0;
                }

                return -1;
            });

            format_steps = tmp_format_steps;
        }
        format_steps = format_steps.map((item, index) => {
            item.index = index;
            return item;
        });
        stepsStorage = format_steps;
    };

    /**
     * 取得模板 HTML
     */
    const getTemplate = function(templateName, input){
        let html = template[templateName] || '';
        for (const key in input) {
            switch (key) {
                case 'icon':
                    html = (!input.img) ? html.replace(`{${key}}`, input[key]) : html.replace(`{${key}}`, '');
                    break;
                default:
                    html = html.replace(`{${key}}`, input[key]);
                    break;
            }
        }
        return html;
    };

    /**
     * 取得 element 根據 key (可以帶入 Node 或是 key)
     */
    const getElement = function(key){
        let element = null;
        if (!!key && 1) {
            if (Node.prototype.isPrototypeOf(key)) {
                element = key;
            } else if (typeof key === 'string') {
                element = document.querySelector(key.trim());
                if (!!element && isHidden(element)) {
                    element = null;
                }
            }
        }
        return element;
    };

    /**
     * 取得 element 座標資訊
     */
    const getElementRect = function(element, $window = window){
        const rect = element.getBoundingClientRect();
        const offset = {
            top: rect.top + $window.scrollY,
            left: rect.left + $window.scrollX,
            bottom: rect.top + rect.height + $window.scrollY,
            right: rect.left + rect.width + $window.scrollX,
            width: rect.width,
            height: rect.height,
            windowY: $window.scrollY,
            windowX: $window.scrollX,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
        };
        return offset;
    };

    /**
     * 取得 window 座標資訊
     */
    const getWindowInfo = function(){
        const win = {
            top: window.scrollY + (configStorage.offset.top || 0),
            left: window.scrollX + (configStorage.offset.left || 0),
            bottom: window.scrollY + window.innerHeight - (configStorage.offset.bottom || 0),
            right: window.scrollX + window.innerWidth - (configStorage.offset.right || 0),
            w: window.innerWidth - (configStorage.offset.right || 0),
            h: window.innerHeight - (configStorage.offset.bottom || 0),
            centerX: window.scrollX + (window.innerWidth / 2),
            centerY: window.scrollY + (window.innerHeight / 2),
        };
        return win;
    };

    /**
     * 將視窗移動至 element 可見範圍
     */
    const windowMoveToElement = function(element, TmpIntroNode){
        let scrollTarget = window;
        if (LastIntroInfo.scrollTarget) {
            scrollTarget = getElement(LastIntroInfo.scrollTarget);
        }
        /**
         * 取得頁面極限高度
         */
        const bodyH = body.offsetHeight - 30;

        /**
         * 取得視窗資訊
         */
        const win = getWindowInfo();

        /**
         * 取得元素座標資訊
         */
        const rect = getElementRect(element);

        /**
         * 取得導覽資訊座標資訊
         */
        const introRect = getElementRect(TmpIntroNode);

        /**
         * 視窗移動資訊
         */
        const move = {
            // behavior: 'smooth',
        };

        if (win.bottom < rect.top) {
            move.top = win.top + (rect.bottom - win.bottom);
        } else if (win.bottom > rect.bottom && win.top < rect.top) {
            // 在畫面內不做任何事情
        } else {
            let tooBottom = false;
            /**
             * 元素的底 ＋ 導覽資訊的高度 是否大於 頁面極限高度
             */
            if (rect.bottom + introRect.height > bodyH) {
                tooBottom = true;
            }

            /**
             * 視窗滑動到的高度座標
             */
            if (tooBottom) {
                move.top = rect.top - win.h + rect.height + 10 + (configStorage.offset.bottom || 0);
            } else {
                move.top = rect.top - 10 - (configStorage.offset.top || 0);
            }
        }


        scrollTarget.scroll(move);




        // /**
        //  * 視窗移動資訊
        //  */
        // const move = {
        //     // behavior: 'smooth',
        // };

        // let tooBottom = false;
        // /**
        //  * 元素的底 ＋ 導覽資訊的高度 是否大於 頁面極限高度
        //  */
        // if (rect.bottom + introRect.height > bodyH) {
        //     tooBottom = true;
        // }

        // /**
        //  * 視窗滑動到的高度座標
        //  */
        // if (tooBottom) {
        //     move.top = rect.top - win.h + rect.height + 10 + (configStorage.offset.bottom || 0);
        // } else {
        //     move.top = rect.top - 10 - (configStorage.offset.top || 0);
        // }

        // window.scroll(move);
        return getElementRect(element);
    };

    /**
     * 阻止氣泡傳遞
     */
    const stopPropagationClickFunc = (e) => {
        e.stopPropagation();
    };

    /**
     * 鍵盤事件
     */
    let globalKeyDownTimer = null;
    const globalKeyDown = (e) => {
        clearTimeout(globalKeyDownTimer);
        globalKeyDownTimer = setTimeout(() => {
            switch (e.code) {
                case 'ArrowRight':
                case 'ArrowDown':
                case 'Space':
                    NextClickFunc();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    PrevClickFunc();
                    break;
                case 'Escape':
                    if (configStorage.clickOuterClose) {
                        that.close();
                    }
                    break;
                default:
                    break;
            }
        }, 100);
    };

    /**
     * 根據 template 建立 node
     */
    const createNodeByTemplate = function(templateName, input){
        /**
         * 建立 HTML
         */
        const html = getTemplate(templateName, input).trim();

        /**
         * 產生 node 結構
         */
        const tmp = document.createElement('template');
        tmp.innerHTML = html;
        const node = tmp.content.firstChild;

        return node;
    };

    /**
     * 建立取得導覽 Node
     */
    const getTutorialNode = function(){
        /**
         * 檢查 node 是否存在
         */
        let node = document.querySelector(`.${className.tutorialBox}[ref='${TutorialKey}']`);
        if (!node) {
            node = createNodeByTemplate('tutorial_box', {
                tutorialKey: TutorialKey,
                outerClassName: configStorage.custom_class,
                tutorialBox: className.tutorialBox,
            });
            body.append(node);
        }
        return node;
    };

    /**
     * 建立取得遮罩 Node
     */
    const getMaskNode = function(TutorialNode){
        let node = TutorialNode.querySelector(`.${className.tutorialMask}`);
        if (!node) {
            node = createNodeByTemplate('tutorial_mask_box', {
                tutorialMask: className.tutorialMask,
            });
            node.addEventListener('click', stopPropagationClickFunc, false);
            TutorialNode.append(node);
        }
        return node;
    };

    /**
     * 建立取得 Intro Node
     */
    const getIntroNode = function(TutorialNode){
        let node = TutorialNode.querySelector(`.${className.tutorialIntro}`);
        if (!node) {
            node = createNodeByTemplate('tutorial_intro_box', {
                tutorialIntro: className.tutorialIntro,
                tutorialIntroBox: className.tutorialIntroBox,
                tutorialIntroWrapper: className.tutorialIntroWrapper,
                tutorialIntroArrow: className.tutorialIntroArrow,
                tutorialIntroExit: className.tutorialIntroExit,
                tutorialIntroBoxTitle: className.tutorialIntroBoxTitle,
                tutorialIntroBoxContent: className.tutorialIntroBoxContent,
                tutorialIntroBoxTools: className.tutorialIntroBoxTools,
                tutorialIntroBoxToolsPager: className.tutorialIntroBoxToolsPager,
                tutorialIntroBoxToolsPagerCurrent: className.tutorialIntroBoxToolsPagerCurrent,
                tutorialIntroBoxToolsPagerTotal: className.tutorialIntroBoxToolsPagerTotal,
                tutorialIntroBoxToolsSkip: className.tutorialIntroBoxToolsSkip,
                tutorialIntroBoxToolsNext: className.tutorialIntroBoxToolsNext,
            });
            node.addEventListener('click', stopPropagationClickFunc, false);
            const exitBtn = node.querySelector(`.${className.tutorialIntroExit}`);
            exitBtn.addEventListener('click', SkipClickFunc, false);
            TutorialNode.append(node);
        }
        return node;
    };

    /**
     * 點擊下一步
     */
    const NextClickFunc = () => {
        const NextBtnNode = getElement(`.${className.tutorialIntroBoxToolsNext}`);
        if (!NextBtnNode.classList.contains('disabled')) {
            const RunNext = function(){
                if (LastIndex + 1 < stepsStorage.length) {
                    that.run(LastIndex + 1);
                } else {
                    that.close();
                }
            };

            if (typeof LastIntroInfo.confirmAction === 'function') {
                LastIntroInfo.confirmAction(RunNext);
            } else {
                RunNext();
            }
        }
    };

    /**
     * 點擊下一步
     */
    const PrevClickFunc = () => {
        const PrevBtnNode = getElement(`.${className.tutorialIntroBoxToolsPrev}`);
        if (!PrevBtnNode.classList.contains('disabled')) {
            const RunNext = function(){
                if (LastIndex - 1 >= 0) {
                    that.run(LastIndex - 1);
                }
            };

            RunNext();
        }
    };

    /**
     * 點擊離開
     */
    const SkipClickFunc = () => {
        const RunNext = function(){
            that.close();
        };

        if (typeof LastIntroInfo.cancelAction === 'function') {
            LastIntroInfo.cancelAction(RunNext);
        } else {
            RunNext();
        }
    };

    /**
     * 點擊遮罩離開
     */
    const TutorialOuterClickFunc = () => {
        that.close();
    };

    /**
     * 目標允許被點擊
     */
    const TargetAllowClickFunc = () => {
        if (!!LastIntroInfo && typeof LastIntroInfo.clickAction === 'function' && 1) {
            const TutorialNode = getTutorialNode();
            LastIntroInfo.clickAction(LastIntroInfo.element, TutorialNode, () => {
                if (LastIndex + 1 < stepsStorage.length) {
                    that.run(LastIndex + 1);
                } else {
                    that.close();
                }
            });
        }
    };

    /**
     * 執行 beforeAction 動作
     */
    const beforeActionPromise = function(TmpIntroInfo, TmpTutorialNode){
        return new Promise((resolve, reject) => {
            /**
             * 如果 beforeAction 是 function
             */
            if (typeof TmpIntroInfo.beforeAction === 'function') {
                TmpIntroInfo.beforeAction(TmpIntroInfo.element, TmpTutorialNode, () => {
                    resolve();
                });
            } else {
                resolve();
            }

            /**
             * 是否點擊外面關閉
             */
            TmpTutorialNode.removeEventListener('click', TutorialOuterClickFunc, false);
            if (configStorage.clickOuterClose) {
                TmpTutorialNode.addEventListener('click', TutorialOuterClickFunc, false);
            }
        });
    };

    /**
     * 執行 AfterActionPromise 動作
     */
    const AfterActionPromise = function(TmpIntroInfo, TmpTutorialNode){
        return new Promise((resolve, reject) => {
            /**
             * 如果 afterAction 是 function
             */
            if (typeof TmpIntroInfo.afterAction === 'function') {
                TmpIntroInfo.afterAction(TmpIntroInfo.element, TmpTutorialNode, () => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    };

    /**
     * 移動 遮罩 至目標 Element
     */
    const moveMaskToElementPromise = function(TmpIntroInfo, TmpTutorialNode, TmpIntroNode, TmpMaskNode){
        return new Promise((resolve, reject) => {
            TmpIntroNode.classList.remove('show');
            /**
             * 如果 element 存在，但是被隱藏
             */
            if (!!TmpIntroInfo.element && isHidden(TmpIntroInfo.element)) {
                TmpIntroInfo.element = null;
            }

            /**
             * 如果 element 不存在，但是有設定 target 嘗試取得成為 element
             */
            if (!TmpIntroInfo.element && !!TmpIntroInfo.target) {
                TmpIntroInfo.element = getElement(TmpIntroInfo.target);
            }

            /**
             * 設定導覽訊息置中
             */
            TmpIntroNode.setAttribute('direction', 'center');

            /**
             * 移除導覽訊息的 style (left, right ....)
             */
            TmpIntroNode.removeAttribute('style');

            /**
             * 移除導覽箭頭的 style (left, top ....)
             */
            TmpIntroNode.querySelector(`.${className.tutorialIntroArrow}`).removeAttribute('style');

            /**
             * 移除遮罩的 style (left, top ....)
             */
            TmpMaskNode.removeAttribute('style');

            /**
             * 如果 element 存在
             */
            if (!!TmpIntroInfo.element && 1) {
                /**
                 * 滑動視窗進 element 可見範圍
                 */
                const style = windowMoveToElement(TmpIntroInfo.element, TmpIntroNode);

                /**
                 * 設定遮罩寬高
                 */
                TmpMaskNode.style.width = `${style.width + 4}px`;
                TmpMaskNode.style.height = `${style.height + 4}px`;
                TmpMaskNode.style.top = `${style.top - style.windowY - 2}px`;
                TmpMaskNode.style.left = `${style.left - style.windowX - 2}px`;

                /**
                 * 設定遮罩顯示狀態
                 */
                TmpMaskNode.classList.remove('show-empty');
                TmpMaskNode.classList.add('show');

                TmpMaskNode.removeEventListener('click', TargetAllowClickFunc, false);
                TmpMaskNode.classList.remove('pointer');
                if (typeof TmpIntroInfo.clickAction === 'function') {
                    TmpMaskNode.addEventListener('click', TargetAllowClickFunc, false);
                    TmpMaskNode.classList.add('pointer');
                }
            } else {
                /**
                 * 設定遮罩顯示狀態
                 */
                TmpMaskNode.classList.remove('show');
                TmpMaskNode.classList.add('show-empty');
            }
            resolve();
        });
    };

    /**
     * 設定導覽區塊內容
     */
    const setTutorialInfoBox = function(TmpIntroInfo, TmpIntroNode, TmpMaskNode){
        return new Promise((resolve, reject) => {
            /**
             * 設定導覽顯示內容
             */
            let showInfo = {
                key: TmpIntroInfo.key || '',
                title: TmpIntroInfo.title,
                intro: TmpIntroInfo.intro,
            };

            /**
             * 如果步驟元素不存在但是 target 存在，嘗試重新取得一次
             */
            if (!TmpIntroInfo.element && !!TmpIntroInfo.target) {
                TmpIntroInfo.element = getElement(TmpIntroInfo.target);
            }

            /**
             * 檢查 element 為 Node
             */
            if (Node.prototype.isPrototypeOf(TmpIntroInfo.element)) {
                /**
                 * 從 element 中取出 dataset 覆蓋至顯示內容
                 */
                showInfo = {
                    ...showInfo,
                    ...TmpIntroInfo.element.dataset,
                };
            }

            /**
             * 設置 key
             */
            if (!!showInfo.key && 1) {
                TmpIntroNode.setAttribute('key', showInfo.key);
            } else {
                TmpIntroNode.removeAttribute('key');
            }

            /**
             * 設置顯示導覽標題內容
             */
            TmpIntroNode.querySelector(`.${className.tutorialIntroBoxTitle}`).innerHTML = showInfo.title;
            TmpIntroNode.querySelector(`.${className.tutorialIntroBoxContent}`).innerHTML = showInfo.intro;

            const TmpIntroTools = TmpIntroNode.querySelector(`.${className.tutorialIntroBoxTools}`);
            TmpIntroTools.innerHTML = '';


            /**
             * 設置顯示導覽頁碼
             */
            if (stepsStorage.length > 1) {
                const ToolPager = createNodeByTemplate('tutorial_intro_pager', {
                    tutorialIntroBoxToolsPager: className.tutorialIntroBoxToolsPager,
                    tutorialIntroBoxToolsPagerTotal: className.tutorialIntroBoxToolsPagerTotal,
                    CurrentNumber: TmpIntroInfo.index + 1,
                    TotalNumber: stepsStorage.length,
                });
                TmpIntroTools.append(ToolPager);
            }


            /**
             * 上一步
             */
            const ToolPrev = createNodeByTemplate('tutorial_intro_prev', {
                tutorialIntroBoxToolsPrev: className.tutorialIntroBoxToolsPrev,
            });
            ToolPrev.addEventListener('click', PrevClickFunc, false);
            TmpIntroTools.append(ToolPrev);
            if (LastIndex - 1 < 0) {
                ToolPrev.classList.add('disabled');
            }

            /**
             * 下一步
             */
            const ToolNext = createNodeByTemplate('tutorial_intro_next', {
                tutorialIntroBoxToolsNext: className.tutorialIntroBoxToolsNext,
            });
            ToolNext.addEventListener('click', NextClickFunc, false);
            TmpIntroTools.append(ToolNext);
            if (LastIndex + 1 >= stepsStorage.length) {
                ToolNext.classList.add('disabled');
            } else {
                if (typeof TmpIntroInfo.waitToNextAction === 'function') {
                    ToolNext.classList.add('disabled');
                    const waitToNextAction = () => {
                        ToolNext.classList.remove('disabled');
                        NextClickFunc();
                    };
                    TmpIntroInfo.waitToNextAction(TmpIntroInfo.element, waitToNextAction);
                }
            }

            /**
             * 顯示導覽資訊
             */
            TmpIntroNode.querySelector(`.${className.tutorialIntroBox}`).classList.add('show');
            resolve();
        });
    };

    /**
     * 導覽內容移動至遮罩旁邊
     */
    const moveTutorialInfoBoxToMask = function(TmpIntroInfo, TmpIntroNode, TmpMaskNode){
        return new Promise((resolve, reject) => {
            if (TmpIntroInfo.element) {
                /**
                 * 取得視窗資訊
                 */
                const win = getWindowInfo();

                /**
                 * 取得遮罩位置資訊
                 */
                const MaskRect = getElementRect(TmpMaskNode);
                MaskRect.top -= MaskRect.windowY;
                MaskRect.left -= MaskRect.windowX;
                MaskRect.bottom -= MaskRect.windowY;
                MaskRect.right -= MaskRect.windowY;

                /**
                 * 取得資訊區塊位置資訊
                 */
                const IntroRect = getElementRect(TmpIntroNode);
                IntroRect.top -= IntroRect.windowY;
                IntroRect.left -= IntroRect.windowX;
                IntroRect.bottom -= IntroRect.windowY;
                IntroRect.right -= IntroRect.windowX;

                /**
                 * 計算遮罩與資訊區塊的相對位置
                 */
                const style = {};
                const padding = 16;
                let arrow_direction = 'center';
                if (MaskRect.bottom + IntroRect.height + padding < win.h) {
                    style.top = MaskRect.bottom + padding;
                    style.left = MaskRect.left;
                    arrow_direction = 'top';
                } else if (MaskRect.top - IntroRect.height - padding > 0) {
                    style.top = MaskRect.top - IntroRect.height - padding;
                    style.left = MaskRect.left;
                    arrow_direction = 'bottom';
                } else {
                    if (MaskRect.centerX > win.w / 2) {
                        style.top = MaskRect.top;
                        style.left = MaskRect.left - IntroRect.width - padding;
                        arrow_direction = 'right';
                    } else {
                        style.top = MaskRect.top;
                        style.left = MaskRect.left + MaskRect.width + padding;
                        arrow_direction = 'left';
                    }
                }

                /**
                 * 移動到上座標 + 導覽資訊高度 + padding 太低超過螢幕的話，把導覽列資訊往上推
                 */
                if (style.top + IntroRect.height + padding > win.h) {
                    style.top = win.h - IntroRect.height - padding;
                }

                /**
                 * 移動到上座標 + padding 太高超過螢幕的話，把導覽列資訊往下推
                 */
                if (style.top < padding) {
                    style.top = padding;
                }

                /**
                 * 移動到左座標 + 導覽列寬度 + padding 太右超過螢幕的話，把導覽列往左推
                 */
                if (style.left + IntroRect.width + padding > win.w) {
                    style.left = win.w - IntroRect.width - padding;
                }

                /**
                 * 移動到左座標 + padding 太左超過螢幕的話，把導覽列往右推
                 */
                if (style.left < padding) {
                    style.left = padding;
                }

                /**
                 * 設定方向與座標
                 */
                TmpIntroNode.setAttribute('direction', arrow_direction);
                TmpIntroNode.style.top = `${style.top}px`;
                TmpIntroNode.style.left = `${style.left}px`;

                /**
                 * 重新取得導覽資訊位置資訊
                 */
                const IntroRectNew = getElementRect(TmpIntroNode);
                IntroRectNew.top -= IntroRectNew.windowY;
                IntroRectNew.bottom -= IntroRectNew.windowY;
                IntroRectNew.left -= IntroRectNew.windowX;
                IntroRectNew.right -= IntroRectNew.windowX;

                /**
                 * 計算箭頭相對
                 */
                const arrow_style = {};
                const IntroNodeArrow = TmpIntroNode.querySelector(`.${className.tutorialIntroArrow}`);
                /**
                 * 分別 左右 與 上下 檢查
                 */
                if (['left', 'right'].includes(arrow_direction)) {
                    /**
                     * 移動至 遮罩垂直中心 - 導覽資訊頂點 - (箭頭高度 / 2)
                     */
                    arrow_style.top = MaskRect.centerY - IntroRectNew.top - (IntroNodeArrow.clientHeight / 2);
                    /**
                     * 檢查極限垂直，導覽資訊最底 - padding - (箭頭高度 / 2)
                     */
                    const limitTop = IntroRectNew.bottom - IntroRectNew.top - padding - (IntroNodeArrow.clientWidth * 2);
                    if (arrow_style.top > limitTop) {
                        arrow_style.top = limitTop;
                    }
                } else {
                    /**
                     * 移動至 遮罩水平中心 - 導覽資訊左頂 - (箭頭寬度 / 2)
                     */
                    arrow_style.left = MaskRect.centerX - IntroRectNew.left - (IntroNodeArrow.clientWidth / 2);
                    /**
                     * 檢查極限水平，導覽資訊左頂 - padding - (箭頭寬度 / 2)
                     */
                    const limitRight = IntroRectNew.right - IntroRectNew.left - padding - (IntroNodeArrow.clientWidth * 2);
                    if (arrow_style.left > limitRight) {
                        arrow_style.left = limitRight;
                    }
                }

                /**
                 * 設定座標
                 */
                for (const key in arrow_style) {
                    IntroNodeArrow.style[key] = `${arrow_style[key]}px`;
                }
            } else {
                /**
                 * 導覽資訊置中
                 */
                TmpIntroNode.setAttribute('direction', 'center');
            }

            resolve();
        });
    };

    /**
     * 離開時需要做結束動作
     */
    const RunAfterActionPromise = function(){
        if (LastIndex !== false) {
            const TutorialNode = getTutorialNode();
            const IntroInfo = stepsStorage[LastIndex];
            const RunAllPromise = async function(){
                await AfterActionPromise(IntroInfo, TutorialNode);
            };
            RunAllPromise();
        }
    };

    /**
     * 顯示導覽要掛上的東西
     */
    const showTutorial = function(){
        body.classList.add(className.bodyRelative);
    };

    /**
     * 調整螢幕尺寸
     */
    const windowResize = function(){
        clearTimeout(windowResizeTimer);
        windowResizeTimer = setTimeout(() => {
            that.run(LastIndex);
        }, 50);
    };

    /**
     * 關閉導覽時要啟動的東西
     */
    const closeTutorial = function(){
        clearInterval(dwellTimeTimer);
        clearTimeout(runTimer);
        RunAfterActionPromise();
        const TutorialNode = getTutorialNode();
        if (!!TutorialNode && 1) {
            TutorialNode.remove();
        }
        body.classList.remove(className.bodyRelative);

        /**
         * 移除 windowResize
         */
        window.removeEventListener('resize', windowResize, false);

        /**
         * 移除 鍵盤監聽
         */
        document.removeEventListener('keydown', globalKeyDown, false);

        /**
         * 結束 callback
         */
        if (typeof configStorage.closeCallback === 'function') {
            configStorage.closeCallback(dwellTimeStorage, stepsStorage[LastIndex]);
        }
        LastIndex = false;
        LastIntroInfo = false;
    };

    /**
     * 執行導覽
     */
    this.run = function(keyword){
        clearTimeout(runTimer);
        /**
         * 移除 resize 動作
         */
        window.removeEventListener('resize', windowResize, false);
        document.removeEventListener('keydown', globalKeyDown, false);
        runTimer = setTimeout(() => {
            /**
             * 建立 resize 動作
             */
            window.addEventListener('resize', windowResize, false);

            /**
             * 鍵盤事件建立
             */

            document.addEventListener('keydown', globalKeyDown, false);

            /**
             * 掛上啟動導覽
             */
            showTutorial();

            /**
             * 如果有上一次動作，先執行離開動作
             */
            if (LastIndex !== false) {
                RunAfterActionPromise();
            } else {
                dwellTimeStorage = {};
            }

            /**
             * 換算 keyword 成 index
             */
            let index = 0;
            if (Number.isInteger(keyword)) {
                index = keyword;
            } else if (typeof keyword === 'string') {
                index = stepsStorage.findIndex((item) => item.key === keyword);
            }

            /**
             * 如果 index 不存在
             */
            if (index < 0 || stepsStorage.length <= index) {
                index = 0;
                console.log('查無導覽內容');
            }

            /**
             * 嘗試取得導覽資訊
             */
            let IntroInfo = false;
            if (!!stepsStorage[index] && 1) {
                const { element,
                    beforeAction,
                    afterAction,
                    waitToNextAction,
                    clickAction,

                    confirmAction,
                    confirmText,
                    cancelAction,
                    cancelText,

                    scrollTarget,

                    key,
                    target,
                    title,
                    intro } = stepsStorage[index];

                IntroInfo = {
                    element,
                    beforeAction,
                    afterAction,
                    waitToNextAction,
                    clickAction,

                    confirmAction,
                    confirmText,
                    cancelAction,
                    cancelText,

                    scrollTarget,

                    index,
                    key,
                    target,
                    title,
                    intro,
                };

                LastIntroInfo = IntroInfo;
            }

            /**
             * 如果有此步驟導覽資訊
             */
            if (!!IntroInfo && 1) {
                /**
                 * 取得導覽 Node
                 */
                const TutorialNode = getTutorialNode();

                /**
                  * 取得遮罩 node
                  */
                const MaskNode = getMaskNode(TutorialNode);

                /**
                  * 取得導覽區塊 node
                  */
                const IntroNode = getIntroNode(TutorialNode);

                /**
                 * 檢查紀錄是否存在
                 */
                if (typeof dwellTimeStorage[IntroInfo.index] === 'undefined') {
                    dwellTimeStorage[IntroInfo.index] = 0;
                }

                if (LastIndex === false) {
                    /**
                     * 如果有啟動 callback
                     */
                    if (typeof configStorage.startCallback === 'function') {
                        configStorage.startCallback(TutorialNode, stepsStorage);
                    }

                    /**
                     * 停留時間計算
                     */
                    dwellTimeTimer = setInterval(() => {
                        if (LastIndex !== false) {
                            dwellTimeStorage[LastIndex] += 1;
                        }
                    }, 1000);
                }

                /**
                 * 設定成上一次執行步驟
                 */
                LastIndex = IntroInfo.index;

                /**
                 * 逐步執行
                 */
                const RunAllPromise = async function(){
                    await beforeActionPromise(IntroInfo, TutorialNode);
                    await setTutorialInfoBox(IntroInfo, IntroNode, MaskNode);
                    await moveMaskToElementPromise(IntroInfo, TutorialNode, IntroNode, MaskNode);
                    await moveTutorialInfoBoxToMask(IntroInfo, IntroNode, MaskNode);
                };
                RunAllPromise();

                /**
                 * 每一步的 callback
                 */
                if (typeof configStorage.step_callback === 'function') {
                    configStorage.step_callback(TutorialNode, IntroInfo);
                }
            } else {
                closeTutorial();
            }
        }, 100);
    };

    /**
     * 關閉導覽
     */
    this.close = function(){
        closeTutorial();
    };

    /**
     * 設定 config
     */
    this.setConfig(config);

    /**
     * 設定步驟
     */
    this.setSteps(input_steps);

    return this;
}

export default Tutorial;