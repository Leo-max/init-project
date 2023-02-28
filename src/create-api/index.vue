<template>
  <div class="container">
    <LastPage :title="`创建API`" urlPath="/my-api" />
    <div class="steps-contaion">
      <div class="steps-control">
        <el-steps class="cus-steps" :space="300" :active="current" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="请求参数"></el-step>
          <el-step title="测试"></el-step>
        </el-steps>
      </div>
      <div class="form-info">
        <stepsInfo v-if="current === 0" :list="formData"/>
        <stepsParams v-if="current === 1" :list="formData"/>
        <stepsTest v-if="current === 2" />
      </div>
      <div class="steps-action">
        <el-button v-if="current === 0" type="primary" @click="next">
          下一步
        </el-button>
        <el-button v-if="current>0" style="margin-left: 8px" @click="prev">
          上一步
        </el-button>
        <el-button v-if="current === 1" class="toNextSave" type="primary" @click="next">
          保存配置进入测试页面
        </el-button>
        <el-button
          v-if="current === 2"
          type="primary"
          @click="$message.success('Processing complete!')"
        >
          完成
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import stepsInfo from './components/steps-info.vue';
import stepsParams from './components/steps-params.vue';
import stepsTest from './components/steps-test.vue'
export default {
  data () {
    return {
      current: 0,
      formData: {},
    }
  },
  components: {
    stepsInfo,
    stepsParams,
    stepsTest
  },
  methods: {
    next() {
      this.current++
    },
    prev() {
      this.current--;
    },
  },
  created() {
    this.formData = store.getState('form')
    console.log('store', store.getState('form'))
  }
}
</script>

<style lang="less" scope>
.toNextSave {
  width: 160px;
}
.steps-contaion {
  padding: 30px 40px;
  // background: red;
  .steps-control {
    // background: yellow;
    width: 62%;
    margin: auto;
    // margin-left: 30px;
    .cus-steps .el-step .el-step__main {
      position: absolute;
      left: 26px;
      top: 6px;
      height: 28px;
      line-height: 28px;
      background-color: #fff;
      padding: 0 10px 0 16px;
    }
    .cus-steps .el-step .el-step__title {
      line-height: 26px;
    }
    .cus-steps .el-step__title.is-process {
      font-weight: 500;
    }
    .cus-steps .el-step:last-of-type.is-flex {
      flex-basis: 120px!important;
    }
    .cus-steps .el-step__head {
      width: 96%;
    }
    .cus-steps .el-step__icon.is-text {
      width: 40px;
      height: 40px;
    }
    .cus-steps .el-step.is-horizontal .el-step__line {
      top: 20px;
    }
    .cus-steps .el-step__head.is-process {
      border-color: #5867dd;
    }
    .cus-steps .el-step__head.is-process .el-step__icon.is-text {
      color: #fff;
      background-color: #5867dd;
    }
  }
  .form-info {
    width: 96%;
    background: #fff;
    margin: auto;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow:0px 0px 10px #e2dbdb;
  }
  .steps-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>
