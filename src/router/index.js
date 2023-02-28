import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import util from '@/util'
import common from '@/common'
Vue.use(Router)


let router = new Router({
    routes: [{
            path: '/',
            redirect: { name: 'login' },
        },
        {
            path: '/test',
            components: {
                'main': resolve => require(['@/index/test'], resolve),
            }
        },
        {
            path: '/login',
            name: 'login',
            components: {
                'main': resolve => require(['@/login'], resolve),
            },
            meta: {
                title: '登录'
            }
        },
        {
            path: '/index',
            name: 'index',
            components: {
                'main': resolve => require(['@/index'], resolve),
            },
            children:[
                {
                    path: '/user',
                    name: 'user',
                    components: {
                        'content': resolve => require(['@/user'], resolve),
                    }
                },
                {
                    path: '/goods',
                    name: 'goods',
                    components: {
                        'content': resolve => require(['@/goods'], resolve),
                    }
                },
                {
                    path: '/my-api',
                    name: 'my-api',
                    components: {
                        'content': resolve => require(['@/my-api'], resolve),
                    }
                },
                {
                  path: '/create-api',
                  name: 'create-api',
                  components: {
                      'content': resolve => require(['@/create-api'], resolve),
                  }
                },
                {
                  path: '/api-detail',
                  name: 'api-detail',
                  components: {
                      'content': resolve => require(['@/api-detail'], resolve),
                  }
                },
                {
                  path: '/api-action',
                  name: 'api-action',
                  components: {
                      'content': resolve => require(['@/api-action'], resolve),
                  }
                },
                {
                    path: '/tixian',
                    name: 'tixian',
                    components: {
                        'content': resolve => require(['@/tixian'], resolve),
                    }
                },
                {
                    path: '/role',
                    name: 'role',
                    components: {
                        'content': resolve => require(['@/role'], resolve),
                    }
                },
                {
                    path: '/limit',
                    name: 'limit',
                    components: {
                        'content': resolve => require(['@/limit'], resolve),
                    }
                },
                {
                    path: '/version',
                    name: 'version',
                    components: {
                        'content': resolve => require(['@/version'], resolve),
                    }
                },
                {
                    path: '/sql',
                    name: 'sql',
                    components: {
                        'content': resolve => require(['@/sql'], resolve),
                    }
                },
                {
                    path: '/hot-fix',
                    name: 'hot-fix',
                    components: {
                        'content': resolve => require(['@/hot-fix'], resolve),
                    }
                },
                {
                    path: '/card-bin',
                    name: 'card-bin',
                    components: {
                        'content': resolve => require(['@/card-bin'], resolve),
                    }
                },
                {
                    path: '/message',
                    name: 'message',
                    components: {
                        'content': resolve => require(['@/message'], resolve),
                    }
                },
                {
                    path: '/charge',
                    name: 'charge',
                    components: {
                        'content': resolve => require(['@/charge'], resolve),
                    }
                },
                {
                    path: '/correct',
                    name: 'correct',
                    components: {
                        'content': resolve => require(['@/correct'], resolve),
                    }
                }

            ]
        },
    ]
})
export default router
