const history_route = {
    init(params){
        const that = this;
        that.popstate_callback = null;
        if (params.callback) {
            that.popstate_callback = params.callback;
        }

        that.baseUrl = window.location.origin;
        that.setLocation();
        that.setAction();
    },
    setAction(){
        const that = this;
        let timer = null;

        window.onpopstate = function(){
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (typeof (that.popstate_callback) === 'function') {
                    that.popstate_callback(that.location);
                    that.setLocation();
                }
            }, 500);
        };
    },
    diffUrl(url){
        const that = this;
        const tmplink = document.createElement('a');
        tmplink.href = url;

        const link = {
            pathname: tmplink.pathname,
            search: tmplink.search.substr(1),
            hash: tmplink.hash.substr(1),
        };

        let diff = false;
        ['pathname', 'search', 'hash'].forEach((key) => {
            if (link[key] != that.location[key]) {
                diff = true;
            }
        });
        return diff;
    },
    pushState(state, title, url){
        const that = this;

        if (that.diffUrl(url)) {
            window.history.pushState(state, title, url);
            this.setLocation();
        }
    },
    replaceState(state, title, url){
        window.history.replaceState(state, title, url);
        this.setLocation();
    },
    setLocation(){
        const that = this;
        this.location = {};
        this.location.pathname = window.location.pathname.replace(that.baseUrl, '');

        if (window.location.search) {
            this.location.search = window.location.search.substr(1);
        } else {
            this.location.search = '';
        }

        if (window.location.hash) {
            this.location.hash = window.location.hash.substr(1);
        } else {
            this.location.hash = '';
        }
    },
};


export default history_route;