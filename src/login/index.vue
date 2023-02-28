<style scoped>
.pr{
    position: relative;
}
.bg{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 100% 100%;
    color: white;
    /* background-image: url(../assets/images/bg.png); */
    background-image: linear-gradient(90deg, #003194 24%, #D25252 85%);
    perspective: 200px;
}
.bg.showImg{
    background-image: url(../assets/images/BZ.jpg);
}
 .log-panel{
    width: 444px;
    height: 620px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%,0);
    padding: 35px 43px 0;
    background: rgba(255,255,255,.09);
    border: 1px solid rgba(255,255,255,0.33);
    color: rgba(255,255,255,.6);
    line-height: 22px;
}
.log-panel .logo{
    height: 52px;
    line-height: 52px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 2.8px;
    margin-bottom: 9px;
}
.logo img{
    width: 31px;
    height: 33px;
    margin-right: 5px;
    vertical-align: middle;
}
.agree-panel{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255,255,255,.58);
    margin: 6px 0 28px;
}
.el-checkbox{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255,255,255,.58);
}
.forgetPwd{
    cursor: pointer;
}
button{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(255,111,1,.76);
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 4.72px;
}
.log-wechat{
    height: 22px;
    line-height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 1.37px;
    margin-top: 31px;
    text-align: center;
    cursor: pointer;
}
.log-wechat img{
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -2px;
}
.forgetPwd-box{
    margin-top: 22px;
}
.set-success{
    text-align: center;
}
.set-success img{
    width: 89px;
    height: 89px;
    margin-top: 100px;
}
.set-success .txt{
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 2.8px;
    text-align: center;
    line-height: 52px;
    margin: 38px 0 110px;
}
.log-tip{
    height: 22px;
    line-height: 22px;
    font-family: PingFangSC-Regular;
    text-align: center;
    color: #fff;
    margin-top: 20px;
}
.layer-cont{
    padding: 0 70px;
}
.layer-cont b{
    text-decoration: underline;
}
 .layer-cont-btns button{
    display: inline-block;
    width: 256px;
    height: 47px;
    line-height: 45px;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    text-align: center;
    margin-top: 23px;
}
.txts-box{
    padding-top: 25px;
    padding-bottom: 23px;
}
@media screen and (max-height: 750px) {
    .logo{
        display: none;
    }
     .log-panel{
        width: 444px;
        height: 524px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%,0);
        padding: 35px 43px 0;
        background: rgba(255,255,255,.09);
        border: 1px solid rgba(255,255,255,0.33);
        color: rgba(255,255,255,.6);
        line-height: 22px;
    }
}
.topbar{
    background: rgba(0, 0, 0, 0) !important;
}
.xianmian{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
}
</style>

<template>
    <div class="bg" :class="{showImg}">
        <!-- <Topbar class="topbar" :optionsShow="TopbarOptionsShow"></Topbar> -->
        <div class="log-panel" v-if="!firstLogShow">
            <p  class="logo"><img src="@/assets/images/xflogo.png" />{{pageTit}}</p>
            <div class="log-box" v-if="logBox">
                <el-tabs  v-model="activeName">
                    <el-tab-pane label="验证码登录"  name="verify">
                        <Logpanel ref="logVPanel" logType="1" :setPwd="false" v-on:onGetAreaCode="GetAreaCODE"  v-on:GetPhoneNum="onFPhone" @enter="onLog"/>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="密码登录" name="pwd">
                        <Logpanel ref="logPassPanel" logType="2" :setPwd="false" v-on:GetPhoneNum="onFPhone" @enter="onLog"/>
                        <p class="agree-panel">
                            <span class="forgetPwd" @click="onForget" >忘记密码 <i class="el-icon-question"></i></span>
                        </p>
                    </el-tab-pane> -->
                </el-tabs>
                <div class="log-com">
                    <div class="log-btn">
                        <button @click="onLog">登录</button>
                    </div>
                    <div class="log-tip">
                        登录即注册
                    </div>
                    <!-- <div class="log-wechat">
                        <img src="@/assets/images/wx.png" />微信登录<i class="el-icon-arrow-right"></i>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import common from '@/common'
import store from '@/store'
import Logpanel from '@/components/logpanel'
import Topbar from '@/components/top-bar'
import PhoneAreaCode from '@/components/phone-area-code'
import api from '@/api'
import util from '@/util'
export default {
    components: {
        Logpanel,
        PhoneAreaCode,
        Topbar
    },
  data () {
    return {
        TopbarOptionsShow:false,
        pageTit:'登录LOGIN',
        showImg: false,
        activeName:'verify',

        phoneNo:'',
        
        logBox:true,
        forgetPwd:false,
        rePwdSuc:false,
        firstLogShow:false,
        loginRes: '',

        verifyCode:'',
        loginPwd:'',
        areaCode:'86'
    }
  },
  methods: {
    GetAreaCODE(e){
        this.areaCode = e
    },
    onFPhone(e){
        this.phoneNo = e
    },

    onLog(){
        let param={}
        if(this.phoneNo) param.userPhone = this.phoneNo                      
        let query = this.$route.query
        if (query.channelCode) {
            param.channelCode = query.channelCode
        }
            let verifyCode = this.$refs.logVPanel.onGetVerify()
            // if(!verifyCode){
            //     let self = this
            //     self.$refs.logVPanel.verifyError = true
            //     setTimeout(function(){
            //         self.$refs.logVPanel.verifyError = false
            //     },2000)
            // }else{
            //     param.verifyCode = verifyCode                    
            //     param.areaCode = this.areaCode
            // }

        this.$api.login({tel: param.userPhone, sms: verifyCode})
        .then(
            res => {
                if (res.code == 0) {
                    console.log(res.data)
                    store.setToken(res.data.token)
                    store.setPhone(param.userPhone)
                    this.$router.push({name: 'index'})
                }
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    },
  },

  created () {
        let img = new Image()
        var imgUrl = require('../assets/images/BZ.jpg')
        img.src = imgUrl
        img.onload = () => {
            this.showImg = true
        }
        img.onerror = () => {
        console.log('error')
        }
  }
}
</script>
