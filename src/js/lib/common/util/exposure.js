import 'intersection-observer';

const exposure = {};

const BoxIntersectionObserver = {
    BoxIntersectionObserverObj: null,
    init(){
        // threshold 的值決定該component的 可視達到多少百分比trigger
        this.BoxIntersectionObserverObj = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    // 紀錄已經曝光BoxIntersectionObserver
                    const alreadySaved = entry.target.classList.contains('js-is-exposed');
                    if (!alreadySaved) {
                        entry.target.classList.add('js-is-exposed');
                        $(entry.target).trigger('exposure-act');
                    }
                }

                $(entry.target).trigger('intersecting-act', entry.isIntersecting);
            });
        }, {
            threshold: 0.2,
        });
    },
    observe(entries){
        if (this.BoxIntersectionObserverObj == null) {
            this.init();
        }
        this.BoxIntersectionObserverObj.observe(entries);
    },
    unobserve(entries){
        if (this.BoxIntersectionObserverObj == null) {
            this.init();
        }
        this.BoxIntersectionObserverObj.unobserve(entries);
    },
};

export default exposure;
export {
    BoxIntersectionObserver,
};