// 请求ajax的接口

// import $http from "./config.js"; //ajax拦截器
import { axiosget, axiospost, axiosput, axiosdelete } from './axios.js' //封装的ajax get方法，post方法,put方法

// ---------------首页------------
//获取区块数字
export function getBlocknumData() {
    return axiosget("/explorer/blocknum")
}
// 获取交易数字
export function getTradenumData() {
    return axiosget("/explorer/tradenum")
}
//获取最近的block列表
export function getRecentblock() {
    return axiosget("/explorer/recentblock")
}
//获取最近的交易列表
export function getRecenttrade() {
    return axiosget("/explorer/recenttrade")
}
//获取折现图数据
export function getCount15days() {
    return axiosget("/explorer/tradeCount15days")
}

//首页搜索
export function search(searchUrl,obj) {
    return axiospost(searchUrl,obj)
}



// -----------------列表页数---------------------
//获取块列表
export function getBloclist(obj) {
    return axiosget("/explorer/blocklist",obj)
}
//获取地址列表
export function getAddrlist(obj) {
    return axiosget("/explorer/addrlist",obj)
}
//获取交易列表
export function getTradelist(obj) {
    return axiosget("/explorer/tradelist",obj)
}
//请求地址 交易 列表
export function getWalletRecord(obj) {
    return axiosget("/explorer/addrtradelist",obj)
}



// -----------------详情页-----------------------

//获取块详情
export function getBlockinfo(obj) {
    return axiospost("/explorer/blockinfo",obj)
}

//获取交易详情
export function getTradeinfo(obj) {
    return axiospost("/explorer/tradeinfo",obj)
}

//获取地址详情
export function getAddrinfo(obj) {
    return axiospost("/explorer/addrinfo",obj)
}







// //新增法币
// export function addFiatSave(obj) {
//     return axiospost("/fiatCurrency/add", obj)
// }

// //虚拟币配置时的编辑
// export function editSysconf(obj) {
//     return axiosput("/sysconf/edit", obj)
// }


// export function getBlocknum(obj) {
//     console.log(obj)
//     return axiosget("../static/menu.json", obj)
// }