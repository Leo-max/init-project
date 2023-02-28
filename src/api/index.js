import rpc from '../rpc'
import login from './login'
import user from './user'
import role from './role'
import limit from './limit'
import version from './version'
import upload from './upload'
import hotFix from './hot-fix'
import cardBin from './card-bin'
import message from './message'
import charge from './charge'
import correct from './correct'
// 注册api
let modules = {
    login,
    user,
    role,
    limit,
    version,
    upload,
    hotFix,
    cardBin,
    message,
    charge,
    correct,
}

let api = {}

for (let key in modules) {
    let module = modules[key]
    for (let item in module) {
        let config = module[item]
        let url = config.url
        if (!url) {
            console.error('url cant be null!')
            continue
        }
        api[item] = (data, headers, params) => {
            config.method = config.method ? config.method : 'post'
            config.data = data || {}
            config.headers = headers || {}
            config.params = params || {}
            return rpc.request(config)
        }
    }
}

export default api