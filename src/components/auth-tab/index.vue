<style scoped>
  /* 认证tab */

.auth-tab {
    display: flex;
    width: 402px;
    height: 44px;
    line-height: 44px;
    background: #FFFFFF;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.07);
    border-radius: 44px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #A3A9AF;
    letter-spacing: 0;
    text-align: center;
    align-items: center;
    margin-bottom: 60px;
}

.auth-tab>div {
    flex: 1;
    cursor: pointer;
}

.auth-tab img {
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -2px;
}

.auth-tab>div.on {
    width: 102px;
    border-radius: 44px;
    color: #FFFFFF;
    background-image: linear-gradient(90deg, #FFA800 0%, #3758ff 100%);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
}
.curTip{
    margin-bottom: 40px;
}
.curTip em{
    display: inline-block;
    border: 2px solid #E1E1E1;
    border-radius: 100%;
    width: 31px;
    height: 31px;
    text-align: center;
    margin-right: 4px;
    vertical-align: middle;
}
.curTip em img{
    /* vertical-align: middle; */
}
.curTip{
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #C5C5C5;
    letter-spacing: 0;
    
}
</style>

<template>
  <div class="">
    <div class="auth-tab">
        <div :class="on1" @click="onClickPer"><img :src="perImg" >个人实名</div>
        <div :class="on2"  @click="onClickComp"><img :src="compImg">企业实名</div>
    </div>
    <p class="curTip" v-if='curTip'><em><img :src='currentTabImg' ></em>{{currentTabTxt}}</p>
  </div>
</template>

<script>
export default {
  props:{
    on1:{
      default: ''
    },
    on2:{
      default: ''
    },
    perImg: {
      default: './static/images/per-4.png'
    },
    compImg: {
      default: './static/images/comp-3.png'
    },
    curTip:{
        default:false
    },
    currentTabImg:{
        default: './static/images/per-3.png'
    },
    currentTabTxt:{
        default:'个人实名'
    }
  },
  methods: {
    onClickPer (e) {
      this.$emit('perSubmit')
    },
    onClickComp (e) {
      this.$emit('compSubmit')
    }
  }
}
</script>
