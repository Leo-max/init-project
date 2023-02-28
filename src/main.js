// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import store from './store'
import api from './api'
import '@/assets/css/global.css'
// element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/animate.min.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/assets/styles/icon/iconfont.css'
import LastPage from '@/components/last-page'

Vue.use(ElementUI)
Vue.use(VueClipboard)

Vue.prototype.$api = api
Vue.prototype.$pageData = {
    'pageSize': 10
}
Vue.prototype.$winSize = 0

Vue.component('LastPage', LastPage)
/* eslint-disable no-new */
let mystore = store.store
let bus = new Vue()
Vue.prototype.$bus = bus
window.emit = (event, param) => {
    bus.$emit(event, param)
}
let myVue = new Vue({
    el: '#app',
    mystore,
    router,
    components: { App },
    template: '<App/>'
})

window.error = (title, content) => {
    myVue.$notify.error({
        title: title,
        message: content
    })
}

window.success = (title) => {
    myVue.$notify({
        title: title,
        type: 'success'
    });
}

window.modal = (title, content, success, fail, type) => {
    myVue.$confirm(content, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type || 'warning'
      }).then(() => {
        success && success()
      }).catch(() => {
        fail && fail()
      });
}
