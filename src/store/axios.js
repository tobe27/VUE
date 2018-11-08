import axios from 'axios'

import { API_BASE_URL } from '@/config'

let baseUrl = API_BASE_URL
if(sessionStorage.getItem('hosturl')){
    baseUrl = sessionStorage.getItem('hosturl')
}
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers:{
        'Authorization':sessionStorage.getItem('token')
    }
})
axiosInstance.interceptors.response.use(data=> {
    if (data.data.code == 300) {
        sessionStorage.clear()
        window.location.href="/"
        return;
    }
    return data;
})
export default axiosInstance
