import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { message } from 'antd'
import { store } from '@/store'


const baseURL = import.meta.env.VITE_BASEURL

// 定义响应数据结构（根据后端约定调整）
interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  success?: boolean
}

// 扩展请求配置（可选）
interface CustomRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean // 是否显示加载提示
  handleError?: boolean // 是否处理错误
}

class HttpRequest {
  private instance: AxiosInstance
  private readonly options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig = {}) {
    this.options = options
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  // 获取实例
  public getInstance(): AxiosInstance {
    return this.instance
  }

  // 设置拦截器
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 请求前处理（如添加 token）
        const token = store.getState().user.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        // 示例：如果配置需要显示加载提示
        if ((config as CustomRequestConfig).showLoading) {
          // 显示全局 loading
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        // 响应数据处理
        const res = response.data

        // 根据业务 code 判断请求状态
        if (res.code !== 200 && res.code !== 0) {
          // 处理业务错误（如 token 过期）
          this.handleBusinessError(res.code, res.message)
          return Promise.reject(res)
        }

        // 返回核心数据（根据后端数据结构调整）
        return res.data
      },
      (error) => {
        // 网络错误处理
        this.handleNetworkError(error)
        return Promise.reject(error)
      }
    )
  }

  // 处理业务错误
  private handleBusinessError(code: number, message: string) {
    switch (code) {
      case 401:
        // 跳转登录页
        window.location.href = '/login'
        break
      case 403:
        // 权限提示
        break
      default:
        console.error(`业务错误 [${code}]: ${message}`)
    }
  }

  // 处理网络错误
  private handleNetworkError(error: any) {
    let errorMessage = '未知错误'
    if (error.response) {
      // 请求成功发出，服务器返回非 2xx 状态码
      switch (error.response.status) {
        case 400:
          errorMessage = '请求错误'
          break
        case 404:
          errorMessage = '资源未找到'
          break
        case 500:
          errorMessage = '服务器错误'
          break
      }
    } else if (error.request) {
      // 请求已发出但无响应
      errorMessage = '网络连接异常'
    } else {
      // 请求配置错误
      errorMessage = error.message
    }

    console.error(`网络错误: ${errorMessage}`)
    // 可在此处触发全局错误提示
    message.error(errorMessage)
  }

  // 封装请求方法（支持泛型）
  public request<T = any>(config: CustomRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<ResponseData<T>>(config)
        .then((res) => resolve(res as unknown as T))
        .catch((err) => {
          // 是否处理错误（默认处理）
          if (config.handleError !== false) {
            reject(err)
          }
        })
    })
  }

  public get<T = any>(url: string, config?: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  public post<T = any>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  public put<T = any>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  public delete<T = any>(url: string, config?: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}

// 创建默认实例
const defaultConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

const http = new HttpRequest(defaultConfig)

export default http




// src/api/user.ts
// import http from './http';

// // 定义用户类型
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// // 获取用户列表
// export const getUsers = () => {
//   return http.get<User[]>('/users');
// };

// // 创建用户
// export const createUser = (data: Omit<User, 'id'>) => {
//   return http.post<User>('/users', data, {
//     showLoading: true, // 显示加载提示
//   });
// };

// // 更新用户
// export const updateUser = (id: number, data: Partial<User>) => {
//   return http.put<User>(`/users/${id}`, data);
// };