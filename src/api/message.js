export default{

  addMessage: {
    url: '/message/saveMessages'
  },

  editMessage: {
    url: '/message/updateMessages'
  },

  deleteMessage: {
    url: '/message/deleteMessage'
  },

  getMessageList: {
    url: '/message/getMessages'
  },

  downMessage: {
    url: '/message/messageDown',
    method: 'get'
  }
}