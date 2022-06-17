/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import jsVars from './jsVars';
import { getJsonFromUrl, object2QueryStr } from './string';


const main = {
    linkVersionBlackList: ['canonical'],
    getLinkHref(){
        const links = document.querySelectorAll('link');
        const hrefArray = [];
        for (const item of links) {
            hrefArray.push(item.href);
        }

        return hrefArray;
    },
    register(link){
        const that = this;
        let linkArray = [];

        if (Array.isArray(link)) {
            const linkNew = link.map((item) => {
                if (!item.href) {
                    item.href = '';
                }
                return item;
            });
            linkArray = linkArray.concat(link);
        } else if (typeof style === 'object') {
            if (!link.href) {
                link.href = '';
            }
            linkArray.push(link);
        } else if (typeof style === 'string') {
            linkArray.push({
                href: link,
            });
        }

        const existHrefArray = this.getLinkHref();

        linkArray.forEach((Link) => {
            const linkObj = Link;
            linkObj.href = that.url(linkObj.href);

            // if (!(!!linkObj.rel && that.linkVersionBlackList.includes(linkObj.rel))) {
            //     linkObj.href = that.bind_version(linkObj.href);
            // }

            if (!existHrefArray.includes(linkObj.href)) {
                const dom = that.createHtmlTag('link', linkObj);
                const head = document.querySelector('head');
                if (!!head && 1) {
                    head.appendChild(dom);
                } else {
                    console.log('head 不存在');
                }
            } else {
                console.log('已存在：', linkObj.href);
                if (typeof linkObj.onload === 'function') {
                    linkObj.onload();
                }
            }
        });
    },

    url(urlTmp){
        const ASSETS_HOST = jsVars.get('ASSETS_HOST');
        let url = urlTmp;
        const regExp = new RegExp(/(http|https):\/\//);

        if (regExp.test(url)) {
            return url;
        }

        return `${ASSETS_HOST}${url}`;
    },

    bind_version(hrefTmp){
        let href = hrefTmp;

        const { hostname } = window.location;

        if (href.indexOf(hostname) !== -1) {
            href = href.replace('[WEB_VER]', WEB_VER);

            if (WEB_VER === 'dev') {
                const a = document.createElement('a');
                a.href = href;
                const search = getJsonFromUrl(a.search.substr(1));
                search.v = WEB_VER_TIME;
                a.search = object2QueryStr(search);
                href = a.href;
            } else if (!!ASSETS_HOST && 1) {
                const a = document.createElement('a');
                a.href = href;
                a.host = ASSETS_HOST;
                href = a.href;
            }
        }

        return href;
    },

    createHtmlTag(tag, obj){
        const tagDom = document.createElement(tag);
        for (const key in obj) {
            tagDom[key] = obj[key];
        }
        return tagDom;
    },
};

export default main;