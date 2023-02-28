<template>
  <div class="container">
    <!-- <LastPage :title="`API调试`" urlPath="/my-api" /> -->
    <div class="content">
      <div class="content-left">
        <div class="api-test-action" style="float: right;margin-bottom: 14px;">
          <!-- <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="版本选择">
              <el-select  size="small" v-model="form.publishVision" placeholder="请选择版本">
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="北京" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form> -->
          <el-button style="margin-top: 6px;">测试</el-button>
        </div>
        <div class="api-result" style="clear:both;">
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-style="{height: '10px'}"
            :cell-style="{padding:'1px'}">
            <el-table-column
              prop="date"
              label="参数名称">
            </el-table-column>
            <el-table-column
              prop="name"
              label="参数类型">
            </el-table-column>
            <el-table-column
              prop="address"
              label="是否必传">
            </el-table-column>
            <el-table-column
              prop="params"
              label="参数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.params" placeholder="请输入参数值" size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="content-right">
        <p class="api-test-action">
          <span style="margin: 10px 0;">返回结果</span>
        </p>
        <div class="api-result"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        publishVision: '',
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市 1518 弄',
        params: '',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市 1518 弄',
        params: '',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市 1518 弄',
        params: '',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市 1518 弄',
        params: '',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市 1518 弄',
        params: '',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市 1518 弄',
        params: '',
      }]
    }
  }
}
</script>

<style lang="less" scope>
.container {
  .content {
    display: flex;
    flex-direction: row;
		flex-wrap:wrap;
		justify-content:space-around;
    // background: pink;
    .content-left, .content-right {
      width: 48%;
      padding-bottom: 10px;
      // height: 500px;
      // background: red;
      .api-result {
        height: 500px;
        border: 1px solid rgb(237, 233, 233);
        margin: 10px 0 10px 10px;
        padding: 20px;
        box-shadow:4px 4px 15px rgb(214, 212, 212);
        // box-shadow: 10px 15px 10px -15px pink;
      }
      .api-test-action {
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        justify-content:space-between;
        // margin: 10px 0 10px 10px;
        padding: 10px;
        margin-top: 5px;
        font-size: 14px;
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
