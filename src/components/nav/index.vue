<style scoped>
  .nav{
    width: 100%;
    height: 78px;
    background: #F1F1F1;
    /* margin-top: 60px; */
  }
  .nav .link{
    height: 78px;
    font-family: PingFangSC-Regular;
    display: inline-block;
    font-size: 16px;
    color: #A3A9AF;
    letter-spacing: 2px;
    text-align: center;
    margin-right: 115px;
    line-height: 78px;
  }
  .nav .link.router-link-active{
    color: #4A4B4E;
    border-bottom: 3px solid #5867dd;
  }
</style>

<template>
  <div class="nav amazon-container">
    <!-- <router-link class="link" :to="{name: 'eBay'}">提现管理</router-link> -->
    <router-link class="link" :to="{name: 'tixian'}">提现管理</router-link>
    <router-link class="link" :to="{name: 'record-listE'}">交易记录</router-link>
    <router-link class="link" :to="{name: 'account'}">银行卡</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>
