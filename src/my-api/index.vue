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
          <h3>我的API</h3>
        </div>
        <el-button class="add-btn" type="primary" @click="onClickAddUser" v-if="resourceMap['/user/addUser'].show">添加</el-button>
      </div>
      <div class="option_action">
        <span>
          <el-input v-model="inputKeyword" placeholder="请输入API名称" style="width:220px" @input-="inputSearch">
            <i
              class="el-icon-search el-input__icon"
              slot="suffix">
            </i>
          </el-input>
        </span>
        <span class="row-btn" style="float:right;">
          <el-button
            @click="importApi"
          >导入API
          </el-button>
          <el-button
            type="primary"
            @click="createApi"
          >创建API
          </el-button>
        </span>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="orderList"
          v-loading="false"
          style="width: 100%;">
          <el-table-column
            prop="name"
            label="API名称"
            width="150">
            <template slot-scope="scope">
              <!-- <i class="el-icon-umbrella"></i> -->
              <div style="display: flex;align-items: center;">
                <img src="@/assets/images/apiName.png" alt="">
                <span style="margin-left:10px">{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已发布' ? 'success' : 'info'"
                color="#fff">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createType"
            label="创建方式">
          </el-table-column>
          <el-table-column
            prop="saveVision"
            label="保存版本">
          </el-table-column>
          <el-table-column
            prop="vision"
            label="已发布版本">
          </el-table-column>
          <el-table-column
            prop="editTime"
            label="修改时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="400">
            <template slot-scope="scope">
              <div style="display: flex;flex-direction: row;">
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handleDetail(scope.row)"
                >
                  <i class="iconfont icon-xiangqing"></i>
                  详情
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handleDeleteCorpusConfirm(scope.row.id)"
                >
                  <i class="iconfont icon-tianxie"></i>
                  编辑
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handlePublish(scope.row.id, 'publish')"
                >
                  <i class="iconfont icon-rss"></i>
                  发布
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handleDelete(scope.row.id)"
                >
                  <i class="iconfont icon-error-1"></i>
                  删除
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handleDeleteCorpusConfirm(scope.row.id)"
                >
                  <i class="iconfont icon-fuzhi"></i>
                  导出
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handleDownLine(scope.row.id)"
                >
                  <i class="iconfont icon-xiaxian"></i>
                  下线
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handleAction(scope.row)"
                >
                  <i class="iconfont icon-banshou"></i>
                  调试
                </span>
                <span
                  class="table-operation-item action-flex-mg"
                  @click="handlePublish(scope.row.id, 'goBack')"
                >
                  <i class="iconfont icon-tuihui"></i>
                  回退
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="10" @current-change="pageChange"></el-pagination>
      </div>
      <upload-file v-model="fileUrl" :visionShow="modelInfo" :limit="5"></upload-file>
    </div>
    <!-- 删除 -->
    <el-dialog
      title="API删除"
      :visible.sync="dialogVisible"
      width="30%">
      <span style="text-align: center;display:block;">确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下线 -->
    <el-dialog
      title="API下线"
      :visible.sync="dialogVisibleDownLine"
      width="30%">
      <span style="text-align: center;display:block;">确定下线吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDownLine = false">取 消</el-button>
        <el-button type="primary" @click="okDownLine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发布 -->
    <el-dialog
      :title=" 'API' + (dialogFlag === 'publish' ? '发布' : '回退')"
      :visible.sync="dialogVisiblePublish"
      width="30%">
      <el-dialog
        width="30%"
        title="提示"
        :visible.sync="innerVisible"
        append-to-body>
        <span style="text-align: center;display:block;">是否确认{{dialogFlag === 'publish' ? '发布' : '回退'}}？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="inOkPublish">{{dialogFlag === 'publish' ? '发布' : '回退'}}</el-button>
        </span>
      </el-dialog>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="版本选择">
          <el-select v-model="form.publishVision" placeholder="请选择版本">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePublish = false">取 消</el-button>
        <el-button type="primary" @click="okPublish">{{dialogFlag === 'publish' ? '发布' : '回退'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from '@/common'
import util from '@/util'
import UploadFile from '@/components/upload-file'
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
      inputKeyword: '',
      modelInfo: false,
      fileUrl: '',
      dialogVisible: false, // 删除
      deleteId: '',
      downLineId: '', // 下线id
      dialogVisibleDownLine: false,
      dialogVisiblePublish: false,
      innerVisible: false, //发布确认
      publishId: '',
      form: {
        publishVision: 'shanghai',
      },
      dialogFlag: 'publish',
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

  components: {
    UploadFile
  },

  methods: {
    // 发布
    handlePublish (id, str) {
      console.log('str', str, this.dialogFlag)
      this.dialogFlag = str
      this.dialogVisiblePublish = true
      this.publishId = id
    },
    okPublish () {
      this.innerVisible = true
      // this.dialogVisiblePublish = false
    },
    inOkPublish () {
      this.innerVisible = false
      this.dialogVisiblePublish = false
    },
    // 下线
    handleDownLine (id) {
      this.dialogVisibleDownLine = true
      this.downLineId = id
    },
    // 下线-确定
    okDownLine () {
      this.dialogVisibleDownLine = false
    },
    // 删除
    handleDelete(id) {
      this.dialogVisible = true
      this.deleteId = id
    },
    // 删除-确定
    okDelete () {
      console.log('Delete', this.deleteId)
      this.dialogVisible = false
    },

    // 详情
    handleDetail(row) {
      this.$router.push({path:"/api-detail", query: {id: row.vision}})
    },

    // 调试
    handleAction(row) {
      this.$router.push({path:"/api-action", query: {id: row.vision}})
    },

    inputSearch(val) {
      console.log('val', val)
    },

    closeImport() {
      this.modelInfo = false
    },

    importApi() {
      this.modelInfo = true
    },

    createApi() {
      this.$router.push({path: '/create-api'})
    },

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
      let pays = ['微信', '支付宝', '银行卡']
      this.$api.getOrderList(data).then(
        res => {
          this.loading = false
          if (res.code == 0) {
            this.orderList = res.data.records
            this.orderList.forEach(
              item => {
                item.payStr = pays[item.payStatus-1]
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
    this.orderList = [
      {
        name: 'getApi',
        status: '已发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '待发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '已发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '待发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '已发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '待发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '已发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '待发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },
      {
        name: 'getApi',
        status: '已发布',
        createType: '线上创建',
        saveVision: '1',
        vision: 'v1',
        editTime: '2022-11-01'
      },

    ]
    this.total = this.orderList.length
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
