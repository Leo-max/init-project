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
          <i class="menu-icon fa fa-commenting"></i>
          <h3>国际化管理</h3>
        </div>
        <div>
          <el-button class="add-btn" type="primary" @click="onClickAddMessage" v-if="resourceMap['/message/saveMessages'].show">添加</el-button>
          <el-button class="add-btn" type="primary" @click="onClickDownloadMessage" v-if="resourceMap['/message/messageDown'].show">下载</el-button>
        </div>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          :data="messageList"
          v-loading="loading"
          style="width: 100%;">
          <el-table-column
            prop="msgKey"
            show-overflow-tooltip
            label="关键字">
          </el-table-column>
          <el-table-column
            prop="msgValueCN"
            show-overflow-tooltip
            label="中文">
          </el-table-column>
          <el-table-column
            prop="msgValueEN"
            show-overflow-tooltip
            label="英文">
          </el-table-column>
          <el-table-column
            prop="msgValueAR"
            show-overflow-tooltip
            label="阿拉伯文">
          </el-table-column>
          <el-table-column align="right" width="200">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="searchText"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <a class="opt" @click="modifyMessage(scope.row)" type="text" size="small" v-if="resourceMap['/message/updateMessages'].show">修改</a>
              <a class="opt" @click="deleteMessage(scope.row)" type="text" size="small" v-if="resourceMap['/message/deleteMessage'].show">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="message">
        <el-form-item label="关键字：" :label-width="formLabelWidth">
          <el-input v-model="message.msgKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文：" :label-width="formLabelWidth">
          <el-input v-model="message.msgValueCN" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="英文：" :label-width="formLabelWidth">
          <el-input v-model="message.msgValueEN" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="阿拉伯文：" :label-width="formLabelWidth">
          <el-input v-model="message.msgValueAR" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMessage()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="下载" :visible.sync="downloadShowFlag">
      <el-form :model="downloadConfig">
        <el-form-item label="设备类型：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="downloadConfig.device" label="ios">IOS</el-radio>
            <el-radio v-model="downloadConfig.device" label="android">安卓</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="语言：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="downloadConfig.local" label="zh_CN">中文</el-radio>
            <el-radio v-model="downloadConfig.local" label="en_US">英文</el-radio>
            <el-radio v-model="downloadConfig.local" label="ar_AE">阿拉伯文</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a class="el-button--primary el-button" :href="downloadUrl + '?device=' + downloadConfig.device + '&local=' + downloadConfig.local">下载</a>
        <a class="el-button--primary el-button" :href="downloadUrl">全部</a>
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
      messageList: [],
      listRequest: '',
      message: {},
      optType: '',  // addMessage、editMessage
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '150px',
      searchText: '',
      searchObj: {
        key: ''
      },
      resourceMap: common.resourceMap,
      downloadShowFlag: false,
      downloadConfig: {
        device: 'ios',
        local: 'zh_CN',
      },
      downloadUrl: common.API_HOST + '/message/messageDown',
      loading: true,
    }
  },

  watch: {
    searchText (value) {
      this.searchObj.key = value
      this.currentPage = 1
      this.renderData()
    },
  },

  methods: {
    pageChange (page) {
      this.currentPage = page
      this.renderData()
    },

    onClickAddMessage () {
      this.dialogTitle = '添加国际化'
      this.optType = 'addMessage'
      this.message = {}
      this.dialogFormVisible = true
    },

    onClickDownloadMessage () {
      this.downloadShowFlag = true
    },

    download () {
      this.$api.downMessage()
    },

    downloadAll () {
      this.$api.downMessage()
    },

    addMessage () {
      let message = this.message
      if (!message.msgKey) {
        error('关键字不能为空')
        return
      }
      if (!message.msgValueCN) {
        error('中文不能为空')
        return
      }
      this.$api[this.optType](message)
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

    modifyMessage (message) {
      this.message = JSON.parse(JSON.stringify(message))
      this.message.orgMsgKey = this.message.msgKey
      this.optType = 'editMessage'
      this.dialogTitle = '修改国际化'
      this.dialogFormVisible = true
    },

    deleteMessage (message) {
      modal('删除', '确认要删除  ' + message.msgKey,
        () => {
          this.$api.deleteMessage({msgKey: message.msgKey}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.messageList.length; i++) {
                  if (this.messageList[i].msgKey == message.msgKey) {
                    this.messageList.splice(i, 1)
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
      this.listRequest = this.$api.getMessageList(data)
      this.listRequest.then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            this.messageList = res.returnContent.result
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
  },

  created () {
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
