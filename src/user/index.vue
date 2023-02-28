<style scoped>
  .container{
    width: 100%;
    padding: 25px;
  }
  .header .title{
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    color: #333;
    line-height: 36px;
  }
  .panel{
    height: 100%;
  }
  .panel .title {
    color: #3d4465;
  }
  .panel .menu-icon{
    height: 18px;
    font-size: 17px;
    margin-right: 8px;
  }
  .panel .add-btn{
    width: 80px;
    height: 30px;
    margin-top: 15px;
    line-height: 2px;
    letter-spacing: 5px;
    font-size: 12px;
  }
  .panel .opt{
    margin-right: 20px;
  }
  .el-select-dropdown__item {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #8b8b8b !important;
    letter-spacing: 1.2px;
  }
  .el-select-dropdown__item.selected {
    color: #8b8b8b;
  }
  .assign-role-footer{
    margin-top: 20px;
  }
</style>

<template>
  <div class="container">
    <div class="panel">
      <div class="title">
        <div class="text">
          <i class="menu-icon fa fa-user"></i>
          <h3>用户管理</h3>
        </div>
        <el-button class="add-btn" type="primary" @click="onClickAddUser" v-if="resourceMap['/user/addUser'].show">添加</el-button>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="orderList"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobileNumber"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="invitePeople"
            label="推荐人ID">
          </el-table-column>
          <el-table-column
            prop="invitedCode"
            label="邀请码">
          </el-table-column>

          <!-- <el-table-column fixed="right" label="操作" width="100" >
            <template slot-scope="scope">
              <a v-if="scope.row.status == 1" @click="handleClick(scope.row)" type="text" size="small">确认到账</a>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import common from '@/common'
import util from '@/util'
import store from '@/store'
export default {
 
  data () {
    return {
      tableShowFlag: true,
      total: 1,
      roleTotal: 1,
      currentPage: 1,
      roleCurrentPage: 1,
      orderList: [],
      userList: [],
      listRequest: '',
      user: {},
      optType: '',  // addUser、editUser
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchText: '',
      searchObj: {
        nickName: '',
        userName: '',
        userPhone: '',
        userEmail: '',
      },
      userRoleShowFlag: false,
      userRole: '',
      roleList: '',
      resourceMap: common.resourceMap,
      loading: true,
    }
  },

  watch: {
    searchText (value) {
      for (let key in this.searchObj) {
        this.searchObj[key] = value
      }
      this.currentPage = 1
      this.renderData()
    }
  },

  methods: {

    handleClick (item) {
      this.$api.submitReceive({orderId: item.id}).then(
        res => {
          if (res.code == 0) {
            success('操作成功')
            this.renderData()
          }
        }
      )
    },
    
    pageChange (page) {
      this.currentPage = page
      this.renderData()
    },

    rolePageChange (page) {
      this.roleCurrentPage = page
      this.getRoleList()
    },

    onCheckCell (selection, row) {
      this.userRole = row.id
      if (selection.length > 1) {
        this.$refs.roleTable.toggleRowSelection(selection[0])
      }
    },

    onClickAddUser () {
      this.dialogTitle = '添加用户'
      this.optType = 'addUser'
      this.user = {}
      this.dialogFormVisible = true
    },

    addUserRole () {

      this.$api.addUserRole({userId: this.user.id, roleIdList: [this.userRole]})
        .then(
          res => {
            if (res.ack) {
              success('操作成功')
              this.userRoleShowFlag = false
            }
          }
        )
    },

    addUser () {
      let user = this.user
      if (!user.nickName) {
        error('呢称不能为空')
        return
      }
      if (!user.userName) {
        error('姓名不能为空')
        return
      }
      if (!user.userPhone) {
        error('手机号不能为空')
        return
      }
      // if (!user.loginPwd) {
      //   error('登录密码不能为空')
      //   return
      // }
      this.$api[this.optType](user)
        .then(
          res => {
            if (res.ack) {
              this.dialogTitle = ''
              this.dialogFormVisible = false
              this.renderData()
              success('操作成功')
            }
          }
        )
    },

    modifyUser (user) {
      this.user = JSON.parse(JSON.stringify(user))
      this.optType = 'editUser'
      this.dialogTitle = '修改用户'
      this.dialogFormVisible = true
    },

    deleteUser (user) {
      modal('删除', '确认要删除  ' + user.userName,
        () => {
          this.$api.deleteUser({userId: user.id}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.userList.length; i++) {
                  if (this.userList[i].id == user.id) {
                    this.userList.splice(i, 1)
                    break
                  }
                }
                success('删除成功')
              }
            }
          )
        }
      )
    },

    limitUser (user) {

    },

    renderData () {
      let data = {
        current: this.currentPage,
        size: this.$pageData.pageSize,
      }
      this.$api.getUsersList(data).then(
        res => {
          this.loading = false
          if (res.code == 0) {
            this.orderList = res.data.records
            this.orderList.forEach(
              item => {
                item.ctimeStr = util.formatDate(item.ctime+'000')
              }
            )
            this.total = res.data.total
          }
        }
      )
    },

    getRoleList () {
  
    }
  },

  created () {
    // let resourceMap = store.getState('resourceMap')
    // if (resourceMap) {
    //   this.resourceMap = resourceMap
    // }
    console.log(this.resourceMap)
    this.renderData()
  },

  mounted () {
    // 由于element table当父窗口缩小时不会自动甜配的BUG，由此需要手动搞一把 500ms指左侧菜单动画时长
    this.$bus.$on('resize', () => {
      this.tableShowFlag = false
      setTimeout(() => {
        this.tableShowFlag = true
      }, 500);
    })
  }
}
</script>
