<style scoped>
 /* 股东信息 */
.option-txt{
    height: 40px;
    line-height: 40px;
}
.option-tip-txt{
    font-size: 14px;
    color: #919191;
    letter-spacing: 1.31px;
}
.lang-rectangle-input{
    text-align: left;
    padding-left: 15px;
    color: #000;
}
:-moz-placeholder { 
	font-size: 14px;
	color: #ababab;
}

::-moz-placeholder { 
	font-size: 14px;
	color: #ababab;
}
input:-ms-input-placeholder{
	font-size: 14px;
	color: #ababab;
}
input::-webkit-input-placeholder{
	font-size: 14px;
	color: #ababab;
}

.option-txt3{
    height: auto;
    margin-bottom: -25px;
}
/* 图片上传 */
.right-align-box-img{
    margin-bottom: 40px;
}
.id-up-box{
    margin-right: -40px;
}
.up-img-box{
    position: relative;
    display: inline-block;
    margin-right: 40px;
    
}
.up-img-box /deep/ .avatar-uploader .el-upload {
    width: 179px;
    height: 113px;
    border: 1px dashed #D6D6D6;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
}
.up-img-box /deep/ .avatar-uploader .el-upload:hover {
    border-color: #3758ff
}
.up-img-box /deep/ .avatar {
    width: 179px;
    height: 113px;
    display: block;
}
.up-img-box /deep/ .avatar-uploader-icon {
    display: block;
    width: 179px;
    height: 113px;
    
}
.img-tip{
    line-height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #A3A9AF;
    letter-spacing: 0;
    text-align: center;
    margin-top: 14px;
}
.hover-box{
    display: none;
    position: absolute;
    top: -60px;
    left:  220px;
    width: 450px;
    height: 194px;
    box-shadow: 0 2px 30px 0 rgba(0,0,0,0.1);
    padding-left: 25px;
    padding-top: 30px;
    background: #fff;
}
.hover-box::after{
    position: absolute;
    left: -20px;
    top: 50%;
    margin-top: -5px;
    content: '';
    display: block;
    border: 10px solid transparent;
    border-right-color: #fff;
    width: 0;
    height: 0;
    
}
.hover-box .txt{
    display: inline-block;
    width: 300px;
    margin-left: 20px;
}
.hover-box .txt p{
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #969696;
    letter-spacing: 0;
    line-height: 22px;
}
.up-img-box:hover .hover-box{
    display: block;
}
.upic1{
    background-image: url(../../assets/images/sfzzm.png);
}
.upic2{
    background-image: url(../../assets/images/sfzf.png);
}
.upic4{
    background-image: url(../../assets/images/hz.png);
}

.upic6{
    background-image: url(../../assets/images/txz.png);
}
.upic7{
    background-image: url(../../assets/images/txzf.png);
}
.tip2{
    margin: 15px 0 45px 5px;
}
.parternertxt{
    width: 295px;
    font-size: 12px;
    color: #919191;
    word-break: break-all;
}
</style>

<template>
  <div class="">
    <div class="authbox" v-loading="loading">        
        <div class="option-item">
            <p class="option-tit option-tit2">
                股东证件类型
            </p>
            <div class="option-txt">
                <div class="option-txt-choice"> 
                    <el-radio-group v-model="CardImgListBase.actType" @change="onGetVerifyType">
                        <el-radio v-for="(item,key) in CardImgListBase.value" :label="key" :key="item.verifyType">{{item.label}}</el-radio>
                    </el-radio-group>
                </div>
                
            </div>
        </div>
        <div class="option-item" style="margin-bottom:0; margin-top:-35px;">
            <p class="parternertxt">
                （股东占股25%以上的需要填写股东信息和上传股东身份证件）
            </p>
        </div>
        <div class="right-align-box right-align-box-img">
            <!-- 身份证 -->
            <div class="id-up-box" v-for="(item, key) in CardImgListBase.value" :key="key" >
                <div class="up-img-box up-img-box2" v-for="(fileItem, index) in item.files" v-if="CardImgListBase.actType == key" :key="fileItem.name" @click="onPartner(index,key)">
                    <el-upload
                        accept="image"
                        :action= "uploadImgHost"
                        :before-upload="onBeforeUpload"
                        :on-progress = 'onProgress'
                        :on-success="onPartnerSuccess"
                        :on-error="onIDError"
                        :on-change="onPartnerChangeFile"
                        :show-file-list="false"
                        name="img"
                        :data="{imgType:fileItem.imgType,uploadFlag:fileItem.uploadFlag}"
                        class="avatar-uploader">
                        <img v-if="fileItem.imgUrlPre" :src="fileItem.imgUrlPre" class="avatar">
                        <i v-else :class="'avatar-uploader-icon '+fileItem.bgClass"></i>
                    </el-upload>
                    <p class="img-tip">{{fileItem.tipTxt}}</p>
                </div>
            </div>
            
            <!--  -->
        </div>
        <div  class="right-align-box" style="margin-bottom:20px;">
            <div class="option-txt">
                <p>
                    <input class="lang-rectangle-input" type="text"  v-model="CardImgListBase.value[[CardImgListBase.actType]].userName" placeholder="请输入股东姓名" v-on:blur="onGetUserName(partnerInd)">
                </p>
            </div>
        </div>
        <!-- <div class="right-align-box">
            <p class="option-tip-txt tip2">股东占股25%以上的需要填写股东信息和上传股东身份证件</p>
        </div> -->
        <div class="option-item right-align-box">
            <div class="option-txt">
                <p>
                    <input class="lang-rectangle-input" type="text"  v-model="CardImgListBase.value[[CardImgListBase.actType]].pagerNo" placeholder="请输入股东证件号码" v-on:blur="onGetPagerNo">
                </p>
            </div>
        </div>
        
    </div>
    
  </div>
