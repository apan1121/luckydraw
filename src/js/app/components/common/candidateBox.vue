<template>
    <div class="candidate-box" v-if="!!candidateInfo" v-bind:class="{focus: focusSN == candidateInfo.sn, done: luckySN.includes(candidateInfo.sn) }">
        <div class="candidate-wrapper" v-bind:style="{width: config.boxWidth + 'px', height: config.boxHeight +'px', background: boxColor}">
            <div class="candidate-name" v-bind:style="{'font-size': config.titleSize + 'px'}">
                {{candidateInfo.name}}
            </div>
            <div class="candidate-pos" v-bind:style="{'font-size': config.subtitleSize + 'px'}">
                {{candidateInfo.pos}}
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function() {
        return {

        }
    },
    methods: {
        ...mapActions({})
    },
    watch: {

    },
    computed: {
        boxColor: function(){
            const that = this;
            let color = that.config.defaultColor;
            if (that.luckySN.includes(that.candidateInfo.sn)) {
                color = that.config.doneColor;
            } else if (that.focusSN == that.candidateInfo.sn) {
                color = that.config.focusColor;
            }
            return color;
        },
        ...mapGetters([
            "focusSN",
            "luckySN",
            "config",
        ])
    },
    mounted() {},
    props: {
        candidateIndex: {
            default: null,
        },
        candidateInfo: {
            default: null,
        }
    },
    components: {

    }
};
</script>