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
    getOptions() {
        return axios.get('api/options').then((response) => {
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
    },
    postOnlinePayments(payload) {
        return axios.post("api/online-payments", payload).then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    putOnlinePayments(payload) {
        return axios.put("api/online-payments/" + payload.id, payload).then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    },
    deleteOnlinePayment(id) {
        return axios.delete("api/online-payments/" + id).then((response) => {
            axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
            return response.data
        }).catch((error) => {
            return Promise.reject(error.response.data)
        })
    }
})
