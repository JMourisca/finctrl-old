import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~plugins/axios',
        '~plugins/loadingicon',
        '~plugins/fontawesome',
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
    ],
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
                light: {
                    primary: colors.cyan.base,
                    secondary: "#673ab7", //colors.deep-purple.base,
                    accent: colors.blue.base,
                    error: colors.pink.base,
                    warning: colors.amber.base,
                    info: colors.teal.base,
                    success: colors.green.base
                }
            }
        }
    },
    server: {
        host: '0.0.0.0' // default: localhost
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    },
    extractCSS: process.env.NODE_ENV === 'production',
    devServer: {
        host: '0.0.0.0',
        watchContentBase: true,
        hot: true,
    },
    axios: {
        baseURL: (process.env.NODE_ENV === 'development') ? 'http://localhost:8000/' : 'core.djangowaves.com',
        credentials: true
    },
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 500
        }
    },
}
