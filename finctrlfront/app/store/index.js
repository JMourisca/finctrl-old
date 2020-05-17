export const state = () => ({
    snackbarText: [],
    snackbar: false,
    authenticated: false,
    paymentTypes: [],
    options: {},
    alertData: {
        message: "",
        type: "success"
    },
    alert: false
})

export const mutations = {
    setSnackbar(state, text) {
        state.snackbarText = text
        state.snackbar = !state.snackbar
    },
    setUser(state, user) {
        state.user = user
    },
    setPaymentTypes(state, paymentTypes) {
        state.paymentTypes = paymentTypes
    },
    setPaymentType(state, paymentType, index) {
        if (index > -1) {
            Object.assign(state.paymentTypes[index], paymentType)
        } else {
            state.paymentTypes.push(paymentType)
        }
    },
    setOptions(state, options) {
        state.options = options
    },
    setAlert(state, alertData) {
        state.alertData = alertData
        state.alert = true
    },
    hideAlert(state) {
        state.alert = false
    }
}

export const actions = {
    showSnackbar({commit}, text) {
        if (this.state.snackbar) {
            setTimeout(() => {
                commit('setSnackbar', text)
            }, 100)
        }
        commit('setSnackbar', text)
    },
    showAlert({commit}, alert) {
        window.setTimeout(() => {
            commit('hideAlert')
        }, 8000)
        commit('setAlert', alert)
    },
    modifyPaymentType({commit}, paymentType, index) {
        commit('setPaymentType', paymentType, index)
    }
}
