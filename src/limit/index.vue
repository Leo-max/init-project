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
  .panel .tree-btn{
    width: 80px;
    height: 30px;
    padding-left: 15px;
    margin-top: 15px;
    line-height: 5px;
    text-align: center;
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
          <i class="menu-icon fa fa-thermometer-quarter"></i>
          <h3>权限管理</h3>
        </div>
        <div>
          <el-button class="add-btn" type="primary" @click="onClickAddResource" v-if="resourceMap['/resource/addResource'].show">添加</el-button>
          <el-button class="tree-btn" type="primary" @click="onClickShowTree">树形展示</el-button>
        </div>
        
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="resourceList"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            prop="code"
            label="code"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="url"
            label="链接"
            width="120">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="图标"
            width="180">
          </el-table-column>
          <el-table-column
            prop="operationButton"
            show-overflow-tooltip	
            label="权限">
          </el-table-column>
          <el-table-column align="right" width="200">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="searchText"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <a class="opt" @click="modifyResource(scope.row)" type="text" size="small" v-if="resourceMap['/resource/editResource'].show">修改</a>
              <a class="opt" @click="deleteResource(scope.row)" type="text" size="small" v-if="resourceMap['/resource/deleteResource'].show">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="resource">
        <el-form-item label="code：" :label-width="formLabelWidth">
          <el-input v-model="resource.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源名称：" :label-width="formLabelWidth">
          <el-input v-model="resource.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父节点：" :label-width="formLabelWidth">
          <el-input v-model="resource.parentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标：" :label-width="formLabelWidth">
          <el-input v-model="resource.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接：" :label-width="formLabelWidth">
          <el-input v-model="resource.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限：" :label-width="formLabelWidth">
          <el-input v-model="resource.operationButton" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addResource()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="树状资源" :visible.sync="roleResourceFlag" v-if="roleResourceFlag">
      <div class="resource-list">
        <el-tree
          :data="treeList"
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import common from '@/common'
export default {
 
  data () {
    return {
      tableShowFlag: true,
      total: 1,
      currentPage: 1,
      resourceList: [],
      treeList: [],
      listRequest: '',
      resource: {},
      optType: '',  // addResource、editResource
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchText: '',
      searchObj: {
        code: '',
        name: '',
        url: '',
        operationButton: '',
      },
      resourceMap: common.resourceMap,
      roleResourceFlag: false,
      defaultProps: {
        label: 'name'
      },
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

    onClickShowTree () {
      this.roleResourceFlag = true
    },

    onClickAddResource () {
      this.dialogTitle = '添加资源'
      this.optType = 'addResource'
      this.resource = {}
      this.dialogFormVisible = true
    },

    addResource () {
      let resource = this.resource
      if (!resource.code) {
        error('代码不能为空')
        return
      }
      if (!resource.name) {
        error('资源名称不能为空')
        return
      }
      // if (!resource.url) {
      //   error('资源链接不能为空')
      //   return
      // }
      // if (!resource.operationButton) {
      //   error('权限不能为空')
      //   return
      // }
      this.$api[this.optType](resource)
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

    modifyResource (resource) {
      this.resource = JSON.parse(JSON.stringify(resource))
      this.optType = 'editResource'
      this.dialogTitle = '修改资源'
      this.dialogFormVisible = true
    },

    deleteResource (resource) {
      modal('删除', '确认要删除  ' + resource.name, 
        () => {
          this.$api.deleteResource({resourceId: resource.id}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.resourceList.length; i++) {
                  if (this.resourceList[i].id == resource.id) {
                    this.resourceList.splice(i, 1)
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
      data = JSON.parse(JSON.stringify(data))
      data.pageNum = this.currentPage
      if (this.listRequest) {
        this.listRequest.abort()
      }
      this.listRequest = this.$api.getResourceList(data)
      this.listRequest.then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            this.resourceList = res.returnContent.result
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

    renderTreeData () {
      let data = Object.assign(this.searchObj, this.$pageData)
      data = JSON.parse(JSON.stringify(data))
      data.pageNum = this.currentPage
      data.pageSize = 100
      this.treeList = []
      this.$api.getResourceList(data).then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            let resourceList = res.returnContent.result
            this.total = res.returnContent.totalCount
            resourceList.map(
              (item, i) => {
                item.children = []
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
                  for (let j = 0; j < this.treeList.length; j++) {
                    if (this.treeList[j].code == item.parentId) {
                      this.treeList[j].children.push(item)
                    }
                  }
                } else {
                  this.treeList.push(item)
                }
              }
            )
            console.log('!!!!!!')
            console.log(this.treeList)
          }
        }
      ).catch(
        error => {
          this.listRequest = null
          this.loading = false
        }
      )
    },
  },

  

  created () {
    this.renderData()
    this.renderTreeData()
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
