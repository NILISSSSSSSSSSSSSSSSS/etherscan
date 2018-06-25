import axios from 'axios'
import { url } from "./url-config"
import { Loading } from 'element-ui';

let loadingInstance;
// let specialUrl=['/explorer/blocknum','/explorer/tradenum','/explorer/blocklist','/explorer/tradelist','/explorer/tradeCount15days']
const instance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 8000
});
//拦截所有请求,这里拦截cookie,判断是否过期,过期则跳登陆页面
instance.interceptors.request.use(function(config) {
    loadingInstance = Loading.service({
        lock: true,
    });
    
    return config;
}, function(error) {
    return Promise.reject(error);
});
//拦截所有响应
instance.interceptors.response.use(function(response) {
    loadingInstance.close();
    return response;
}, function(error) {
    loadingInstance.close();
    return Promise.reject(error);
});

//单独设置首页的响应

export default instance