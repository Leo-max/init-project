
<style scoped>
.go-pc-cont{
    padding-top: 90px;
    text-align: center;
    width: 100%;
    overflow: hidden;
}
.go-pc-cont img{
    width: 170px;
    margin-bottom: 50px;
}
.go-pc-cont .txt1{
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #747474;
    line-height: 21px;
    margin-bottom: 18px;
    padding: 0 10px;
}
.go-pc-cont .txt2{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #FF6F00;
}
</style>

<template>
    <div class="go-pc-box" v-if="goPcIsShow">
        <div class="go-pc-cont">
            <img :src="img"/>
            <p class="txt1">{{content1}}</p>
            <p class="txt1">{{content2}}</p>
            <p class="txt2">
                <a class="cFF6F00">
                    http://www.camelfin.com/index1.html
                </a>
            </p>
        </div>
    </div>

</template>
<script>
import common from '@/common'
import api from '@/api'
export default {
    data () {
        return {
            
        }
    },
    props: {
        goPcIsShow: {
            default: false
        },
        img:{
            default: './static/images/computerich5.png'
        },
        content1:{

        },
        content2:{
            default: '请登录骆驼金服官网重置登录密码'
        },
        
    },
    methods: {
        
    },
    created () {  
        
    }
}
</script>
