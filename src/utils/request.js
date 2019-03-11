import axios from 'axios'
import { Message } from 'element-ui'
import Cookie from 'js-cookie'
// base setting
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'http://39.105.201.251/distributor'
  : 'http://39.105.201.251/distributor'
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=UTF-8'
  let token = localStorage.getItem('TOKEN')
  if (token && token != null) {
    config.headers['TOKEN'] = token
  }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  /**
  * 这里可以做接口相关的拦截设置
  */
  const res = response.data
  if (res.code === 2) {
    console.log('账户登录失效')
    Message({
      message: res.message,
      type: 'error',
      duration: 3 * 1000,
      onClose:() => {
        Cookie.remove('user')
        Cookie.remove('role')
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('pageOpenedList')
        setTimeout(() => {
          location.reload()
        }, 0)
      }
    })
    return false
  }
  return res
}, error => {
  console.log(error)
  Message({
    message: error.message,
    type: 'error',
    duration: 6 * 1000
  })
  return Promise.reject(error)
})

export default service
