<style scoped>
  .card{
    width: 100%;
    height: 100%;
    padding: 14px 0 0 0;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 1px 10px 1px rgba(0,0,0,0.07);
  }
  .card .content{
    width: 100%;
    padding: 0 22px 0 16px;
    flex-grow: 1;
    display: flex;
    margin-bottom: 22px;
  }
  .card .bank-icon{
    width: 38px;
    height: 38px;
    flex-grow: 0;
    flex-shrink: 1;
    margin-right: 13px;
    margin-top: 5px;
  }
  .card .main{
    flex-grow: 1;
  }
  .card .main .bank-type{
    margin-bottom: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #747474;
    text-align: left;
  }
  .card .main .bank-num{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3C3C3C;
    text-align: left;
  }
  .card .name{
    width: 38px;
    height: 20px;
    flex-grow: 0;
    flex-shrink: 1;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3C3C3C;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .card .bottom{
    height: 46px;
    flex-grow: 0;
    flex-shrink: 1;
    border-top: 1px solid #e7e7e7;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #FF6F00;
    text-align: center;
    line-height: 44px;
  }
</style>

<template>
  <div class="card" @click.stop="onClickCard">
    <div class="content">
      <img class="bank-icon" :src="bankIcon"/>
      <div class="main">
        <div class="bank-type">{{type}}</div>
        <div class="bank-num">{{numStr}}</div>
      </div>
      <div class="name">{{nameStr}}</div>
    </div>
    <div class="bottom" v-if="showBottom" @click.stop="onClickBottom">查看该卡店铺</div>
  </div>  
</template>

<script>
import util from '@/util'
export default {
  props: {
    icon: {
      default: './static/images/bank-icon.png'
    },
    type: {
      default: '未知银行'
    },
    num: {
      default: '0000 ****  **** 0000'
    },
    name: {
      default: '**'
    },
    showBottom: {
      default: false
    },
    id: {
      default: ''
    }
  },

  computed: {
    bankIcon: function() {
      return util.getBankIcon(this.type)
    },
    numStr: function () {
      return util.convertBankNo(this.num)
    },
    nameStr: function () {
      return util.convertName(this.name)
    }
  },

  methods: {
    onClickCard () {
      this.$emit('clickCard', {bankName:this.type, num: this.num, name: this.name, id: this.id})
    },

    onClickBottom () {
      this.$emit('clickBottom', {bankName:this.type, num: this.num, name: this.name, id: this.id})
    }
  },

  created () {
  }
}
</script>
