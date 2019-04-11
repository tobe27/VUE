import axios from 'axios'

import { API_BASE_URL } from '@/config'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // 'Authorization': sessionStorage.getItem('token')
  }
})
axiosInstance.interceptors.response.use(data => {
  if (data.data.code === 300) {
    sessionStorage.clear()
    window.location.href = '/'
    return
  }
  return data
})
export default axiosInstance
