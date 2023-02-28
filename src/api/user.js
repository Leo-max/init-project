export default{
  getUserList: {
    url: '/user/getUserList'
  },
  
  deleteUser: {
    url: '/user/deleteUser'
  },

  editUser: {
    url: '/user/editUser'
  },

  addUser: {
    url: '/user/addUser'
  },

  getUserResource: {
    url: '/relation/selectResourceByUserId'
  },

  addUserRole: {
    url: '/relation/addRoleRelationForUser'
  },

  getUserRole: {
    url: '/relation/selectRoleRelationByUserId'
  }
}