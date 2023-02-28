<template>
  <div class="container">
    <el-button @click="addField" style="float: right;margin-bottom: 10px">添加</el-button>
    <div class="container-box" style="clear:both;">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-row :gutter="20" v-for="item, index in sizeForm" :key="index">
          <el-form-item class="form-content">
            <el-col :span="10">
              <el-select v-model="item.value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-select v-model="item.field" placeholder="请选择">
                <el-option
                  v-for="item in fields"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button circle @click="delField(item, index)">
                <i class="el-icon-minus"></i>
              </el-button>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [{
        value: 'one',
        label: '字段1'
      }, {
        value: 'two',
        label: '字段2'
      }, {
        value: 'three',
        label: '字段3'
      }, {
        value: 'four',
        label: '字段4'
      }],
      fields: [
        {
          type: 'ascending ',
          name: '升序',
        },
        {
          type: 'descending',
          name: '降序',
        }
      ],
      sizeForm: [{
        value: 'one',
        field: 'ascending'
      }]
    }
  },
  methods: {
    addField (value) {
      console.log('value', value)
      this.sizeForm.push({
        value: '',
        field: '',
      })
      this.$emit('onChange', this.sizeForm)
    },
    delField (value, index) {
      console.log('value', value, index)
      this.sizeForm.splice(index, 1)
      this.$emit('onChange', this.sizeForm)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .container-box {
    border: 1px solid #eee;
    padding: 10px 0;
    .form-content {
      .el-button {
        width: 30px;
      }
    }
  }
}
</style>
