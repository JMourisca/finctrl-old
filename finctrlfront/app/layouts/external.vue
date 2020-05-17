<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <nuxt/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <SnackbarNotification/>
    </v-app>
</template>

<script>
import SnackbarNotification from '@/components/notifications/SnackbarNotification'

export default {
    name: 'BareLayout',
    components: {SnackbarNotification},
    mounted() {
        this.$user.getCSRFToken()
    }
}
</script>
