import axios from 'axios'
import { notification, Modal, message } from 'antd'
import history from '@/utils/history'
// import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.REACT_APP_BASE_API,
    // 超时
    timeout: 10000,
})
// request拦截器
service.interceptors.request.use(
    (config) => {
        // 是否需要设置 token
        const token = localStorage.getItem('token')
        const isToken = (config.headers || {}).isToken === false
        if (token && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        // history.push(`/login`);
        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (res) => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        // const message = errorCode[code] || res.data.msg || errorCode['default']
        if (code === 401) {
            Modal.confirm({
                title: '系统提示',
                content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
                onOk() {
                    console.log('OK')
                },
                onCancel() {
                    console.log('Cancel')
                },
            })
            // 跳转到登录页 window.location.hash = '/login'
        } else if (code === 500) {
            message.error(message)
            return Promise.reject(new Error(message))
        } else if (code !== 200) {
            notification.error({
                title: message,
            })
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    (error) => {
        message.error(error.message)
        return Promise.reject(error)
    }
)

export default service
