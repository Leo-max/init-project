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
</style>

<template>
  <div class="container">
    <div class="panel">
      <div class="title">
        <div class="text">
          <i class="menu-icon fa fa-free-code-camp"></i>
          <h3>热修复管理</h3>
        </div>
        <el-button class="add-btn" type="primary" @click="onClickAddHotFix" v-if="resourceMap['/hotupdate/add.do'].show">添加</el-button>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="hotFixList"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            width="100"
            prop="apkVersion"
            label="apk版本">
          </el-table-column>
          <el-table-column
            prop="title"
            width="150"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="fileContent"
            show-overflow-tooltip
            label="更新内容">
          </el-table-column>
          <el-table-column
            prop="apkTypeStr"
            width="100"
            label="设备类型">
          </el-table-column>
          <el-table-column align="right" width="200">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="searchText"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <a class="opt" @click="modifyHotFix(scope.row)" type="text" size="small" v-if="resourceMap['/hotupdate/update.do'].show">修改</a>
              <a class="opt" @click="deleteHotFix(scope.row)" type="text" size="small" v-if="resourceMap['/hotupdate/delete.do'].show">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="hotFix">
        <el-form-item label="版本号：" :label-width="formLabelWidth">
          <el-input v-model="hotFix.apkVersion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="hotFix.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新文案：" :label-width="formLabelWidth">
          <el-input v-model="hotFix.fileContent" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="设备类型：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="hotFix.apkType" label="1">IOS</el-radio>
            <el-radio v-model="hotFix.apkType" label="2">安卓</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHotFix()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import common from '@/common'
import store from '@/store'
export default {
 
  data () {
    return {
      tableShowFlag: true,
      total: 1,
      currentPage: 1,
      hotFixList: [],
      listRequest: '',
      hotFix: {},
      optType: '',  // addHotFix、editHotFix
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '150px',
      searchText: '',
      searchObj: {
        param: ''
      },
      resourceMap: common.resourceMap,
      loading: true,
    }
  },

  watch: {
    searchText (value) {
      this.searchObj.param = value
      this.currentPage = 1
      this.renderData()
    }
  },

  methods: {
    pageChange (page) {
      this.currentPage = page
      this.renderData()
    },

    onClickAddHotFix () {
      this.dialogTitle = '添加热修复'
      this.optType = 'addHotFix'
      this.hotFix = {}
      this.dialogFormVisible = true
    },

    addHotFix () {
      let hotFix = this.hotFix
      if (!hotFix.apkVersion) {
        error('版本号不能为空')
        return
      }
      if (!hotFix.title) {
        error('标题不能为空')
        return
      }
      if (!hotFix.fileContent) {
        error('更新文案不能为空')
        return
      }
      this.$api[this.optType](hotFix)
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

    modifyHotFix (hotFix) {
      this.hotFix = JSON.parse(JSON.stringify(hotFix))
      this.optType = 'editHotFix'
      this.dialogTitle = '修改热修复'
      this.dialogFormVisible = true
    },

    deleteHotFix (hotFix) {
      modal('删除', '确认要删除  ' + hotFix.title,
        () => {
          this.$api.deleteHotFix({id: hotFix.id}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.hotFixList.length; i++) {
                  if (this.hotFixList[i].id == hotFix.id) {
                    this.hotFixList.splice(i, 1)
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
      data.page = this.currentPage
      console.log(data)
      if (this.listRequest) {
        this.listRequest.abort()
      }
      this.listRequest = this.$api.getHotFixList(data)
      this.listRequest.then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            this.hotFixList = res.returnContent.result
            this.total = res.returnContent.totalCount
            this.hotFixList.map(
              item => {
                item.apkTypeStr = item.apkType == '1' ? 'IOS' : '安卓'
              }
            )
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
    // let resourceMap = store.getState('resourceMap')
    // if (resourceMap) {
    //   this.resourceMap = resourceMap
    // }
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
