<style scoped>
.area-code /deep/ .el-input__inner{
    /* background: rgba(255,255,255,.36);
    height: 47px;
    line-height: 47px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 1.2px;
    border-radius: 0;
    border: 2px solid rgba(232,235,239,.36);
    border-right: none; */
}
</style>

<template>
    <div class="area-code">
        <el-select class="area-code-in" v-model="areaCodess" @change="AreaCodeChange">
            <el-option
            v-for="item in areaCodeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import common from '@/common'
import api from '@/api'
export default {    
    data () {
        return {
            areaCodeList: [{
                    value: '86',
                    label: '中国大陆 86'
                }],
            areaCodess: '86'
        }
    },

    props: {
    },
    methods: {
        AreaCodeChange(){
            this.$emit('GetAreaCode',this.areaCodess);
        },
        checkCode () {
            let self = this
            let phone = this.phoneNum;
            let phoneReg = /^[0-9]*$/
            if(phoneReg.test(phone)){
                initNECaptcha({
                    captchaId: common.CAPTCHAID,
                    element: '#captcha',
                    // mode: 'float',
                    width: 320,
                    onReady: function (instance) {
                        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    },
                    onVerify: function (err, data) {
                        if (err) {
                            console.log(err)    
                        } else {
                            console.log(data.validate)
                            self.sended = false
                            self.onSend(data.validate)
                        }
                    }
                    }, function onload (instance) {
                    // 初始化成功
                    }, function onerror (err) {
                    // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                    }
                )
                this.sended = true
            }
        },
        onEnter (e) {
            if (e.key == 'Enter') {
                this.$emit('enter')
            }
        },
        onGetVerify(){
            let self = this
            let phone = self.phoneNum;
            // let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
            let phoneReg = /^[0-9]*$/
            if(phoneReg.test(phone) && self.verify.length == 6){
                return this.verify
            }else{
                if(!phoneReg.test(phone)){
                    self.phoneError = true
                    setTimeout(function(){
                        self.phoneError = false
                    },1500)
                }else{
                    self.verifyError = true
                    setTimeout(function(){
                        self.verifyError = false
                    },1500)
                }
            }
            
        },
        onGetPass(){
            return this.pass
        },
        onGetSetPass(){
            let self = this
            let loginPwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
            let setPass = self.setPass
            if(loginPwdReg.test(setPass)){
                return this.setPass
            }else{
              self.setPassError= true
              setTimeout(function(){
                  self.setPassError = false
              },1500)
            }
            
        },
        onPhoneBlur(){            
            let self = this
            let phone = self.phoneNum;
            // let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
            let phoneReg = /^[0-9]*$/
            if( !phoneReg.test(phone)){
                self.phoneError = true
                setTimeout(function(){
                    self.phoneError = false
                },1500)
            }else{
                this.$emit('GetPhoneNum',this.phoneNum);
            }            
        },
        onSend(code){
            let phone = this.phoneNum;
            // let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
            let phoneReg = /^[0-9]*$/
            
            if(phoneReg.test(phone)){
                this.$emit('GetPhoneNum',this.phoneNum);
                this.sendVDis = true
                let times = 59
                this.sendVtxt= times + 's'
                let timerId = setInterval(()=>{                    
                    if(times <= 0){
                        this.sendVDis = false
                        this.sendVtxt = '重新发送'
                        clearInterval(timerId)
                        return
                    }
                    this.sendVtxt= --times + 's'
                }, 1000)
                if(this.logType ==1){
                    //登录验证码
                    this.$api.sendLoginVerifyCode({'phoneNo':phone, 'code': code})
                    .then(
                        res => {
                            if(res.respCode == common.HTTP_SUCCESS){
                                // console.log(res.respMsg)
                            }
                        }
                    ).catch(
                        error => {
                            console.log(error)
                        }
                    )

                }else if(this.logType ==3){
                    //忘记登录密码验证码
                    this.$api.sendResetPayPasswordVerifyCode({'phoneNo':phone})
                    .then(
                        res => {
                            
                            if(res.respCode == common.HTTP_SUCCESS){
                                // console.log(res.respMsg)
                            }
                        }
                    ).catch(
                        error => {
                            console.log(error)
                        }
                    )
                } 
            }else{
                let self = this
                self.phoneError = true
                setTimeout(function(){
                    self.phoneError = false
                },1500)
            }
            
        },
    },
    created () {  
        if(this.logType==1 && !this.setPwd){
            this.VerifyBox = true
            this.PwdBox = false
            this.SetPwdBox = false
        }else if(this.logType==2 && !this.setPwd){
            this.VerifyBox = false
            this.PwdBox = true
            this.SetPwdBox = false
        }else if(this.logType==3 && this.setPwd){
            this.VerifyBox = true
            this.PwdBox = false
            this.SetPwdBox = true
        }
    }
}
</script>
