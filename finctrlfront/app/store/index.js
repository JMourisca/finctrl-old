export const state = () => ({
    snackbarText: [],
    snackbar: false,
    authenticated: false,
    paymentTypes: [],
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
}

export const actions = {
    showSnackbar({commit}, text) {
        if (this.state.snackbar) {
            setTimeout(() => {
                commit('setSnackbar', text)
            }, 100)
        }
        commit('setSnackbar', text)
    }
}
