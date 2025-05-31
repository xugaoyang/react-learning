import axios from 'axios'
import { store } from '@/store'

/**
 * 1. 根域名配置
 * 2. 超时时间
 * 3. 请求拦截器、响应拦截器
 */

const baseURL = import.meta.env.VITE_BASEURL
const request = axios.create({
  baseURL: '/',
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('响应头', error)
    // if(error.response.status === 401) {
    //   window.location.href = '/login'
    // }
    return Promise.reject(error)
  }
)

export { request }
