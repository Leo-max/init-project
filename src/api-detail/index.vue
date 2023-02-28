<template>
  <div class="container">
    <LastPage :title="`API详情`" urlPath="/my-api" />
    <div class="detail-container">
      <div class="detail-left">
        <div class="detail-desc">
          <div class="detail-box">
            <div class="detail-info">
              <img src="@/assets/images/detail-img.png" alt="">
              <span class="info-content">
                <h2>客户信息接口</h2>
                <span>编号: 101001</span>
              </span>
            </div>
            <!-- <p>下载示例代码</p> -->
          </div>
        </div>
        <div class="vision-info">
          <div class="vision-content">
            <div class="vision-action">
              <span class="vision-change">版本选择</span>
              <el-select v-model="value" placeholder="请选择" size="medium">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-tabs class="table-info" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first">
                <p class="form-title p-before">API接口详情</p>
                <p class="api-info">
                  调用地址
                  <span>/car/get_info</span>
                </p>
                <p class="api-info">
                  请求协议
                  <span>HTTP</span>
                </p>
                <p class="api-info">
                  请求方式
                  <span>GET</span>
                </p>
                <p class="api-info">
                  返回方法
                  <span>JSON</span>
                </p>
              </el-tab-pane>
              <el-tab-pane label="参数详情" name="second">
                <div class="request-info">
                  <p class="request-title">请求参数</p>
                  <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="参数名">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="参数类型">
                    </el-table-column>
                    <el-table-column
                      prop="istrue"
                      label="是否必传">
                      <template slot-scope="scope">
                          <el-radio v-model="scope.row.istrue" :label="true" disabled>{{''}}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="operator"
                      label="运算符">
                    </el-table-column>
                    <el-table-column
                      prop="scope"
                      label="scope字段">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="response-info">
                  <p class="response-title">返回参数</p>
                  <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="date"
                      label="参数名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

      </div>
      <div class="detail-right">
        <div class="detail-content">
          <div class="tag-right-info">
            <div class="tag-title">
              <h3>22</h3>
              <span>调用次数</span>
            </div>
            <div>
              <p>
                <span>发布人</span>
                <span>张某</span>
              </p>
              <p>
                <span>发布时间</span>
                <span>2022/12/13</span>
              </p>
            </div>
            <div style="margin-top:15px;">
              <p>技术负责人</p>
              <p v-for="item in persionArry" :key="item.name" class="info-item">
                <span>
                  <i class="iconfont icon-yonghu"></i>
                  <span>{{ item.name }}</span>
                </span>
                <span>
                  <i class="iconfont icon-shouji4"></i>
                  <span>{{ item.phone }}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="tag-doc">
            <p>补充说明</p>
            <p>数据房源补充文档说明.word
              <i class="el-icon-download"></i>
            </p>
            <p>安居客合适的把空间上的卡号是啊啊
              <i class="el-icon-download"></i>
            </p>
            <p>建安公司对接和嘎世界很多国家安徽省给
              <i class="el-icon-download"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persionArry: [
        {
          name: '张三',
          phone: '123456789'
        },
        {
          name: '李四',
          phone: '987654321',
        }
      ],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
      activeName: 'second',
      tableData: [{
        name: 'cust_no',
        type: 'string',
        istrue: true,
        operator: 'equal',
        scope: '1'
      },
      {
        name: 'cust_no',
        type: 'string',
        istrue: true,
        operator: 'equal',
        scope: '1'
      },
      {
        name: 'cust_no',
        type: 'string',
        istrue: true,
        operator: 'equal',
        scope: '1'
      },
      {
        name: 'cust_no',
        type: 'string',
        istrue: false,
        operator: 'equal',
        scope: '1'
      },
      {
        name: 'cust_no',
        type: 'string',
        istrue: false,
        operator: 'equal',
        scope: '1'
      }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="less" scope>
.container {
  .detail-container {
    display: flex;
    .detail-left {
      width: 80%;
    }
    .detail-right {
      color: rgb(142, 141, 141);
      width: 20%;
      margin-right: 18px;
      .detail-content {
        margin: 10px;
        box-shadow: 0px 0px 2px rgb(218, 215, 215);
        background: #fff;
        border-radius: 10px;
        padding: 10px 0;
        .tag-right-info, .tag-doc {
          padding: 10px;
          // margin-bottom: 20px;
          .tag-title {
            padding-bottom: 20px;
            h3 {
              color: #5867dd;
              margin-left: 10px;
            }
            span {
              padding-top: 10px;
            }
          }
          div p {
            padding: 5px 0;
            margin-right: 10px;
            span {
              margin-right: 10px;
            }
          }
          div:last-child {
            padding-bottom: 10px;
            border-bottom: 1px solid rgb(218, 215, 215);
          }
        }
        .tag-doc {
          p {
            cursor: pointer;
            padding: 5px;
            // background: rgb(249, 247, 247);
            border-radius: 10px;
            text-decoration: underline;
            margin: 5px 0;
            i {
              float: right;
            }
          }
          p:hover {
            background: rgb(249, 247, 247);
          }
          p:first-child {
            cursor: none;
            padding-top: 0px;
            background: none;
            border-radius: none;
            text-decoration: none;
            margin: none;
          }
        }
      }
    }
  }
  .detail-desc, .vision-info, .baseic-info {
    margin: auto;
    padding: 10px 20px;
    .detail-box {
      // width: 100%;
      height: 109px;
      box-shadow: 0px 0px 2px rgb(218, 215, 215);
      background: #fff;
      border-radius: 10px;
      padding: 20px 20px;
      .detail-info {
        display: flex;
        img {
          width: 68px;
          height: 68px;
        }
        .info-content {
          padding: 0 10px;
        }
        h2 {
          padding-bottom: 26px;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //2行
          -webkit-box-orient: vertical;
        }
      }
      p {
        cursor: pointer;
        flex-basis:100%;
        padding: 10px 0;
        text-decoration: underline;
        color: #1F71FF;
      }
    }
  }
  .vision-info .vision-content {
    box-shadow: 0px 0px 2px rgb(218, 215, 215);
    background: #fff;
    border-radius: 10px;
    padding: 20px 20px;
    .vision-action {
      padding: 10px 0;
      .vision-change {
        font-size: 14px;
        margin-right: 10px;
      }
    }
    .request-info, .response-info {
      border: 1px solid #faf7f7;
      background: #faf7f7;
      border-radius: 10px;
      .request-title, .response-title {
        color: #656565;
        padding: 6px 10px;
        font-size: 14px;
      }
    }
    .response-info {
      margin-top: 20px;
    }
    .p-before {
      color: rgb(142, 141, 141);
      padding: 5px 0;
      margin-bottom: 10px;
      border-bottom: 1px solid #d9d9d9;
    }
    .api-info {
      color: rgb(142, 141, 141);
      padding: 5px 0;
      span {
        color: rgb(109, 107, 107);
      }
    }
  }
}
</style>
