<template>
  <div class="container">
    <div class="container-box">
      <p class="form-title" style="padding: 20px 48px;">数据表选择</p>
      <el-form :model="formData" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="scope表名选择" prop="tableName">
              <el-select v-model="formData.tableName" placeholder="请选择表名" size="mini">
                <el-option label="http" value="http"></el-option>
                <el-option label="https" value="https"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="request-info">
              <p class="request-title">请求参数</p>
              <el-table
                :data="formData.requestTableData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="参数名">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="参数类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择类型" size="mini">
                      <el-option label="string" value="string"></el-option>
                      <el-option label="array" value="array"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="isTrue"
                  label="是否必传">
                  <template slot-scope="scope">
                      <el-radio v-model="scope.row.isTrue" :label="true" disabled>{{''}}</el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="operator"
                  label="运算符">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.operator" placeholder="请选择运算符" size="mini">
                      <el-option label="等于" value="equal"></el-option>
                      <el-option label="大于" value="geaterThan"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="field"
                  label="scope字段">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.field" placeholder="请选择scope字段" size="mini">
                      <el-option label="字段一" value="one"></el-option>
                      <el-option label="字段二" value="two"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleDelete(scope.$index, formData.requestTableData)"
                      icon="el-icon-delete"
                      circle>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <i style="font-size:16px;padding:10px;font-weight:600;" class="el-icon-plus c58" @click="addTableItem(formData.requestTableData)"></i>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col>
          <div class="config-management">
            <p class="form-title" style="padding: 20px 48px;">配置管理</p>
            <div class="dbl-btn">
              <el-button plain @click="handleOpen">参数关系配置</el-button>
              <el-button plain @click="handleFieldOpen">字段排序配置</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <p class="form-title" style="padding: 20px 48px;">数据表选择</p>
      <el-form :model="formData" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="hyperbase表名选择" prop="tableName" label-width="150px">
              <el-select v-model="formData.tableName" placeholder="请选择表名" size="mini">
                <el-option label="http" value="http"></el-option>
                <el-option label="https" value="https"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="request-info">
              <p class="request-title">返回参数</p>
              <el-table
                :data="formData.responseTableData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="参数名">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="参数类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择类型" size="mini">
                      <el-option label="string" value="string"></el-option>
                      <el-option label="array" value="array"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="isTrue"
                  label="是否必传">
                  <template slot-scope="scope">
                      <el-radio v-model="scope.row.isTrue" :label="true" disabled>{{''}}</el-radio>
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="fatherElement"
                  label="父元素">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.fatherElement" placeholder="请选择运算符" size="mini">
                      <el-option label="等于" value="equal"></el-option>
                      <el-option label="大于" value="geaterThan"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="HBField"
                  label="HB字段名">
                </el-table-column>
                <el-table-column
                  prop="HBType"
                  label="HB类型">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleResponseDelete(scope.$index, formData.responseTableData)"
                      icon="el-icon-delete"
                      circle>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <i
              style="font-size:16px;padding:10px;font-weight:600;"
              class="el-icon-plus c58" @click="addResponseTableItem(formData.responseTableData)"></i>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 参数关系配置 -->
    <el-dialog title="参数关系配置" :visible="showDialog" :before-close="handleClose" :close-on-click-modal="false">
      <div class="dialog-content">
          <ParamRelation :list="paramData" :level="level" @onChange="onRelationChange"></ParamRelation>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSave">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 字段排序配置 -->
    <el-dialog title="字段排序配置" :visible="showFiledVisible" :before-close="handleFieldClose" :close-on-click-modal="false">
      <div class="dialog-content">
        <!-- <span>asdasdasd</span> -->
          <ParamField :list="fieldData" @onChange="addField"/>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleFieldClose">取 消</el-button>
          <el-button type="primary" @click="handleFieldSave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ParamRelation from '@/components/param-relation'
import ParamField from '@/components/param-field'
import store from '@/store'
export default {
  data() {
    return {
      rules: {
        tableName: [
          { required: true, message: '请选择表名', trigger: 'change' },
        ]
      },
      formData: {},
      level: 2,
      showDialog: false,
      paramData: [],
      showFiledVisible: false,
      fieldData: [],
    }
  },
  components: {
    ParamRelation,
    ParamField
  },
  watch: {
    list: {
      handler: function(newVal, oldValue) {
        console.log(newVal, oldValue)
      },
      deep: true
    }
  },
  props: {
    list: {}
  },
  methods: {
    handleResponseDelete(index, rows) {
      rows.splice(index, 1);
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    addResponseTableItem(data) {
      data.push({
        name: '',
        type: '',
        fatherElement: '',
        HBField: '',
        HBType: '',
      });
    },
    addTableItem(data) {
      data.push({
        name: '',
        type: '',
        isTrue: true,
        operator: '',
        field: '',
      });
    },
    handleOpen () {
      this.showDialog = true
    },
    handleFieldOpen () {
      this.showFiledVisible = true
    },
    handleClose () {
      this.showDialog = false
    },

    handleSave () {
      console.log('paramData', this.paramData)
      store.commit('setRelationData', this.paramData)
      // localStorage.setItem('relationData', this.paramData)
      this.showDialog = false
    },

    onRelationChange (list) {
      console.log('change!!!!!!!!!!')
      console.log(list)
      this.paramData = list
    },
    handleFieldClose () {
      this.showFiledVisible = false
    },

    handleFieldSave () {
      store.commit('setFieldData', this.fieldData)
      this.showFiledVisible = false
    },
    addField(list) {
      console.log('list', list)
      this.fieldData = list
    },
    handleFieldClose () {
      this.showFiledVisible = false
    },

    handleFieldSave () {
      this.showFiledVisible = false
    },
  },
  created() {
    this.formData = this.list
    // let data = localStorage.getItem('relationData')
    let data = store.getState('form').relationData
    let list = store.getState('form').sizeForm
    // console.log('data', data)
    this.paramData = data
    this.fieldData = list
    // this.paramData = data ? JSON.parse(data) : []

  }
}
</script>

<style lang="less" scoped>
.container {
  .container-box {
    padding: 10px 100px;
    .demo-ruleForm{
      padding: 0 50px;
    }
  }
}
.request-info, .response-info {
  border: 1px solid #faf7f7;
  background: #faf7f7;
  border-radius: 10px;
  .request-title, .response-title {
    color: #656565;
    padding: 6px 10px;
    font-size: 14px;
  }
  /deep/.el-button{
    width: 40px;
    height: 40px;
    // font-size: 12px;
    // line-height: 2px;
  }
}
.config-management {
  .dbl-btn {
    padding: 0 60px;
    /deep/.el-button {
      width: 120px;
    }
  }
}
</style>
