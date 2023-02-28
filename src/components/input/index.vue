
<style scoped>
input::-webkit-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #D5D5D5;
    line-height: 30px;
}
input:-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #D5D5D5;
    line-height: 30px;
}
input:-ms-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #D5D5D5;
    line-height: 30px;
}
input::input-placeholder{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #D5D5D5;
    line-height: 30px;
}
</style>

<template>
    <input :type="inputType" v-model="inputVal" @focus="onInpFoucus" @blur="onInpBlur" :placeholder="placeholder" >

</template>
<script>
import common from '@/common'
import api from '@/api'
export default {
    data () {
        return {
            inputVal:'',
            fixedIsShow:true
        }
    },
    props: {
        inputType: {
            default: 'text'
        },
        placeholder:{
            default: ''
        }
    },
    methods: {
        onInpFoucus(e){            
            this.fixedIsShow = false
            let fixedIsShow = this.fixedIsShow
            this.$emit('onInpFoucus',fixedIsShow)
        },
        onInpBlur(e){
            let val = this.inputVal
            this.fixedIsShow = true
            let fixedIsShow = this.fixedIsShow
            this.$emit('onInpBlur',[val,fixedIsShow])
        }
    },
    created () {  
        
    }
}
</script>
