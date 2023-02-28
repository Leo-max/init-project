<template>
    <div>
        <div class="opt">
            <el-input placeholder="请输入层级" v-model="level"></el-input>
            <el-button @click="handleOpen">打开</el-button>
        </div>
        <el-dialog title="参数关系配置" :visible="showDialog" :before-close="handleClose" :close-on-click-modal="false">
            <div class="dialog-content">
                <ParamRelation :list="paramData" :level="level" @onChange="onRelationChange">test</ParamRelation>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSave">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ParamRelation from '@/components/param-relation'

    export default{

        data () {
            return {
                level: 2,
                showDialog: false,
                paramData: [],
            }
        },

        components: {
            ParamRelation
        },

        methods: {
            handleOpen () {
                this.showDialog = true
            },

            handleClose () {
                this.showDialog = false
            },

            handleSave () {
                localStorage.setItem('relationData', this.paramData)
                this.showDialog = false
            },

            onRelationChange (list) {
                console.log('change!!!!!!!!!!')
                console.log(list)
                this.paramData = list
            }
        },

        created () {
            let data = localStorage.getItem('relationData')
            this.paramData = data ? JSON.parse(data) : []
        }
    }
</script>

<style scoped>
    .dialog-content{
        height: 400px;
        overflow: auto;
    }
    .opt{
        width: 400px;
        display: flex;
        align-items: center;
    }
</style>