<style scoped>
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
  .mask embed{
    width: 70%;
    height: 100%;
    margin-left: 15%;
  }
</style>

<template>
  <div class="mask" @click="onClosePdf">
    <embed :src="url"/>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      default: ''
    }
  },

  methods: {
    onClosePdf () {
      this.$emit('closePdf')
    }
  }
}
</script>
