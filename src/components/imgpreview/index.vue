<style scoped>
.imgpreview{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;    
    z-index: 1000;
    text-align: center;
}
.imgpreview-box{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.imgpreview-box .box{
    width: 90%;
    height: 90%;
    position: relative;
}

.imgpreview img{
    max-height: 100%;
    max-width: 100%;
    opacity: 0;
    position: absolute;
    transition: transform 0.5s ease-out, opacity 0.5s;
}

.imgpreview img.active{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}

.imgpreview img.from-left{
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%) scale(0.2);
}

.imgpreview img.from-right{
    top: 50%;
    right: 0;
    transform: translate(100%, -50%) scale(0.2);
}

.imgpreview img.to-left{
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%) scale(0.2);
}

.imgpreview img.to-right{
    top: 50%;
    right: 0;
    transform: translate(100%, -50%) scale(0.2);
}

.pre,.next{
    position: absolute;
    top: 50%;
    margin-top: -20px;
    z-index: 1200;
}
.pre {
    left: 50px;
}
.next{
    right: 50px;
}
.el-icon-arrow-left,.el-icon-arrow-right{
    color: white;
    font-size: 30px;
    cursor: pointer;
    z-index: 1050;
    background: rgba(0, 0, 0, .1)
}
</style>

<template>
  <div class="imgpreview">
      <div class="imgpreview-box" @click="close" >
          <div class="pre" @click.stop.prevent="pre" @mousedown.stop.prevent="preDown" @mouseup.stop.prevent="preUp" v-show="preNextIsShow"><i class="el-icon-arrow-left"></i></div>
          <div class="box">
            <img v-for="(img, i) in imgUrls" :class="{active: i==curs, 
                'from-right': i==(curs+1)%imgUrls.length, 
                'from-left': i== (curs==0 ? imgUrls.length-1 : curs-1),
                'to-left': i==(curs==0 ? imgUrls.length-1 :curs-1),
                'to-right': i==(curs+1)%imgUrls.length}" :key="i" :src="img" />
          </div>
          <div class="next" @click.stop.prevent="next" @mousedown.stop.prevent="nextDown" @mouseup.stop.prevent="nextUp" v-show="preNextIsShow"><i class="el-icon-arrow-right"></i></div>
      </div>
  </div>

</template>
<script>

export default {
    data () {
        return {
            preNextIsShow:true,
            curs:0,
            nextUpFlag: false,
            nextDownFlag: false,
            preUpFlag: false,
            preDownFlag: false,
            direction: 'default'    // from-right, from-top, from-left, from-bottom  分别表示按了左、右、上、下按钮,代表了图片即将从哪个方向飞入
        }
    },

    props: {
        current: {
            type: Number,
            default: 0
        },
        previewIsShow:Boolean,
        imgUrls:{
            type: Array,
            require: true
        }
    },

    methods: {
        close(){
            this.$emit('closePreview')
        },
        next(){
            this.curs = (++this.curs) % this.imgUrls.length;
        },
        nextDown () {
            this.preDownFlag = false
            this.nextDownFlag = true
            this.preUpFlag = false
            this.nextUpFlag = false
        },
        nextUp () {
            this.preDownFlag = false
            this.nextDownFlag = false
            this.preUpFlag = false
            this.nextUpFlag = true
        },
        preDown () {
            this.preDownFlag = true
            this.nextDownFlag = false
            this.preUpFlag = false
            this.nextUpFlag = false
        },
        preUp () {
            this.preDownFlag = false
            this.nextDownFlag = false
            this.preUpFlag = true
            this.nextUpFlag = false
        },
        pre(){
            this.curs = ( this.curs == 0 ? this.imgUrls.length-1 : ((--this.curs) % this.imgUrls.length) );
        }
    },
    created () {    
        if(this.imgUrls.length<=1){
            this.preNextIsShow = false
        }else{
            this.preNextIsShow = true
        }
        this.curs = this.current
    },
}
</script>
