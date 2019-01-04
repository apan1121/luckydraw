<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function(){
        return {
        }
    },
    methods: {
        editShortlist: function(){
            const that = this;
            that.$store.dispatch("triggerOpenEditListModal");
        },
        editPrizeList: function(){
            const that = this;
            that.$store.dispatch("triggerOpenEditPrizeModal");
        },
        getLucky: function(){
            const that = this;
            that.$store.dispatch("triggerOpenGetLuckyModal");
        },
        showResult: function(){
            const that = this;
            that.$store.dispatch("triggerOpenResultModal");
        },
        showSetting: function(){
            const that = this;
            that.$store.dispatch("triggerOpenSettingModal");
        },
    },
    watch: {

    },
    computed: {
        ...mapGetters([
            "validShortlistSN",
            "config",
        ])
    },
    mounted() {
    },
    props: {

    },
    components: {

    }
};
</script>