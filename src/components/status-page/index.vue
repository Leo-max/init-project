<style scoped>
  .status-page{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .status-page .status-icon{
    max-width: 100%;
    max-width: 100%;
    margin-bottom: 25px;
  }
  .status-page .status-title{
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #2E2E2E;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
    margin-bottom: 11px;
  }
  .status-page .status-content{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E2E2E;
    letter-spacing: 0;
    text-align: center;
    line-height: 22px;    
  }
  .status-contentSup{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E2E2E;
    letter-spacing: 0;
    text-align: center;
    line-height: 22px;
    margin-top: 15px;
  }
  .status-page .status-btn{
    width: 196px;
    height: 50px;
    background-image: linear-gradient(90deg, #FFA800 0%, #3758ff 100%);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    margin-top: 40px;
  }
  .hotline-content{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3758ff;
    letter-spacing: 0;
    line-height: 14px;
    margin-top: 20px;
  }
</style>

<template>
  <div class="status-page">
    <img class="status-icon" :src="img"/>
    <div class="status-title" v-if="title">{{title}}</div>
    <div class="status-content" v-if="content">{{content}}</div>
    <div class="status-contentSup" v-if="contentSup">{{contentSup}}</div>
    <div class="hotline-content" v-if="hotline">{{hotline}}</div>
    <el-button class="status-btn" v-if="btnText" @click="onClickStatusBtn">{{btnText}}</el-button>    
  </div>
</template>

<script>
export default {
  props:{
    title: {
      default: ''
    },
    content: {
      default: ''
    },
    btnText: {
      default: ''
    },
    img: {
      default: './static/images/tjcg.png'
    },
    hotline:{
      default:'如有问题，请联系客服：400-700-2018'
    },
    contentSup:{
      default:''
    }
  },
  methods: {
    onClickStatusBtn (e) {
      this.$emit('submit')
    }
  }
}
</script>
