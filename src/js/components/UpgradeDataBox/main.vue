<template>
<div ref="box" class="modal result-modal" tabindex="-1"
        role="dialog"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p class="text-center mb-3" style="font-size: 50px;">
                        <i class="fa-spin fas fa-sync"></i>
                    </p>
                    <h5 class="text-center" style="font-size: 30px;">
                        資料轉換中
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { string, trackJS } from 'lib/common/util';
import { mapActions, mapMutations, mapGetters } from 'vuex';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {},
    filters: {},
    props: {},
    data(){
        return {};
    },
    computed: {
        ...mapGetters([
        ]),
    },
    watch: {
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            trackJS.mixpanel('UpgradeDataOpen_click');
            const waitSec = string.randRange(2, 3);
            setTimeout(() => {
                that.upgradeLuckyDrawData();
                $(that.$refs.box).modal('hide');
            }, waitSec * 1000);
        });

        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('UpgradeDataClose_click');
        });

        $(that.$refs.box).modal('show');
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            upgradeLuckyDrawData: 'upgradeLuckyDrawData',
        }),
    },
};
</script>
<style lang="scss" scoped>
</style>