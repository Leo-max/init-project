<style scoped>
  .popup{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow: hidden;
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1100;
    background: white;
    display: flex;
    flex-direction: column;
  }
  .title-panel{
    height: 45px;
    flex-grow: 0;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid #DBDBDB;
  }
  .arrow{
    flex-shrink: 1;
    flex-grow: 0;
    position: relative;
    height: 0px;
    width: 0px;
    border-top: 6px solid transparent;
    border-right: 7px solid #3B3C3F;
    border-bottom: 7px solid transparent;
  }
  .arrow::after{
    content: '';
    position: absolute;
    top: -8px;
    left: 1.5px;
    border-top: 8px solid transparent;
    border-right: 9px solid #fff;
    border-bottom: 9px solid transparent;
  }
  .title{
    flex-grow: 1;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #3C3C3C;
    text-align: center;
  }
  .body-panel{
    flex-grow: 1;
  }
</style>

<template>
  <div class="popup" @click.self="close">
    <div class="container" :style="{'height': height + 'px'}">
      <div class="title-panel">
        <div class="arrow" @click="close"></div>
        <div class="title">{{title}}</div>
        <div class="code" v-if="type == 'code'" @click="onClickCode">{{codeText}}</div>
      </div>
      <div class="body-panel">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      codeText: '',
      timerId: null,
    }
  },
  props: {
    type: {
      default: ''
    },
    height: {
      default: '400'
    },
    title: {
      default: ''
    }
  },

  methods: {
    close () {
      this.$emit('close')
    },

    onClickCode () {
      if (this.timerId) {
        return
      }
      this.init()
    },

    init () {
    }
  },

  created () {
    this.init()
  }
}
</script>
