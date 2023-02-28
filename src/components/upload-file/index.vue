<template>
  <el-dialog
    :visible="visionShow"
    width="30%"
    title="导入API"
    :before-close="closeImportApi">
    <el-upload class="upload-demo"
      multiple
      drag
      :limit="limit"
      :accept="accept"
      :headers="headers"
      :file-list="fileList"
      :action="uploadImgUrl"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-error="handleUploadError">
    <!-- :on-preview="handlePreview" -->
      <!-- <el-button size="small"
        type="primary">点击上传</el-button>
      <div slot="tip"
        class="el-upload__tip"
        style="color:#909399">
        支持上传{{ accept === "*" ? "所有" : accept }}文件，且不超过20MB,附件名称不能超过50字
      </div> -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
        <div class="el-upload__tip" slot="tip" style="color:#909399">支持上传{{ accept === "*" ? "所有" : accept }}文件，且不超过20MB,附件名称不能超过50字</div>
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeImportApi">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  created() {
    console.log('visionShow', this.visionShow)
  },

  components: {},
  props: {
    value: {
      type: String,
      default: null
    },
    accept: {
      type: String,
      default: '*'
    },
    limit: {
      type: Number,
      default: 1
    },
    visionShow: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer '
      },
      fileList: [],
      returnData: []
    }
  },
  watch: {
    visionShow(value) {
      console.log('value', value)
      this.visionShow = value
    }
  },
  mounted () {
    this.value === null && this.value === '' ? (this.fileList = []) : this.getFileList()
  },
  methods: {
    closeImportApi() {
      this.$parent.closeImport()
    },
    handleApi() {

    },

    getFileList () {
      if (this.value !== null && this.value !== '') {
        const accessory = JSON.parse(this.value)
        this.fileList = []
        accessory.map(val => {
          this.fileList.push({
            name: val.name,
            // 编辑修改
            // response: {
            //   fileName: val.url
            // },
            response: {
              data: {
                fileName: val.url
              }
            }
          })
        })
      }
    },
    // 删除上传文件后
    handleRemove (file, fileList) {
      this.getReturnData(fileList)
    },
    // 上传前------------文件大小和格式校验
    beforeUpload (file) {
      debugger
      if (this.accept !== '*') {
        var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const accept = this.accept.split(',')
        if (accept.indexOf('.' + fileType) < 0) {
          this.$message.warning('请选择正确的文件格式')
          return false
        }
      }
      const isLt50M = file.size / 1024 / 1024 < 20
      if (!isLt50M) {
        this.$message.warning('上传附件大小不能超过 20MB!')
        return false
      }
      return true
    },
    // 附件上传成功后的钩子
    handleSuccess (response, file, fileList) {
      debugger
      if (response.code === 200) {
        this.getReturnData(fileList)
      } else {
        this.$message.error(response.msg)
        this.fileList=[]
      }
    },
    handleUploadError () {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
    },
    // 获取附件信息后进行返回处理
    getReturnData (fileList) {
      this.returnData = []
      console.log(fileList)
      fileList.map(val => {
        this.returnData.push({
          name: val.name,
          url: val.response.data.fileName
        })
      })
      this.$emit('input', JSON.stringify(this.returnData))
    },
    // 点击上传文件的钩子
    handlePreview (file) {
      var a = document.createElement('a', '_bank')
      var event = new MouseEvent('click')
      a.download = file.name
      a.href = file.response.url
      a.dispatchEvent(event)
    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制只能上传 ` + this.limit + ` 个文件`)
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style lang="less" scoped>
.upload-demo {
  display: flex;
  justify-content: center;
}
</style>
