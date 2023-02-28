<style scoped>
 .layer-cont{
    padding: 0 70px;
    background: rgba(255, 255, 255, 1)
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
 .layer-cont-btns button.stress{
     color: #fff;
}
.txts-box{
    padding-top: 25px;
    padding-bottom: 23px;
    text-align: left;
}
</style>

<template>
    <div class="layer agree-page">
        <div class="layer-cont">
                <p class="layer-title">信风服务协议</p>
                <div class="txts-box">
                    <p class="mb25" >
                        在使用骆驼金服信风全球收款服务（“收款服务”）之前，<b> 请您（“用户”“客户”、“商户”、“您/您们”）务必认真、仔细阅读本
                            <router-link class="cFF6F00" target="_blank" :to="{name: 'globalagreement'}">《骆驼金服信风全球收款服务协议》</router-link> ，
                        并确保您充分理解其中各条款。</b>如您对上述协议中内容有任何疑问，您可向平台客服咨询，电话【400-700-2018】。
                    </p>
                    <p>
                        <b> 您确认、提交或以任何方式使用收款服务的行为，视为您已充分阅读、理解并接受上述协议的全部内容，并同意接受上述协议各项条款的约束。</b>如果您不同意上述协议或其中任何条款的约定，请您立即停止登录或使用收款服务。
                    </p>
                </div>
                
                <div class="layer-cont-btns">
                    <button class="weak" @click="onCancle">取消</button>
                    <button class="stress" @click="onNext">同意并继续</button>
                </div>
        </div>
        <!-- <el-button class="status-btn" v-if="btnText" @click="onClickStatusBtn">{{btnText}}</el-button>     -->
    </div>
</template>

<script>
export default {
    props:{
        
    },
    methods: {
        onCancle(e){
            this.$emit('cancle')
        },
        onNext(e){
            this.$emit('next')
        },
        onClickStatusBtn (e) {
        this.$emit('submit')
        }
    }
}
</script>
