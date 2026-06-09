import axios from 'axios'
export const fetchUrl = 'http://127.0.0.1:8888';
// 创建请求示例
const axiosInstance = axios.create({
  baseURL: fetchUrl, 
  timeout: 3000,
  //headers: {'X-Custom-Header': 'gushi-dev'}
})

// 响应拦截
//axiosInstance.interceptors.response.use(
//  res => res.data,
//  err => {
//    console.log(err, '网络错误~')
//  }
//)

export { axiosInstance };