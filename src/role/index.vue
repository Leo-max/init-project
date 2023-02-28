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
</style>

<template>
  <div class="container">
    <div class="panel">
      <div class="title">
        <div class="text">
          <i class="menu-icon fa fa-address-book"></i>
          <h3>角色管理</h3>
        </div>
        <el-button class="add-btn" type="primary" @click="onClickAddRole" v-if="resourceMap['/role/addRole'].show">添加</el-button>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="roleList"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            width="150"
            prop="roleCode"
            label="角色代码">
          </el-table-column>
          <el-table-column
            width="200"
            prop="roleName"
            label="角色名">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip	
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column align="right" width="200">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="searchText"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <a class="opt" @click="modifyRole(scope.row)" type="text" size="small" v-if="resourceMap['/role/editRole'].show">修改</a>
              <a class="opt" @click="deleteRole(scope.row)" type="text" size="small" v-if="resourceMap['/role/deleteRole'].show">删除</a>
              <a class="opt" @click="limitRole(scope.row)" type="text" size="small" v-if="resourceMap['/relation/addResRelationForRole'].show">分配菜单</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="role">
        <el-form-item label="角色代码：" :label-width="formLabelWidth">
          <el-input v-model="role.roleCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名：" :label-width="formLabelWidth">
          <el-input v-model="role.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input v-model="role.remark" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配菜单" :visible.sync="roleResourceFlag" v-if="roleResourceFlag">
      <div class="resource-list">
        <el-tree
          accordion
          :data="resourceList"
          show-checkbox
          node-key="id"
          :default-checked-keys="selectedResourceKeys"
          @check="checkChange"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleResourceFlag = false">取 消</el-button>
        <el-button type="primary" @click="addRoleResource()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/util'
import common from '@/common'
export default {
 
  data () {
    return {
      tableShowFlag: true,
      total: 1,
      currentPage: 1,
      roleList: [],
      listRequest: '',
      role: {},
      optType: '',  // addRole、editRole
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchText: '',
      searchObj: {
        roleCode: '',
        roleName: '',
        remark: '',
      },
      roleResourceFlag: false,
      defaultProps: {
        label: 'name'
      },
      resourceList: [],
      selectedResource: [],
      selectedResourceKeys: [],
      resourceMap: common.resourceMap,
      // hasResourceList: [],
      // othersResourceList: [],
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
    pageChange (page) {
      this.currentPage = page
      this.renderData()
    },

    onClickAddRole () {
      this.dialogTitle = '添加角色'
      this.optType = 'addRole'
      this.role = {}
      this.dialogFormVisible = true
    },

    addRole () {
      let role = this.role
      if (!role.roleCode) {
        error('角色代码不能为空')
        return
      }
      if (!role.roleName) {
        error('角色名不能为空')
        return
      }
      if (!role.remark) {
        error('备注不能为空')
        return
      }
      this.$api[this.optType](role)
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

    addRoleResource () {
      this.$api.addRoleResource({roleId: this.role.id, relationList: this.selectedResource})
        .then(
          res => {
            if (res.ack) {
              this.roleResourceFlag = false
              success('操作成功')
            }
          }
        )
    },

    checkChange (node, checkedNodes) {
      let keys = checkedNodes.checkedKeys
      this.selectedResource = []
      keys.map(
        limit => {
          // 找到权限对应的资源ID
          let id = util.getResourceIdByLimit(this.resourceList, limit)
          if (!id) return
          let has = false
          // 构建选中的资源对象
          for (let i = 0; i < this.selectedResource.length; i++) {
            if (this.selectedResource[i].resourdeId == id) {
              has = true
              if (this.selectedResource[i].operationButton && this.selectedResource[i].operationButton.indexOf(limit) < 0) {
                this.selectedResource[i].operationButton += (',' + limit)
              } else {
                this.selectedResource[i].operationButton = limit
              }
              break
            }
          }
          if (!has) {
            this.selectedResource.push({
              resourdeId: id,
              operationButton: limit
            })
          }
        }
      )
    },

    limitRole (role) {
      this.role = role
      this.selectedResourceKeys = []
      this.$api.getRoleResource({roleId: role.id})
        .then(
          res => {
            if (res.ack) {
              res.returnContent.map(
                item => {
                  if (item.operationButton) {
                    let arr = item.operationButton.split(',')
                    this.selectedResourceKeys = this.selectedResourceKeys.concat(arr)
                  }
                }
              )
            }
          }
        )
      this.roleResourceFlag = true
    },

    modifyRole (role) {
      this.role = JSON.parse(JSON.stringify(role))
      this.optType = 'editRole'
      this.dialogTitle = '修改角色'
      this.dialogFormVisible = true
    },

    deleteRole (role) {
      modal('删除', '确认要删除  ' + role.roleName, 
        () => {
          this.$api.deleteRole({roleId: role.id}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.roleList.length; i++) {
                  if (this.roleList[i].id == role.id) {
                    this.roleList.splice(i, 1)
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


    renderData () {
      let data = Object.assign(this.searchObj, this.$pageData)
      data.pageNum = this.currentPage
      if (this.listRequest) {
        this.listRequest.abort()
      }
      this.listRequest = this.$api.getRoleList(data)
      this.listRequest.then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            this.roleList = res.returnContent.result
            this.total = res.returnContent.totalCount
          }
        }
      ).catch(
        error => {
          this.listRequest = null
          this.loading = false
        }
      )
    },

    getResourceList () {
      this.$api.getResourceList()
        .then(
          res => {
            this.resourceList = res.returnContent.result
            for (let i = 0; i < this.resourceList.length; i++) {
              let item = this.resourceList[i]
              item.children = []
                item.name  += ' (' + item.code + ')'
                if (item.operationButton) {
                  let arr = item.operationButton.split(',')
                  arr.map(
                    (limit, j) => {
                      let obj = {}
                      obj.id = limit
                      obj.name = limit
                      item.children.push(obj)
                    }
                  )
                }
                if (item.parentId) {
                  this.resourceList.splice(i, 1)
                  if (i > 0) {
                    let parent = this.resourceList[i-1]
                    if (!parent.children) {
                      parent.children = []
                    }
                    parent.children.push(item)
                  }
                  i--
                }
            }
          }
        )
    }
  },

  created () {
    this.renderData()
    this.getResourceList()
  },

  mounted () {
    // 由于element table当父窗口缩小时不会自动甜配的BUG，由此需要手动搞一把 500ms指左侧菜单动画时长
    this.$bus.$on('resize', () => {
      this.tableShowFlag = false
      setTimeout(() => {
        this.tableShowFlag = true
      }, 500)
    })
  }
}
</script>
