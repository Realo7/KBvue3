/** 
 * @description  接口封装
*/ 
import axios from 'axios'
import { baseApi } from './../config'
import { Notify } from 'vant';

const service = axios.create({
  baseURL: baseApi,
  withCredentials: false,
  timeout: 5000
})

// request拦截器 request interceptor
service.interceptors.request.use(config => {
  //config.header=[]可以在这添加请求头里面的Content-Type
  return config
},error => {
  console.log(error);
  Notify('网络请求出现问题');
  return Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if(res.status && res.status !== 200) {
    return Promise.reject(res)
  } else {
    return Promise.resolve(res)
  }
},error =>{
  // Notify('网络返回出现问题');
  return Promise.reject(error)
})
export default service