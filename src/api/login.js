export default{
  login:{
    url: '/login/login'
  },

  sendVerifyCode: {
    url: '/valid/getAuth',
    method: 'get'
  },

  getOrderList: {
    url: '/order/list',
    method: 'get'
  },

  getTixianList: {
    url: '/withdraw/list',
    method: 'get'
  },

  getUsersList: {
    url: '/user/list',
    method: 'get'
  },

  submitReceive: {
    url: '/order/buyCommit',
    method: 'post'
  },

  submitSend: {
    url: '/withdraw/commit'
  },

  uploadPro: {
    url: '/goods/add'
  },

  getGoodList: {
    url: '/goods/list',
    method: 'get'
  },

  upDown: {
    url: '/goods/upDown'
  }
}