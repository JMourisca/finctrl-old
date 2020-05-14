<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app
                             style="margin-top: 69px;">
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" active-class="active" :to="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark fixed>
            <v-toolbar-title style="width: 300px; text-align: left;" class="ml-0 pl-3">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="logout">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content style="margin-top: 64px;">
            <v-container fluid>
                <v-layout>
                    <nuxt v-if="!loadingUser"/>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'Dashboard',
    data: () => ({
        dialog: false,
        drawer: true,
        items: [
            {icon: 'mdi-account-group', text: 'Online Payments', link: 'Online Payments', path: '/online-payments'},
            {icon: 'mdi-cog', text: 'Settings', link: 'Settings', path: '/settings'}
        ],
        title: '',
        description: '',
        site: '',
        loading: false,
        loadingUser: true,
        siteError: '',
        errors: [],
        sites: {},
        payload: {},
    }),
    mounted() {
        this.$user.getUser().then((data) => {
            this.$store.commit('setUser', data)
            this.loadingUser = false
        })
    },
    methods: {
        logout() {
            this.$user.logout().then((data) => {
                this.$router.push({name: 'admin/index'})
                this.$store.commit('setUSer', {})
            }).catch(() => {
            })
        },
    }
}
</script>

<style scoped>

</style>
