<style scoped>
  .input-content{
    width: 1px;
    height: 1px;
  }
  .grids{
    height: 50px;
    border: 1.5px solid #C7C7C7;
    display: flex;
  }
  .grids .grid{
    width: 48.5px;
    height: 47px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ddd;
    font-family: PingFangSC-Regular;
    font-size: 25px;
    color: #3C3C3C;
    text-align: left;
  }
</style>

<template>
  <div class="">
    <input id="input-content" type="number" class="input-content" autofocus="autofocus" v-model="value" @input="onInputChange"/>
    <label for="input-content">
      <ul class="grids" :style="'width: ' + width + 'px'">
        <li v-for="grid in grids" :class="'grid grid' + grid" :key="grid">{{content[grid-1] ? mask ? '*' : content[grid-1] : ''}}</li>
      </ul>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: [],
      width: '',
      value: '',
    }
  },
  
  props: {
    grids: {
      default: 6
    },
    mask: {
      default: true
    }
  },

  methods: {
    onInputChange (e) {
      if (this.value.length > this.grids) {
        this.value = this.value.substring(0, this.grids)
        return
      }
      this.content = this.value.split('')
      if (this.value.length == this.grids) {
        console.log('********send finish')
        this.$emit('finish', this.value)
      }
      this.$emit('change', this.value)
    }
  },

  created () {
    this.width = this.grids * 50 - this.grids
  }
}
</script>
