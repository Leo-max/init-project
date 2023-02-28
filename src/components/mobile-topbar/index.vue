<style scoped>
  .top-bar{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    position: absolute;
    left: 0 ;
    right: 0;
  }

  .top-bar .item{
    height: 100%;
    flex-grow: 1;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #B5B5B5;
    text-align: center;
  }
  .top-bar .item .text{
    height: 100%;
    display: inline-block;
    line-height: 40px;
  }
  .top-bar .item .text.router-link-active{
    border-bottom: 2px solid #FF6F00;
    color: #3C3C3C;
  }
</style>


<template>
  <ul class="top-bar">
    <li class="item" @click="onClickItem(0)">
      <router-link class="text" :to="{name: 'tixianh5'}">提现</router-link>
    </li>
    <li class="item" @click="onClickItem(1)">
      <router-link class="text" :to="{name: 'recordListh5'}">我的提现</router-link>
    </li>
    <li class="item" @click="onClickItem(2)">
      <router-link class="text" :to="{name: 'safeCenterh5'}">安全中心</router-link>
    </li>
    <li class="item" @click="onClickItem(3)">
      <div class="text">退出</div>
    </li>
  </ul>
</template>

<script>
import store from '@/store'
export default {
  props: {
    current: {
      default: 0
    }
  },

  methods: {
    onClickItem (current) {
      switch (current) {
        case 0:
          this.$router.push({name: 'tixianh5'})
          break
        case 1:
          this.$router.push({name: 'recordListh5'})
          break
        case 2:
          this.$router.push({name: 'safeCenterh5'})
          break
        case 3:
          store.setToken('')
          this.$router.push({name: 'loginh5'})
          break
      }
    }
  }
}
</script>
