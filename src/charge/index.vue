<style scoped>
  .container{
    width: 100%;
    padding: 25px;
  }
  .header .title{
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    color: #333;
    line-height: 36px;
  }
  .panel{
    height: 100%;
  }
  .panel .title {
    color: #3d4465;
  }
  .panel .menu-icon{
    height: 18px;
    font-size: 17px;
    margin-right: 8px;
  }
  .panel .add-btn{
    width: 80px;
    height: 30px;
    margin-top: 15px;
    line-height: 2px;
    letter-spacing: 5px;
    font-size: 12px;
  }
  .panel .opt{
    margin-right: 20px;
  }
  .el-select-dropdown__item {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #8b8b8b !important;
    letter-spacing: 1.2px;
  }
  .el-select-dropdown__item.selected {
    color: #8b8b8b;
  }
  .step{
    margin: 50px 0 50px 80px;
  }
  .charge-content{
    padding: 50px 100px;
  }
  .charge-content .item{
    height: 50px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .charge-content .item .desc{
    width: 150px;
    flex-shrink: 1;
    flex-grow: 0;
  }
  .charge-content .item .value{
    width: 400px;
  }
  .charge-content .item.btn{
    margin-top: 50px;
  }
  .charge-content .item .success-icon {
    width: 100px;
    height: 100px;
    font-size: 50px;
    line-height: 98px;
    color: #67c23a;
  }
  .charge-content .item .text{
    font-size: 18px;
    color: #67c23a;
  }
  .send{
    width: 100px;
  }
  .return{
    width: 80px;
  }
</style>

<template>
  <div class="container">
    <div class="panel">
      <div class="title">
        <div class="text">
          <i class="menu-icon fa fa-money"></i>
          <h3>充值管理</h3>
        </div>
      </div>
      <div class="panel-content">
        <div class="step">
          <el-steps :space="350" :active="current" finish-status="success" align-center>
            <el-step title="发验证码"></el-step>
            <el-step title="充值页面"></el-step>
            <el-step title="充值成功"></el-step>
          </el-steps>
        </div>
        <div class="charge-content" v-if="current == 0">
          <div class="item">
            <span class="desc">国家区号：</span>
            <el-input class="value" v-model="charge.code"/>
          </div>
          <div class="item">
            <span class="desc">预留手机号：</span>
            <el-input class="value" v-model="charge.userPhone"/>
          </div>
          <div class="item btn">
            <el-button class="send" type="primary" @click="sendCode()">发送验证码</el-button>
          </div>
        </div>
        <div class="charge-content" v-if="current == 1">
          <div class="item">
            <span class="desc">充值金额：</span>
            <el-input class="value" v-model="charge.amount"/>
          </div>
          <div class="item">
            <span class="desc">充值手机号：</span>
            <el-input class="value" v-model="charge.rechargePhone"/>
          </div>
          <div class="item">
            <span class="desc">验证码：</span>
            <el-input class="value" v-model="charge.verifyCode"/>
          </div>
          <div class="item">
            <span class="desc">备注：</span>
            <el-input class="value" v-model="charge.remark" type="textarea" :rows="3"/>
          </div>
          <div class="item">
            <el-button type="primary" @click="recharge()">充值</el-button>
          </div>
        </div>
        <div class="charge-content" v-if="current == 3">
          <div class="item">
            <i class="success-icon el-icon-circle-check"></i>
            <span class="text">恭喜您，充值成功！</span>
          </div>
          <div class="item btn">
            <el-button class="return" type="primary" @click="returnFirst">返回</el-button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import common from '@/common'
export default {
 
  data () {
    return {
      charge: {
        code: '86',
        userPhone: '',
        amount: '',
        rechargePhone: '',
        verifyCode: '',
        remark: '',
      },
      current: 0,
      loading: false,
    }
  },


  methods: {
    sendCode () {
      this.loading = true
      this.$api.sendVerifyCode({tel: this.charge.userPhone})
        .then(
          res => {
            this.loading = false
            if (res.ack) {
              this.current = 1
            }
          }
        ).catch(
          error => {
            this.loading = false
          }
        )
    },

    recharge () {
      this.charge.apiHost = common.DT_HOST
      this.$api.charge(this.charge)
        .then(
          res => {
            this.charge.apiHost = ''
            if (res.ack) {
              this.current = 3
            }
          }
        ).catch(
          error => {
            this.charge.apiHost = ''
          }
        )
    },

    returnFirst () {
      this.current = 0
      this.charge.apiHost = ''
    }
  },

  created () {
  },
}
</script>
