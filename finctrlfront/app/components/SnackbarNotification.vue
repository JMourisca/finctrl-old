<template>
    <v-snackbar
        v-model="show"
        :right="true"
        :timeout="6000"
        :top="true"
    >
        {{ $store.state.snackbarText }}
        <v-btn
            color="pink"
            text
            @click="$store.commit('setSnackbar', '')"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'SnackbarNotification',
    data() {
        return {
            show: false
        }
    },
    watch: {
        'snackbar'(newVal) {
            this.show = newVal
        }
    },
    computed: mapState([
        'snackbarText',
        'snackbar'
    ])
}
</script>
