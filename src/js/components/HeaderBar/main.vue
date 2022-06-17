<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top"
            :style="{ 'background-color': config.headerColor }"
        >
            <a class="navbar-brand" href="#">
                <i class="icon-power"></i>
                {{ config.webTitle || "Lucky Draw" }}
            </a>
            <button class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" rel="CandidateList" @click="editCandidateList">
                            <i class="fas fa-user-edit"></i>
                            候選名單
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="PrizeList" @click="editPrizeList">
                            <i class="fas fa-award"></i>
                            獎項名單
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="GetLucky" @click="getLucky">
                            <i class="fas fa-vote-yea"></i>
                            抽一把
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="Result" @click="showResult">
                            <i class="fas fa-poll"></i>
                            顯示抽獎結果
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" rel="setting" @click="showSetting">
                            <i class="fas fa-cog"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <candidate-list-box v-if="triggerOpenCandidateList !== null"></candidate-list-box>
        <prize-list-box v-if="triggerOpenPrizeList !== null"></prize-list-box>
        <get-lucky-box v-if="triggerOpenGetLucky !== null"></get-lucky-box>
        <lucky-box v-if="triggerOpenLucky !== null"></lucky-box>
        <result-box v-if="triggerOpenResult !== null"></result-box>

        <setting-box v-if="triggerOpenSetting !== null"></setting-box>

        <upgrade-data-box v-if="triggerOpenUpgradeData !== null"></upgrade-data-box>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        SettingBox: () => import('components/SettingBox/main.vue'),
        CandidateListBox: () => import('components/CandidateListBox/main.vue'),
        PrizeListBox: () => import('components/PrizeListBox/main.vue'),
        GetLuckyBox: () => import('components/GetLuckyBox/main.vue'),
        LuckyBox: () => import('components/LuckyBox/main.vue'),
        ResultBox: () => import('components/ResultBox/main.vue'),
        UpgradeDataBox: () => import('components/UpgradeDataBox/main.vue'),
    },
    filters: {},
    props: {},
    data(){
        return {};
    },
    computed: {
        ...mapGetters([
            'config',

            'triggerOpenCandidateList',
            'triggerOpenPrizeList',
            'triggerOpenGetLucky',
            'triggerOpenLucky',
            'triggerOpenResult',
            'triggerOpenSetting',
            'triggerOpenUpgradeData',
        ]),
    },
    watch: {
    },
    created(){},
    mounted(){},
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            triggerModal: 'triggerModal',
        }),
        editCandidateList(){
            const that = this;
            that.triggerModal({ key: 'CandidateList' });
            // that.triggerOpenCandidateListModal();
            // that.$store.dispatch('triggerOpenCandidateListModal');
        },
        editPrizeList(){
            const that = this;
            that.triggerModal({ key: 'PrizeList' });
        },
        getLucky(){
            const that = this;
            that.triggerModal({ key: 'GetLucky' });
        },
        showResult(){
            const that = this;
            that.triggerModal({ key: 'Result' });
        },
        showSetting(){
            const that = this;
            that.triggerModal({ key: 'Setting' });
            // that.triggerOpenSettingModal();
            // this.$store.dispatch('triggerOpenSettingModal');
        },
    },
};
</script>
<style lang="scss" scoped>
</style>