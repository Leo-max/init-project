import store from './store'
import common from './common'
import axios from 'axios';
import router from './router'
import util from './util'
import qs from 'qs'
/**
 * 调用服务端接口的基础方法
 * @param _url          请求的url地址，从config.js配置并获取
 * @param _data         此次请求所携带的数据
 * @param _method       （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 * @param doSuccess     收到服务端成功返回的回调函数
 * @param doFail        接口调用失败的回调函数
 * @param doComplete    接口调用完成的回调函数，不管调用成功还是失败，都会执行此方法
 * @param _header       自定义的header，可以覆盖默认header设置
 */

let headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;',
}
let config = {
    method: 'post',
    baseURL: common.API_HOST,
    headers: headers,
    params: {}, // url参数
    data: {}, // 请求数据
    timeout: 15000,
    withCredentials: false, // 是否携带cookie信息
    // 处理上传
    onUploadProgress: function(progressEvent) {},
    // 处理下载
    onDownloadProgress: function(progressEvent) {},
}
let instance = null
let CancelToken = axios.CancelToken

let request = (c) => {
    if (store.getToken()) {
        headers[common.STORAGE_TOKEN] = store.getToken()
    }
    if (common.TEST_FLAG) {
        config.method = 'get'
        c.url = c.testUrl
    }
    
    // 封装配置信息
    // 1.处理header
    if (c.headers) {
        Object.assign(c.headers, headers)
    }
    // 2.处理主机
    config.baseURL = c.data.apiHost ? c.data.apiHost : common.API_HOST
    console.log(c)
        // 3.处理取消语法方法
    let cancel = null
    let cancelConfig = {
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            })
        }
        // 
    Object.assign(config, c, cancelConfig)
    if (config.method == 'get' && config.data) {
        config.url += '?' + Object.keys(config.data)
        .map(key => config.data[key] !== undefined && `${encodeURIComponent(key)}=${encodeURIComponent(config.data[key])}`)
        .join('&')
    }
    config.data = qs.stringify(config.data)
        //TODO 创建请求对象 这里需要特别注意，每次都需要重新创建一个axios对象，否则只能发送一次请求，需要研究一下，理论不应该这样
        // if(!instance){
    instance = axios.create(config)
        // }
        // 添加reponse拦截器，进行公共处理
    instance.interceptors.response.use(
            res => {
                if (res.headers[common.STORAGE_SESSION_ID]) {
                    store.setEncrypt(res.headers[common.STORAGE_SESSION_ID])
                }
                // if (!res.data.ack && !c.data.notDeal) {
                //     error(res.data.msg)
                // }
                if (res.data.code == 403) {
                    router.push({name: 'login'})
                } else if (res.data.code != 0) {
                    error(res.data.msg)
                }
                return res.data
            },
            (error) => {
                console.log(error.response)
                // console.log(e2)
                // console.log(e3)
                if (error.response) {
                    if (error.response.status == '403') {
                        router.push({name: 'login'})
                    }
                }
                return Promise.reject(error)
            }
        )
        // 设置取消请求方法
    let requestObj = instance.request()
    requestObj.abort = cancel
    return requestObj
}

export default {
    request
}