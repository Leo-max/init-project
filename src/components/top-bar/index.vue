<style scoped>
.amazon-container{
  width: 100%;
  height: 60px;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.05);
  /* position: absolute; */
  top: 0;
  left: 0;
  z-index: 100;
  background: white;
}
.logo{
  width: 126px;
  height: 30px;
  margin-top: 15px;
}

.menu{
  float: right;
}

.link{
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #939393;
  letter-spacing: 1.37px;
  line-height: 60px;
  margin-right: 64px;
}

.link:last-child{
  margin-right: 0;
}

.link.router-link-active{
  color: #5867dd;
}

.customer{
  margin-right: 98px;
}

.order{
  margin-right: 70px;
}

.logistics{
  margin-right: 45px;
}

</style>

<template>
  <div class="amazon-container">
      <a href="http://www.camelfin.com/index1.html" target="_blank"><img class="logo" src="@/assets/images/logo.png"/></a>
    
    <div class="menu">
    </div>
  </div>
</template>

<script>
import common from '@/common'
import util from '@/util'
import api from '@/api'
import store from '@/store'
export default {
     props:{
        optionsShow: {
            default: true
        },
    },
  data () {
    return {
      isDetail: false,
      phoneNo:'',
      personName:'',
      havePaypal: false,
      options:[
          {
            value: 'welcome',
            label: '欢迎  ' +  (store.getState('userInfo') && store.getState('userInfo').phoneNo ? store.getState('userInfo').phoneNo : '')
          },
          {
            value: 'user-auth',
            label: '实名认证'
          }, {
            value: 'user-security',
            label: '安全中心'
          },
          {
            value: 'user-uppaypalbill',
            label: 'PayPal对账单'
          },
          {
            value: 'user-contact',
            label: '联系我们'
          },
          {
            value: 'exit',
            label: '退出'
          }
      ],
        optionsVal: 'welcome'
    }
  },
  methods: {
        onOptionsVal(){
            if (this.optionsVal == 'exit') {
              this.$api.userLogout()
              .then(
                  res => {
                      if(res.respCode == common.HTTP_SUCCESS){
                          store.setToken('')
                          store.commit('setUserInfo', {})
                          this.$router.push({name: 'login'})
                          location.reload()
                      }
                  }
              ).catch(
                  error => {
                      console.log(error)
                  }
              )
            } else if (this.optionsVal == 'welcome') {

            } else {
              this.$router.push({name: this.optionsVal})
            }
        },
    clear () {
      // this.$router.push({name: 'login'})
    }
  },

  created () {

  },
}
</script>
