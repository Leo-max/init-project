<style scoped>
  .index-container{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  .nav-left{
    height: 100%;
    background: #1f2231;
    flex-grow: 0;
    flex-shrink: 1;
    transition: width 0.5s;
  }
  .nav-left.nav-left-expand{
    width: 260px;
    /* min-width: 260px;
    flex-basis: 260px; */
  }
  .nav-left.nav-left-narrow{
    width: 78px;
    /* min-width: 78px;
    flex-basis: 78px; */
  }
  .nav-left .nav-left-title{
    height: 75px;
    background: #242939;
    padding: 0 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-left .menu{
    width: 100%;
    background: #1f2231;
    margin-top: 25px;
    padding-left: 5px;
  }
  .nav-left .menu .el-menu{
    border: 0;
  }
  .nav-left .menu .el-menu .menu-icon{
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .logo-none{
    width: 0;
  }
  .nav-left .nav-left-title .shrink{
    width: 26px;
    height: 26px;
    color: #ddd;
    font-size: 26px;
    cursor: pointer;
  }
  .nav-left .nav-left-title .shrink:hover{
    width: 28px;
    height: 28px;
    font-size: 28px;
    color: white;
  }
  .content-right{
    flex-grow: 1;
    position: relative;
    overflow: auto;
  }
  .content-right .nav-top{
    height: 75px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 0px 40px 0px rgba(82, 63, 105, 0.1);
    box-shadow: 0px 0px 40px 0px rgba(82, 63, 105, 0.1);
  }
  .content-right .content{
    /* position: absolute;
    top: 75px;
    left: 0;
    right: 0;
    bottom: 0; */
    overflow: auto;
    /* background: #f9f9fc; */
  }
  .welcome{
    margin-top: 15px;
    float: right;
    margin-right: 50px;
    font-size: 14px;
  }
</style>

<template>
  <div class="index-container">
    <div class="nav-left" :class="{'nav-left-expand': expand, 'nav-left-narrow': !expand}">
      <div class="nav-left-title">
        <img class="logo" :class="{'logo-none': !expand}" src="@static/images/logo-keen.png"/>
        <i class="shrink" :class="{'el-icon-d-arrow-left': expand, 'el-icon-d-arrow-right': !expand}" @click="onClickShrink"></i>
      </div>
      <div class="menu">
        <el-menu
          :default-active="defaultMenu"
          background-color="#1f2231"
          text-color="#989eb3"
          active-text-color="#ffffff"
          :collapse-transition="true"
          :collapse="!expand">
          <el-submenu v-for="(item,key) in menuMap" :key="key" :index="key" v-if="item.children">
            <template slot="title">
              <i class="menu-icon fa" :class=item.icon></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="(sub, subKey) in item.children" :key="subKey" :index="subKey" @click="intoPage(sub.url)">
              <template slot="title">
                <i class="menu-icon fa" :class=sub.icon></i>
                <span slot="title">{{sub.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :key="key" :index="key" @click="intoPage(item.url)" v-else>
            <i class="menu-icon fa" :class=item.icon></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="welcome">
          <el-select v-model="welcome" @change="onChangeSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label + (item.value == 'name' ? phone : '')"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <router-view name="content" class="content" :key="menuClickCount"></router-view>
    </div>
  </div>
</template>

<script>
import common from '@/common'
import store from '@/store'
export default {

  data () {
    return {
      expand: true,
      resourceList: [],
      menuMap: {
        'my-api': {name: '我的API', url: 'my-api', icon: 'fa-file-o'},
        'goods': {name: '我的服务', url: 'goods', icon: 'fa-file-o'},
        'tixian': {name: 'API监控', url: 'tixian', icon: 'fa-reorder'},
        'user': {name: '系统管理', url: 'user', icon: 'fa-user'},
        // 'upload': {name: '上传产品', url: 'sql', icon: 'fa-user'},
      },
      resourceMap: common.resourceMap,
      defaultMenu: 'my-api',
      defaultUrl: '',
      user: {},
      phone: '',
      welcome: 'name',
      options:[
        {
          value: 'name',
          label: 'hi, '
        },
        {
          value: 'exit',
          label: '退出'
        }
      ],
      menuClickCount: 0,
    }
  },

  methods: {

    onChangeSelect () {
      if (this.welcome == 'exit') {
        store.setPhone('')
        this.$router.push({name: 'login'})
      }
    },

    onClickShrink () {
      this.expand = !this.expand
      this.$bus.$emit('resize')
    },

    intoPage (name) {
      if (this.$route.name == name) {
        this.menuClickCount++
      } else {
        this.$router.push({'name': name})
      }
    }
  },

  created () {
    let router = this.$route.name
    this.user = store.getUser() || {}
    this.phone = store.getPhone()
    if (this.phone) {
      this.$router.push({name: 'order'})
    }
    // if (this.user) {
    //   this.$api.getUserResource({'userId': this.user.id})
    //     .then(
    //       res => {
    //         if (res.ack) {
    //           this.resourceList = res.returnContent
    //           this.resourceList.map(
    //             (item, i) => {
    //               if (!this.defaultMenu && item.url){
    //                 this.defaultMenu = item.code
    //                 this.defaultUrl = item.url
    //               }
    //               if (item.url == router) {
    //                 this.defaultMenu = item.code
    //                 this.defaultUrl = item.url
    //               }
    //               // 设置权限
    //               if (item.operationButton) {
    //                 let resources = item.operationButton.split(',')
    //                 resources.map(
    //                   resource => {
    //                     if (this.resourceMap[resource]) {
    //                       this.resourceMap[resource].show = true
    //                     }
    //                   }
    //                 )
    //               }
    //               // 设置menu
    //               if (item.parentId) {
    //                 let parent = this.menuMap[item.parentId]
    //                 if (!parent) return
    //                 if (!parent.children) parent.children = {}
    //                 parent.children[item.code] = item
    //               } else {
    //                 this.menuMap[item.code] = item
    //               }
    //             }
    //           )
    //           if (this.defaultMenu) {
    //             console.log(this.defaultMenu)
    //             console.log(this.defaultUrl)
    //             this.$router.push({name: this.defaultUrl})
    //           }
    //           console.log(this.menuMap)
    //         }
    //       }
    //     )
    // }
  }
}
</script>
