import axios from 'axios'

const instance = axios.create({
    baseURL:"https://vue-bgbd.firebaseio.com"
})

// instance.defaults.headers.common['SPMETHING'] = 'SOMETHING'

export default instance