<style scoped>
.pr{
    position: relative;
}
.log-panel{
    width: 444px;
    height: 613px;
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
.log-panel label{
    display: block;
}
.log-panel input{
    width: 100%;
    height: 47px;
    line-height: 43px;
    background: rgba(255,255,255,.36);
    border: 2px solid rgba(232,235,239,.36);
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 1.2px;
    padding-left: 10px;
}
.log-panel input.sendV{
    position: absolute;
    width: 80px;
    border: none;  
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0) ;
    padding-left: 0;
}
.panel-tit{
    height: 22px;
    line-height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: rgba(255,255,255,.58);
    letter-spacing: 1.37px;
    margin-bottom: 10px;
}
.error-tip{
    visibility: hidden;
    height: 17px;
    line-height: 17px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FF6A5D;
    letter-spacing: 1.03px;
    margin: 9px 0;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	font-size: 14px;
	color: rgba(255,255,255,.58);
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
	font-size: 14px;
	color: rgba(255,255,255,.58);
}
input:-ms-input-placeholder{
	font-size: 14px;
	color: rgba(255,255,255,.58);
}
input::-webkit-input-placeholder{
	font-size: 14px;
	color: rgba(255,255,255,.58);
}
.errorColor{
    color: #FF6A5D !important;
}
.visib{
    visibility: visible !important;
}
#captcha{
    margin-bottom: 20px;
}
.phones-box{
    display: flex;
}
.area-code{
    flex-basis: 160px;
}
.phonin{
    flex: 1;
}
.voice-code{
    opacity: 0.58;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 1.03px;
    text-align: right;
    margin-top: 11px;
    cursor: pointer;
}

.area-code /deep/ .el-input__inner{
    background: rgba(255,255,255,.36);
    height: 47px;
    line-height: 47px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 1.2px;
    border-radius: 0;
    border: 2px solid rgba(232,235,239,.36);
    border-right: none;
}
.area-code /deep/ .el-select .el-input.is-focus .el-input__inner{
    border-color: rgba(232,235,239,.36);
}
body /deep/  .el-select .el-input.is-focus .el-input__inner{
    border-color: rgba(232,235,239,.36);   
}
body /deep/ .el-scrollbar__view el-select-dropdown__list .el-select-dropdown__item.selected span{
    color: #606266;
}
</style>

<template>
    <div >
        <div class="PhoneBox">
            <p class="panel-tit">手机号</p> 
            <div class="phones-box">
                <label class="phonin">
                    <input v-model.trim="phoneNum" :class="{ errorColor: phoneError }" placeholder="请输入您的手机号" maxlength="11" type="text" v-on:blur="onPhoneBlur"/>
                    <p  :class="[phoneError ? visib : '', errorTip]" >手机号码错误，请重新输入</p>
                </label>
            </div>
        </div>
        <div class="VerifyBox" v-if="VerifyBox">
            <p class="panel-tit">验证码</p>
            <div>
                <label class="pr">
                    <input v-model.trim="verify" placeholder="请输入验证码" maxlength="6" type="text" v-on:blur="onGetVerify" @keypress="onEnter"/>
                    <input class="sendV" type="button" :value="sendVtxt" :disabled="sendVDis" @click="checkCode">
                </label>
                <!-- <p class="voice-code">语音接收验证码</p> -->
                <p  :class="[verifyError ? visib : '', errorTip]" >验证码错误，请重新输入</p>
            </div>
        </div>
        <div class="VerifyBox" v-show="VerifyBox && sended">
            <div id="captcha"></div>
        </div>
        <div class="PwdBox"  v-if="PwdBox">
            <p class="panel-tit">密码</p>
            <div>
                <label>
                    <input v-model.trim="pass" placeholder="请输入6-16登录密码（数字+字母）" minlength="6" maxlength="16" type="password" v-on:blur="onGetPass" @keypress="onEnter"/>
                </label>
                <p  :class="[passError ? visib : '', errorTip]" >密码错误，请重新输入</p>
            </div>
        </div>
        <div class="SetPwdBox"  v-if="SetPwdBox">
            <p class="panel-tit">新密码</p>
            <div>
                <label>
                    <input v-model.trim="setPass" placeholder="设置新的登录密码（6-16位字母+数字组合）" minlength="6" maxlength="16" type="password" v-on:blur="onGetSetPass"/>
                </label>
                <p  :class="[setPassError ? visib : '', errorTip]" >请设置6-16登录密码（数字+字母）</p>
            </div>
        </div>
        
    </div>

</template>
<script>
import common from '@/common'
import api from '@/api'
import PhoneAreaCode from '@/components/phone-area-code'
export default { 
    components: {
        PhoneAreaCode
    },   
    data () {
        return {
            phoneNum:'',
            phoneError:false,
            pass:'',
            setPass:'',
            passError:false,
            setPassError:false,
            verify:'',
            verifyError:false,
            sendVtxt:'发送',
            sendVDis:false,
            checked:true,
            showImg: false,
            activeName:'verify',
            errorTip:'error-tip',
            visib:'visib',

            VerifyBox:true,
            PwdBox:false,
            SetPwdBox:false,
            sended: false,
            areaCodes:'86'
        }
    },

    props: {
        logType: {
            default: 1
        },
        setPwd: {
            default: false
        }
    },
    methods: {
        onGetAreaCode(e){
            this.areaCodes = e
            this.$emit('onGetAreaCode',this.areaCodes);
        },
        checkCode () {
            let self = this
            let phone = this.phoneNum;
            let phoneReg = /^[0-9]*$/
            if(phone && phoneReg.test(phone)){
                this.sended = true
                self.onSend()
            }
        },
        onEnter (e) {
            if (e.key == 'Enter') {
                this.$emit('enter')
            }
        },
        onGetVerify(){
                return this.verify
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
        onSend(){
            let phone = this.phoneNum;
            // let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
            let phoneReg = /^[0-9]*$/
            let areaCode =this.areaCodes
            console.log('onSend')
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
                    this.$api.sendVerifyCode({'tel':phone})
                    .then(
                        res => {
                            if(res.ack){
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
