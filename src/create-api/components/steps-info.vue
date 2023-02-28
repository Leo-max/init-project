<template>
  <div class="container">
    <div class="container-box">
      <p class="form-title" style="padding: 20px 48px;">基本信息</p>
      <el-form :model="list" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="API名称" prop="name">
                <el-input v-model="list.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本" >
                <el-input disabled v-model="list.vision" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="接口编号">
                <el-input disabled v-model="list.code" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="API描述" prop="desc">
                <el-input type="textarea" v-model="list.desc" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="对外暴漏路径" prop="pathStr">
                <el-input v-model="list.pathStr" size="mini" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口协议" prop="type">
              <el-select v-model="list.type" placeholder="请选择接口协议" size="mini">
                <el-option label="http" value="http"></el-option>
                <el-option label="https" value="https"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="创建方式" prop="createType">
              <el-select v-model="list.createType" placeholder="请选择接口协议" size="mini">
                <el-option label="线上创建" value="line"></el-option>
                <el-option label="线上创建" value="service"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="form-title" style="padding: 20px 48px;">权限管理</p>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补充说明" prop="createType">
              <el-upload
                class="upload-demo"
                :action="upload.url"
                accept=".docx"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="(file) =>beforeUpload(file,2)"
                :on-success="handleSuccess"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">文件上传格式限定为word格式，文件大小不能超过2M</div>
              </el-upload>
              <!-- <el-upload
                class="upload-demo"
                accept=".doc, .docx"
                action
                :on-change="handlePreview"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="">
                  <i class="el-icon-upload2"></i>
                  上传</el-button>
                <span slot="tip" class="el-upload__tip" style="padding:0 10px;">注: 接口逻辑详情说明在此上传</span>
              </el-upload> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="添加技术联系人" prop="contacts" label-width="140px">
              <addPhone :selectData="list.contacts"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import addPhone from './add-phone.vue';
export default {
  data() {
     return {
      infoData: {},
      fileList: [],
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          pathStr: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择接口协议', trigger: 'change' }
          ],
          createType: [
            { required: true, message: '请选择接口协议', trigger: 'change' }
          ],
          contacts:[
            { required: true, message: '请输入', trigger: 'change' }
          ]
        },
      upload:{
        url:process.env.VUE_APP_BASE_API +'/upload_url?curDir=/data'
      },
     }
  },
  watch: {
    list: {
      handler: function(newVal, oldValue) {
        console.log(newVal, oldValue)
      },
      deep: true
    }
  },
  components: {
    addPhone
  },
  props: {
    list: {}
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      return
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
  created() {
    this.infoData = this.list
  }
}
</script>

<style lang="less" scoped>
.container {
  .container-box {
    padding: 10px 100px;
  }
}

</style>
