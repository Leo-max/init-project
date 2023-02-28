<template>
  <div class="add-params">
    <el-form :model="dynamicData" ref="dynamicValidateForm" class="demo-dynamic">
      <el-row  :gutter="20">
        <el-form-item
          v-for="(domain, index) in dynamicData"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: '不能为空', trigger: 'blur'
          }"
        >
        <el-col :span="10">
          <el-input v-model="domain.name" placeholder="请输入姓名"></el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="domain.value" placeholder="请输入联系方式"></el-input>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-delete" v-if="index !== 0" @click.prevent="removeDomain(domain)"></i>
        </el-col>
      </el-form-item>
      </el-row>
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
        <span @click="addDomain" class="c58" style="cursor: pointer;">
          <i class="el-icon-plus"></i>
          新增域名</span>
        <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // dynamicValidateForm: {
      //   domains: [{
      //     value: ''
      //   }],
      // }
      dynamicData: [{
        name: '',
        value: '',
      }],
    }
  },
  props: {
    selectData: {
      type: Array,
      default: () => [],
      require: false
    }
  },
  watch: {
    selectData(val) {
      this.dynamicData = val
    }
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    removeDomain(item) {
      var index = this.dynamicData.indexOf(item)
      if (index !== -1) {
        this.dynamicData.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicData.push({
        name: '',
        value: '',
        key: Date.now()
      });
    },
    init() {
      this.dynamicData = this.selectData
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.add-params{
  // background: pink;
  margin-left: 10px;
  .demo-dynamic {
    .el-form-item {
      // background: green;
      margin: 5px 0;
    }
  }
}
</style>
