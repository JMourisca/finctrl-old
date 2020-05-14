import Cookies from 'js-cookie'
import qs from 'qs'

export default axios => ({
    getPaymentTypes() {
        return axios.get('api/payment-types').then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getServiceProviders() {
        return axios.get('api/service-providers').then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getOPCurrencies() {
        return axios.get('api/online-payments/currencies').then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    getOnlinePayments(currency) {
        const p = new URLSearchParams();
        p.append("currency", currency)
        let params = currency && currency !== "ALL" ? p : {}
        return axios.get('api/online-payments', {
            params: params,
        }).then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    }
})
