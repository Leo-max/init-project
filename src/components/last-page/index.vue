<template>
  <section :class="border ? 'last-page-warp border-bot' : 'last-page-warp'">
      <span class="title-content">
          <i class="el-icon-back" @click="goLast"></i>
          <span v-if="title">{{title}}</span>
          <span v-else>返回上一页</span>
      </span>
      <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'index',
  props: {
      title: String,
      urlPath: String,
      border: Boolean
  },
  methods: {
      goLast() {
          if (this.urlPath === '-1') {
              this.$emit('goLink')
              return
          }
          if (this.urlPath) {
              this.$router.push({ path: this.urlPath })
              return
          }
          this.$router.go(-1)
      }
  }
}
</script>

<style scoped>
  .last-page-warp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;
      line-height: 45px;
      padding: 0 16px;
      background: #fff;
  }
  .last-page-warp ,.border-bot {
    /* border-bottom: 1px solid #e9e9e9; */
  }
  .last-page-warp ,.border-bot .title-content {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;

  }
  .last-page-warp ,.border-bot .title-content .last-icon {
    font-size: 18px;
    /* color: #1f71ff; */
    cursor: pointer;
  }
  .last-page-warp ,.border-bot .title-content .last-icon span {
    margin-left: 10px;
  }
</style>
