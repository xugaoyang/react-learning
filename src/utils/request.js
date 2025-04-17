import axios from 'axios'
import { store } from '@/store'

/**
 * 1. 根域名配置
 * 2. 超时时间
 * 3. 请求拦截器、响应拦截器
 */

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
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
    return Promise.reject(error)
  }
)

export { request }
