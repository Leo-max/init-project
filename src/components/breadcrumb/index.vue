<style scoped>
  .menu-panel {
    height: 44px;
    padding: 12px 20px 12px 17px;
    border-radius: 100px;
    font-size: 14px !important;
    background: #FFFFFF;
    box-shadow: 0 0 9px 0 rgba(0,0,0,0.06);
    border-radius: 100px;
  }
</style>

<template>
  <div class="menu-panel">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index)  in links" :class="index == links.length-1 ? 'bold' : ''" :key="item.path" :to="item.meta && item.meta.breadcrumb ? item.meta.breadcrumb : item.path+item.params">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      links: [],
    }
  },

  props: {

  },

  methods: {
    getCurrentPathArr () {
      let result = []
      let arr = this.$route.fullPath.split('/')
      let route = ''
      arr.map( (item, i) => {
        if(!item) return
        let obj = {}
        let index = arr[i].indexOf('?')
        if(index != -1){
          obj.params = arr[i].substr(index)
          arr[i] = arr[i].substr(0, index)
        } else {
          obj.params = ''
        }
        route += '/' + arr[i]
        obj.name = route
        result.push(obj)
      })
      return result
    },
  },

  created () { 
    let pathArr = this.getCurrentPathArr()
    let routes = this.$router.options.routes
    console.log('****')
    pathArr.map( path => {
      for (let i = 0; i < routes.length; i++) {
        if (path.name == routes[i].path) {
          routes[i].params = path.params
          console.log(routes[i])
          this.links.push(routes[i])
        }
      }
    })
  },
}
</script>
