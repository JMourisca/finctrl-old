<template>
    <v-alert
        v-model="alert"
        border="left"
        colored-border
        v-bind:type="alertData.type"
        transition="scale-transition"
        elevation="1">
        {{ alertData.message }}
    </v-alert>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "AlertMessage",
    computed: {
        ...mapState(['alertData', 'alert'])
    },
}
</script>

<style scoped>

</style>
