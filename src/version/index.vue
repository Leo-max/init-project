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
          <i class="menu-icon fa fa-git"></i>
          <h3>用户管理</h3>
        </div>
        <el-button class="add-btn" type="primary" @click="onClickAddVersion" v-if="resourceMap['/version/add.do'].show">添加</el-button>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="versionList"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            prop="version"
            width="120"
            label="版本号">
          </el-table-column>
          <el-table-column
            width="150"
            prop="forceVersion"
            label="强制更新版本">
          </el-table-column>
          <el-table-column
            prop="apkUrl"
            show-overflow-tooltip
            label="APK更新地址">
          </el-table-column>
          <el-table-column
            prop="zhMessage"
            show-overflow-tooltip
            label="中文更新内容">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="enMessage"
            label="英文更新内容">
          </el-table-column>
          <el-table-column
            width="80"
            prop="deviceCodeStr"
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
              <a class="opt" @click="modifyVersion(scope.row)" type="text" size="small" v-if="resourceMap['/version/update.do'].show">修改</a>
              <a class="opt" @click="deleteVersion(scope.row)" type="text" size="small" v-if="resourceMap['/version/delete.do'].show">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="version">
        <el-form-item label="当前版本号：" :label-width="formLabelWidth">
          <el-input v-model="version.version" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="需要强更的版本号：" :label-width="formLabelWidth">
          <el-input v-model="version.forceVersion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="version.deviceCode" label="1">IOS</el-radio>
            <el-radio v-model="version.deviceCode" label="2">安卓</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="更新文件URL：" :label-width="formLabelWidth">
          <el-input v-model="version.apkUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文更新内容：" :label-width="formLabelWidth">
          <el-input v-model="version.zhMessage" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="英文更新内容：" :label-width="formLabelWidth">
          <el-input v-model="version.enMessage" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVersion()">确 定</el-button>
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
      versionList: [],
      listRequest: '',
      version: {},
      optType: '',  // addVersion、editVersion
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '150px',
      searchText: '',
      searchObj: {
        version: '',
        forceVersion: '',
        apkUrl: '',
        zhMessage: '',
        enMessage: '',
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

    onClickAddVersion () {
      this.dialogTitle = '添加版本'
      this.optType = 'addVersion'
      this.version = {}
      this.dialogFormVisible = true
    },

    addVersion () {
      let version = this.version
      if (!version.version) {
        error('版本号不能为空')
        return
      }
      if (!version.forceVersion) {
        error('强更版本号不能为空')
        return
      }
      if (!version.deviceCode) {
        error('设备类型不能为空')
        return
      }
      if (!version.apkUrl && version.deviceCode == '2') {
        error('更新文件URL不能为空')
        return
      }
      if (!version.enMessage) {
        error('英文更新内容不能为空')
        return
      }
      if (!version.zhMessage) {
        error('中文更新内容不能为空')
        return
      }
      this.$api[this.optType](version)
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

    modifyVersion (version) {
      this.version = JSON.parse(JSON.stringify(version))
      this.optType = 'editVersion'
      this.dialogTitle = '修改版本'
      this.dialogFormVisible = true
    },

    deleteVersion (version) {
      modal('删除', '确认要删除  ' + version.version,
        () => {
          this.$api.deleteVersion({id: version.id}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.versionList.length; i++) {
                  if (this.versionList[i].id == version.id) {
                    this.versionList.splice(i, 1)
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
      this.listRequest = this.$api.getVersionList(data)
      this.listRequest.then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            this.versionList = res.returnContent.result
            this.total = res.returnContent.totalCount
            this.versionList.map(
              item => {
                item.deviceCodeStr = item.deviceCode == '1' ? 'IOS' : '安卓'
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
