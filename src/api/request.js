import axios from 'axios'
import config from '../config/index.js'

//根据环境选择不同的baseUrl
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default function request(config){

  const service = axios.create({
    baseURL: baseUrl,  // 请求地址 = baseUrl + config.url
    timeout: 10000, // 设置超时时间
  })
  
  //请求拦截---携带token
  service.interceptors.request.use(
    config => {
      if (window.localStorage.getItem('token')) {
        config.headers.token = window.localStorage.getItem('token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

    return service(config)
}