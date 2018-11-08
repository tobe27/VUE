// export const API_BASE_URL = 'http://101.132.152.195:8080/grid'
export const API_BASE_URL = 'http://192.168.1.137:8080/grid' 
// export const API_BASE_URL = 'http://192.168.1.116:8080'
export const UPLOAD_API_URL = sessionStorage.getItem('hosturl')?sessionStorage.getItem('hosturl'):API_BASE_URL
export const LOGO_NAME = '广丰农村商业银行'

export default {
  API_BASE_URL,
  UPLOAD_API_URL,
  LOGO_NAME
}
