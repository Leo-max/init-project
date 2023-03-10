import common from './common'
import vuex from 'vuex'
import Vue from 'vue'

let loginData = {}
loginData[common.STORAGE_TOKEN] = ''
loginData[common.STORAGE_NAME] = ''
loginData[common.STORAGE_USER] = ''

let getToken = () => {
    let token = loginData[common.STORAGE_TOKEN]
    if (token) {
        return token
    }
    loginData[common.STORAGE_TOKEN] = read(common.STORAGE_TOKEN)
    if (loginData[common.STORAGE_TOKEN]) {
        return loginData[common.STORAGE_TOKEN]
    }
}

let setToken = (token) => {
    loginData[common.STORAGE_TOKEN] = token
    save(common.STORAGE_TOKEN, token)
}

let getPhone = () => {
    let token = loginData['phone']
    if (token) {
        return token
    }
    loginData['phone'] = read('phone')
    if (loginData['phone']) {
        return loginData['phone']
    }
}

let setPhone = (token) => {
    loginData['phone'] = token
    save('phone', token)
}

let getUser = () => {
    let token = loginData[common.STORAGE_USER]
    if (token) {
        return token
    }
    loginData[common.STORAGE_USER] = read(common.STORAGE_USER, true)
    if (loginData[common.STORAGE_USER]) {
        return loginData[common.STORAGE_USER]
    }
}

let setUser = (token) => {
    loginData[common.STORAGE_USER] = token
    save(common.STORAGE_USER, token, true)
}


let getEncrypt = () => {
    let encrypt = loginData[common.STORAGE_SESSION_ID]
    if (encrypt) {
        return encrypt
    }
    loginData[common.STORAGE_SESSION_ID] = read(common.STORAGE_SESSION_ID)
    if (loginData[common.STORAGE_SESSION_ID]) {
        return loginData[common.STORAGE_SESSION_ID]
    }
}

let setEncrypt = (encrypt) => {
    loginData[common.STORAGE_SESSION_ID] = encrypt
    save(common.STORAGE_SESSION_ID, encrypt)
}


let getName = () => {
    let name = loginData[common.STORAGE_NAME]
    if (name) {
        return name
    }
    loginData[common.STORAGE_NAME] = read(common.STORAGE_NAME)
    if (loginData[common.STORAGE_NAME]) {
        return loginData[common.STORAGE_NAME]
    }
}

let setRelationData = (params) => {
  state.form.relationData = params
}
let setFieldData = (params) => {
  state.form.sizeForm = params
}
/**
 * ????????????????????????localStorage????????????
 * @param {Object} key
 * @param {Object} value
 */
function save(key, value, flag) {
    localStorage.setItem(key, flag ? JSON.stringify(value) : value)
}

/**
 * ????????????????????????localStorage???????????????
 * @param {Object} key
 */
function read(key, flag) {
    console.log(key)
    console.log(localStorage.getItem(key))
    return flag ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)
}
/**
 * ???????????????
 * @param val ????????? ?????????????????????
 * @param type 1??????????????????2???????????????,3:???????????????
 */
let formatDate = function(val, type) {
    type = type || 1
    let result = ''
    let timestamp = val
    let d = new Date()
    d.setTime(timestamp)
    let year = d.getFullYear()
    let month = pad(d.getMonth() + 1)
    let day = pad(d.getDate())
    let housrs = pad(d.getHours())
    let minutes = pad(d.getMinutes())
    let seconds = pad(d.getSeconds())
    switch (type) {
        case 1:
            result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
            break
        case 2:
            result = month + '-' + day + ' ' + housrs + ':' + minutes
            break
        case 3:
            result = year + '-' + month + '-' + day
            break
        case 4:
            result = minutes + ':' + seconds
            break
        case 5:
            result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes
            break
        default:
            result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
            break
    }
    return result
}

/**
 * ??????
 * @param num
 * @returns {string}
 */
let pad = function(num) {
    return new Array(2 - ('' + num).length + 1).join(0) + num
}
Vue.use(vuex)
let store = new vuex.Store({
    state: {
        resourceMap: '',
        form: {
          name: 'test',
          vision: 'v20230214',
          desc: '????????????',
          pathStr: '??????????????????',
          type: 'http',
          code: '123456',
          createType: 'line',
          contacts: [
            {
              id: 1,
              name: '??????',
              value: '123456789'
            },
            {
              id: 2,
              name: '??????',
              value: '987654321'
            }
          ],
          tableName: '',
          requestTableData: [
            {
              name: 'cust_no',
              type: 'string',
              isTrue: true,
              operator: 'equal',
              field: 'one',
            }
          ],
          responseTableData: [
            {
              name: 'cust_no',
              type: 'string',
              fatherElement: 'appbody',
              HBField: 'cust_no',
              HBType: 'string',
            }
          ],
          relationData: [
            {
              extention: 1,
              id: 0.5677707058191692,
              level: 1,
              parentId: 0,
              title: '??????1',
              children: [
                {
                  extention: 1,
                  id: 0.15913978821517993,
                  level: 2,
                  parentId: 0.5677707058191692,
                  title: "??????1-1",
                },
                {
                  extention: 1,
                  id: 0.15913978821517993,
                  level: 2,
                  parentId: 0.5677707058191693,
                  title: "??????1-2",
                }
              ]
            },
            {
              extention: 1,
              id: 0.5677707058191694,
              level: 1,
              parentId: 0,
              title: '??????2',
            }
          ],
          sizeForm: [
            {
              value: 'one',
              field: 'ascending'
            }
          ]
        }
    },
    mutations: {
        setResourceMap(state, resourceMap) {
            state.resourceMap = resourceMap
            localStorage.setItem('resourceMap', JSON.stringify(resourceMap))
        },
        setForm(state, resourceMap) {
          state.form = resourceMap
        }
    }
})
let commit = (method, param) => {
    store.commit(method, param)
}
let getState = (name) => {
    let value = localStorage.getItem(name)
    return store.state[name] || (value ? JSON.parse(value) : null)
}

export default {
    getToken,
    setToken,
    getEncrypt,
    setEncrypt,
    read,
    save,
    formatDate,
    getName,
    store,
    commit,
    getState,
    setUser,
    getUser,
    getPhone,
    setPhone,
    setRelationData
}
