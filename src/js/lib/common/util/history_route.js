const history_route = {
    init: function(params) {
        const that = this;
        that.popstate_callback = null;
        if (!!params.callback){
            that.popstate_callback = params.callback;
        }

        that.baseUrl = location.origin;
        that.setLocation();
        that.setAction();
    },
    setAction: function (){
        const that = this;
        let timer = null;

        window.onpopstate = function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                if (typeof(that.popstate_callback) == "function") {
                    that.popstate_callback(that.location);
                    that.setLocation();
                }
            },500);
        };

    },
    diffUrl: function(url){
        const that = this;
        const tmplink = document.createElement("a");
        tmplink.href = url;

        const link = {
            pathname: tmplink.pathname,
            search: tmplink.search.substr(1),
            hash: tmplink.hash.substr(1),
        }

        let diff = false;
        ["pathname", "search", "hash"].forEach(function(key){
            if (link[key] != that.location[key]) {
                diff = true;
            }
        });
        return diff;
    },
    pushState: function(state, title, url){
        const that = this;

        if (that.diffUrl(url)) {
            history.pushState(state, title, url);
            this.setLocation();
        }
    },
    replaceState: function(state, title, url){
        history.replaceState(state, title, url);
        this.setLocation();
    },
    setLocation: function (){
        const that = this;
        this.location = {};
        this.location.pathname = location.pathname.replace(that.baseUrl , "");

        if (!!location.search) {
            this.location.search = location.search.substr(1);
        } else {
            this.location.search = "";
        }

        if (!!location.hash) {
            this.location.hash = location.hash.substr(1);
        } else {
            this.location.hash = "";
        }
    }
};


export default history_route;