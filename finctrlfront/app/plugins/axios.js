import User from '~/api/User'
import Finance from "../api/Finance";

export default function ({store, $axios, redirect}, inject) {
    const user = User($axios)
    const finance = Finance($axios)
    inject('user', user)
    inject('finance', finance)
    $axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 403) {
                redirect('/login')
                store.dispatch('showSnackbar', 'Please authenticate yourself.')
            } else if (error.response.status === 500) {
                store.dispatch('showSnackbar', 'Something went wrong, we are going to fix this.')
            } else if ('error' in error.response.data) {
                store.dispatch('showSnackbar', error.response.data.error)
            } else if ('detail' in error.response.data) {
                store.dispatch('showSnackbar', error.response.data.detail)
            }
            return Promise.reject(error)
        }
    )
}
