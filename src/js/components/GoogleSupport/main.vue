<template>
    <div v-if="!isTutorial" ref="box"
        class="google-support-box" :style="{
            height: (height ? `${height}px`: false),
        }"
    >
        <template v-if="!adBlocked">
            <ins v-if="show" class="adsbygoogle"
                style="display:block"
                data-ad-format="fluid"
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client="ca-pub-3068501078221920"
                data-ad-slot="1897408904"></ins>
        </template>
        <template v-else>
            <div class="error">AdBlock 啟用，Google AdSense 無法使用</div>
        </template>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {},
    filters: {},
    props: {
        trigger: {
            type: [String, Number, Boolean],
            default: 0,
        },
    },
    data(){
        return {
            show: false,
            height: false,
        };
    },
    computed: {
        ...mapGetters([
            'adBlocked',
            'isTutorial',
        ]),
    },
    watch: {
        isTutorial: {
            handler(){
                const that = this;
                if (!that.isTutorial) {
                    that.$nextTick(() => {
                        this.resetGoogleSupport();
                    });
                }
            },
        },
        trigger: {
            handler(){
                const that = this;
                that.$nextTick(() => {
                    this.resetGoogleSupport();
                });
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        that.$nextTick(() => {
            this.resetGoogleSupport();
        });
    },
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({}),
        resetGoogleSupport(){
            const that = this;
            clearTimeout(that.resetGoogleSupportTimer);
            that.show = false;
            that.resetGoogleSupportTimer = setTimeout(() => {
                that.openGoogleSupport();
            }, 10);
        },
        openGoogleSupport(){
            const that = this;
            clearTimeout(that.openGoogleSupportTimer);
            that.show = true;
            that.openGoogleSupportTimer = setTimeout(() => {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                that.waitToReset();
            }, 500);
        },
        waitToReset(){
            const that = this;
            clearTimeout(that.waitToResetTimer);
            that.waitToResetTimer = setTimeout(() => {
                that.height = $(that.$refs.box).find('.adsbygoogle').height();
                that.resetGoogleSupport();
            }, 10000);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>