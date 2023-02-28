
<template>
  <div class="container">
    <!-- <el-upload
      ref="upload"
      class="upload-demo"
      drag
      :headers="headers"
      :auto-upload="false"
      :limit="limit"
      :action="uploadUrl"
      name="sqlFile"
      :on-success="success"
      :on-error="error"
      :on-exceed="exceed"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip"></div>
    </el-upload> -->
    <div class="group-item">
      <div class="item-desc">商品图片</div>
      <div class="item-value">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="headers"
          name="file"
          :show-file-list="false"
          :on-success="success"
          :on-error="error">
          <img v-if="info.imgMain" :src="info.imgMain" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">商品名称</div>
      <div class="item-value">
        <el-input v-model="info.name" autocomplete="off"></el-input>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">商品价格</div>
      <div class="item-value">
        <el-input v-model="info.price" autocomplete="off"></el-input>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">商品库存</div>
      <div class="item-value">
        <el-input v-model="info.stock" autocomplete="off"></el-input>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">商品类型</div>
      <div class="item-value">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedType" @change="handleCheckedType">
          <el-checkbox v-for="type in types" :label="type" :key="type">{{type}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">购买后可获赠积分</div>
      <div class="item-value">
        <el-input v-model="info.pointsAll" autocomplete="off"></el-input>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">每期释放积分数</div>
      <div class="item-value">
        <el-input v-model="info.pointsDay" autocomplete="off"></el-input>
      </div>
    </div>

    <div class="group-item">
      <div class="item-desc">商品描述</div>
      <div class="item-value">
        <el-input v-model="info.details" autocomplete="off"></el-input>
      </div>
    </div>
    <div class="group-item">
      <el-button class="upload-btn" type="primary" @click="upload">提交</el-button>
    </div>
    
  </div>
</template>

<script>
import common from '@/common'
import store from '@/store'
const typeOptions = ['投资产品', '积分商城', '门店', '县代理', '市代理', '省代理', '合伙人'];
export default {
  data () {
    return {
      headers: {},
      uploadUrl: common.API_HOST + '/user/uploadImg',
      isIndeterminate: true,
      checkAll: false,
      checkedType: [],
      types: typeOptions,
      info: {imgMain: ''},
    }
  },

  methods: {

    handleCheckAllChange (val) {
      this.checkedType = val ? typeOptions : [];
      this.isIndeterminate = false;
      console.log(this.checkedType)
    },

    handleCheckedType(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.types.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
      console.log(this.checkedType)
    },

    upload () {
      let typeArr = []
      this.checkedType.forEach(
        item => {
          typeArr.push(typeOptions.indexOf(item) + 1)
        }
      )
      this.info.type = typeArr.join(',')
      this.info.status = 1
      this.$api.uploadPro(this.info).then(
        res => {
          if (res.code == 0) {
            success('上传成功')
          }
        }
      )
    },

    success (res, file, fileList) {
      console.log(res)
      if (res.code == 0) {
        success('操作成功')
        this.info.imgMain = res.data
        console.log(this.info.imgMain)
      } else {
        error(res.returnDesc)
      }
    },

    error (e, file, fileList) {
      error('操作失败')
    },

    exceed () {
      error('最多上传三个文件')
    }
  },

  created () {
    console.log('created')
    this.headers[common.STORAGE_TOKEN] = store.getToken()
  },

  updated () {
    console.log('updated')
  }
}
</script>
<style scoped>
  .container{
    width: 100%;
    padding: 25px;
  }
  .group-item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }
  .item-desc{
    width: 200px;
    flex-shrink: 0;
  }
  .item-value{
    width: 400px;
  }
  .upload-demo{
    margin-top: 100px;
  }
  .upload-btn{
    width: 200px;
    margin-top: 50px;
  }

</style>
