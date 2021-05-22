import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  // baseURL: 'http://toutiao-app.itheima.net/',
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 将超出js识别的长整型数据类型处理为原数据返回
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return {
        data
      }
    }
  }]
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const { userToken } = store.state
  if (userToken && userToken.token) {
    config.headers.Authorization = `Bearer ${userToken.token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// 请求响应器
request.interceptors.response.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})
export default request