</template>

<script>
import common from '@/common'
import util from '@/util'
export default {
    data () {
        return{
            loading:false,
            uploadImgHost: common.API_HOST + '/global/uploadImg',
            CardImgKey:'',//是身份证1还是护照2--
            CardImgNm:'',
        }
    },
    props:{
        partnerInd:{
            default: -1,//股东LIST INDEX
        },
        partneActType:{
            default: '1',//股东证件
        },
        CardImgListBase:{
            type: Object,
            default:() =>{
                return {
                        actType: '1',
                        value: {'1':{
                            label: '身份证',
                            verifyType:'1',
                            userName:'',
                            pagerNo:'',
                            files: [
                                {name: 'IDCardImg_0',imgType:'1',uploadFlag:0, url: '',imgUrlPre:'',tipTxt:'身份证正面',bgClass:'upic1',},
                                {name: 'IDCardImg_1',imgType:'2',uploadFlag:1, url: '',imgUrlPre:'',tipTxt:'身份证反面',bgClass:'upic2',}
                            ]
                        },
                        '2': {
                            label: '护照',
                            verifyType:'2',
                            userName:'',
                            pagerNo:'',
                            files: [
                                {name: 'passPort_0',imgType:'1', url:'',uploadFlag:0,imgUrlPre:'',tipTxt:'护照信息页',bgClass:'upic4',},
                            ]
                        },
                        '3': {
                            label: '来往大陆通行证',
                            verifyType:'3',
                            userName:'',
                            pagerNo:'',
                            files: [
                                {name: 'HKMCTWPassImg_0',imgType:'1', url:'',uploadFlag:0,imgUrlPre:'',tipTxt:'通行证正面',bgClass:'upic6',},
                                {name: 'HKMCTWPassImg_1',imgType:'2', url:'',uploadFlag:1,imgUrlPre:'',tipTxt:'通行证反面',bgClass:'upic7',},
                            ]
                        }}
                    }
            },
        }
    },
    methods: {
        onGetUserName(){
            this.$emit('GetUserName',[this.CardImgListBase.value[[this.CardImgListBase.actType]].userName,this.partnerInd])
        },
        onGetPagerNo(){

            let IDNoReg =  /\d{17}[\d|x]|\d{15}/
            let passPortReg = /^[a-zA-Z0-9]{5,17}$/
            let verifyType = this.CardImgListBase.actType
            let pagerNo = this.CardImgListBase.value[[this.CardImgListBase.actType]].pagerNo
            if(IDNoReg.test(pagerNo) || passPortReg.test(pagerNo)){
                //console.log('test'+this.CardImgListBase.value[[this.CardImgListBase.actType]].pagerNo)
                this.$emit('GetPagerNo',[pagerNo,this.partnerInd])
            }else{
                if(this.verifyType == '1'){
                    this.regCheck(pagerNo,IDNoReg,'证件号码')
                }else if(this.verifyType == '2'){
                    this.regCheck(pagerNo,passPortReg,'证件号码')
                }
            }
            
        },
        onGetVerifyType(){
            let verifyType = this.CardImgListBase.actType
            console.log('来自组件的VerifyType='+verifyType)
            this.$emit('GetVerifyType',[verifyType,this.partnerInd])
        },
        regCheck(val,valReg,messageTxt){
            if(!valReg.test(val)){
                this.$message({
                    message: '请输入正确的'+messageTxt,
                    type: 'error',
                    duration:1500
                });
            }
        },
        onBeforeUpload(file){
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
            this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isLt5M;
        },        
        onBeforeUpload2(file){
            const isLt3M = file.size / 1024 / 1024 < 3;
            if (!isLt3M) {
            this.$message.error('上传图片大小不能超过 3MB!');
            }
            return isLt3M;
        },
        onProgress(event, file, fileList){
            this.loading=true 
        },
        //图片
        onPartner(index,key){
            this.CardImgKey = key //身份证1 护照2
            this.CardImgNm = index //第几个图片
        },
        onPartnerChangeFile(file, fileList){
            let key = this.CardImgKey
            let ind = this.CardImgNm
            this.CardImgListBase.value[key].files[ind].imgUrlPre = URL.createObjectURL(file.raw)
        },
        onIDError (err) {
            this.loading=false
            this.$message({
                message: '上传失败',
                type: 'error',
                duration:2000
            });
        },
        onPartnerSuccess(response, file, fileList){
            let key = this.CardImgKey
            if(response.respCode==1){
                let ind  = response.uploadFlag 
                this.CardImgListBase.value[key].files[ind].url = response.imgUrl                
                if(ind == 0){
                    this.CardImgListBase.value[[this.CardImgListBase.actType]].userName = response.userName?response.userName:''                    
                    this.CardImgListBase.value[[this.CardImgListBase.actType]].pagerNo = response.identityNo? util.Base64.decode(response.identityNo):''
                    this.onGetUserName()
                    this.onGetPagerNo()
                }
                this.$emit('GetPagerUrl',[this.CardImgListBase, this.partnerInd])
                
            }else{
                this.$message({
                    message: response.respMsg,
                    type: 'error',
                    duration:2000
                });
            }
            this.loading=false
        },
    },
    created(){
        
    }
}
</script>
