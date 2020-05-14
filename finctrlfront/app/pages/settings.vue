<template>
    <v-container>
        <h1>Settings</h1>
        <v-row>
            <v-col>
                <PaymentTypes></PaymentTypes>
            </v-col>
            <v-col>
                <ServiceProvider></ServiceProvider>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PaymentTypes from "../components/PaymentTypes";
import ServiceProvider from "../components/ServiceProvider";
export default {
    name: "settings",
    components: {
        PaymentTypes,
        ServiceProvider
    },
}
</script>

<style scoped>

</style>
