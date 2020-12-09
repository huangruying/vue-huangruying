import { Toast } from 'vant';

// 1.引入axios
import axios from 'axios'
if(process.env.NODE_ENV==='development'){
  // // 开发环境
  axios.defaults.baseURL = 'http://bendi.kuaipin.com.ittun.com' // 线上环境
 }else{
   // 生产环境
  axios.defaults.baseURL = 'http://bendi.kuaipin.com.ittun.com'
}
// localStorage.setItem('_baseurl', 'http://127.0.0.1:3000')
// Set-Cookie: =abc123; SameSite=None; Secure

// 3.添加请求拦截器widget_session
// 只要使用这个封装的axios发送请求就会经过它的拦截器
// config:就是传说中的请求报文
let ajaxTimes = 0;
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  ajaxTimes++;
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  // 获取token
  let token = localStorage.getItem('token')
  // 如果有token，则通过请求头的方式进行传递
  if (token) {
    config.headers.Authorization = `Bearer ${token}` 
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// // 4.添加响应拦截器
// // response:响应报文
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  ajaxTimes--;
  if(ajaxTimes===0){
    // 最后一个请求回来了
    Toast.clear();
  }
  // console.log(response)
  // let res = response.data
  if(response.data.sign && response.data.sign === "token_due"){
    var href = window.location.href
    var arr = href.split("/")
    arr.pop()
    var hrefs = arr.join("/")
    Toast.fail('登录已过期，请重新登录！');
    window.location.href = hrefs + "/login"
  }
  // return response
  return response.data ? response.data : response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 5.暴露
export default axios
