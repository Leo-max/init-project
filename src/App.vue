<template>
  <div id="app">
      <div class="app-container">
        <router-view class="top-bar" name="top-bar"></router-view>
        <router-view name="nav"></router-view>
        <router-view name="mobile-top-bar"></router-view>
        <router-view name="main" class="main"/>
        <keep-alive>
          <router-view name="retain" class="main"/>
        </keep-alive>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            topShow: true,
            navShow:true,
            optionShow:true
        }
    },
  name: 'App',
  methods:{

  }
}
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    
    /* min-height: 100%; */
    /* overflow-y: auto;
    overflow-x: hidden; */
}
/* .el-scrollbar__wrap {
   overflow-x: hidden;
} */
.app-container{
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fafafa;
}
.app-container .login-top-bar{
  height: 60px;
  flex-grow: 0;
  flex-shrink: 1;
  background: transparent;
}
.app-container .top-bar{
  height: 60px;
  flex-grow: 0;
  flex-shrink: 1;
  background: transparent;
}
.app-container .nav{
  height: 78px;
  flex-grow: 0;
  flex-shrink: 1;
}
.app-container .main{
  flex-grow: 1;
}
</style>
