<template>
    <div class="param-releation-header">
        <div class="header-left" v-if="relationData.title">
            <div class="extention">
                <img v-if="showExtention" @click="onChangeExtention" :class="`extention-icon ${relationData.extention ? '' : 'extention-rotate'}`" src="@/assets/images/api/extention.png" />
            </div>
            <div class="header-title">
                <el-input :value="relationData.title" @input="onChangeTitle" style="height: 32px;" size="small"></el-input>
            </div>
        </div>
        <div class="header-right">
            <el-button @click="handleAdd" type="primary" style="width: 65px" v-if="!level || relationData.level < level">添加</el-button>
            <el-button @click="handleDelete" style="width: 65px">删除</el-button>
        </div>
    </div>
</template>

<script>
    import produce from 'immer'
    export default {
        props: {
            showExtention: false,
            level: Number,// 最大层级
            relationData: {
                id: '',
                parentId: '',
                title: '',
                extention: 0,   // 1：展开状态，0：收起状态
            }
        },

        methods: {
            onChangeTitle (value) {
                this.$bus.$emit('onChange', produce(this.relationData, draft => {
                    draft.title = value
                    return draft
                }))
            },

            onChangeExtention () {
                this.$bus.$emit('onChange', produce(this.relationData, draft => {
                    draft.extention = draft.extention ? 0 : 1
                    return draft
                }))
            },

            handleAdd () {
                this.$bus.$emit('onAdd', this.relationData)
            },

            handleDelete () {
                this.$bus.$emit('onDelete', this.relationData)
            }
        }
    }
</script>

<style scoped>
    .param-releation-header{
        width: 100%;
        height: 50px;
        margin-bottom: 10px;
        display: flex;
        overflow: hidden;
        justify-content: flex-end;
        align-items: center;
    }
    .header-left{
        flex-grow: 1;
        display: flex;
        overflow: hidden;
        align-items: center;
    }
    .extention{
        margin-left: 5px;
    }
    .extention-icon{
        width: 18px;
        height: 18px;
        cursor: pointer;
        transform: rotate(0);
        transition: all .5s;
    }
    .extention-rotate{
        transform: rotate(-90deg);
    }
    .header-title{
        max-width: 150px;
    }
    .header-right{
        margin-left: 20px;
        flex-shrink: 0;
    }
</style>
