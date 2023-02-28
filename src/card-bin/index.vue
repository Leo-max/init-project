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
          <i class="menu-icon fa fa-credit-card"></i>
          <h3>卡Bin管理</h3>
        </div>
        <el-button class="add-btn" type="primary" @click="onClickAddCardBin" v-if="resourceMap['/cardbin/add.do'].show">添加</el-button>
      </div>
      <div class="panel-content">
        <el-table v-if="tableShowFlag"
          v-loading="loading"
          :data="cardBinList"
          style="width: 100%;">
          <el-table-column
            prop="cardBin"
            width="120"
            label="银行卡bin">
          </el-table-column>
          <el-table-column
            prop="cardType"
            width="120"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="cardBank"
            width="220"
            label="银行名称">
          </el-table-column>
          <el-table-column
            prop="binStatusStr"
            width="100"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="remark"
            show-overflow-tooltip
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
              <a class="opt" @click="modifyCardBin(scope.row)" type="text" size="small" v-if="resourceMap['/cardbin/update.do'].show">修改</a>
              <a class="opt" @click="deleteCardBin(scope.row)" type="text" size="small" v-if="resourceMap['/cardbin/delete.do'].show">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="$pageData.pageSize" @current-change="pageChange"></el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="cardBin">
        <el-form-item label="银行卡bin：" :label-width="formLabelWidth">
          <el-input v-model="cardBin.cardBin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行名称：" :label-width="formLabelWidth">
          <el-input v-model="cardBin.cardBank" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡类型：" :label-width="formLabelWidth">
          <el-input v-model="cardBin.cardType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="cardBin.binStatus" label="1">启用</el-radio>
            <el-radio v-model="cardBin.binStatus" label="2">停用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input v-model="cardBin.remark" autocomplete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCardBin()">确 定</el-button>
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
      cardBinList: [],
      listRequest: '',
      cardBin: {},
      optType: '',  // addCardBin、editCardBin
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '150px',
      searchText: '',
      searchObj: {
        param: ''
      },
      resourceMap: common.resourceMap,
      loading: true
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

    onClickAddCardBin () {
      this.dialogTitle = '添加卡Bin'
      this.optType = 'addCardBin'
      this.cardBin = {}
      this.dialogFormVisible = true
    },

    addCardBin () {
      let cardBin = this.cardBin
      if (!cardBin.cardBin) {
        error('卡Bin不能为空')
        return
      }
      if (!cardBin.cardBank) {
        error('银行名称不能为空')
        return
      }
      if (!cardBin.cardType) {
        error('银行卡类型不能为空')
        return
      }
      this.$api[this.optType](cardBin)
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

    modifyCardBin (cardBin) {
      this.cardBin = JSON.parse(JSON.stringify(cardBin))
      this.optType = 'editCardBin'
      this.dialogTitle = '修改卡Bin'
      this.dialogFormVisible = true
    },

    deleteCardBin (cardBin) {
      modal('删除', '确认要删除  ' + cardBin.cardBin,
        () => {
          this.$api.deleteCardBin({binId: cardBin.binId}).then(
            res => {
              if (res.ack) {
                for (let i = 0; i < this.cardBinList.length; i++) {
                  if (this.cardBinList[i].binId == cardBin.binId) {
                    this.cardBinList.splice(i, 1)
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
      this.listRequest = this.$api.getCardBinList(data)
      this.listRequest.then(
        res => {
          this.listRequest = null
          this.loading = false
          if (res.ack) {
            this.cardBinList = res.returnContent.result
            this.total = res.returnContent.totalCount
            this.cardBinList.map(
              item => {
                item.binStatusStr = item.binStatus == common.CARDBIN_START ? '启用' : '停用'
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
