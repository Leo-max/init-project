<template>
    <div class="param-releation">
        <div v-if="list && list.length > 1" class="relation-flag">
            <div class="flag-line" style="margin-bottom: 5px;"></div>
            <el-button @click="handleRelationChange" size="mini" type="primary" circle style="width: 30px; height: 30px;">{{relationName}}</el-button>
            <div class="flag-line" style="margin-top: 5px;"></div>
        </div>
        <div class="relation-content">
            <div :class="`param-releation-item ${item.children && item.children.length ? 'has-children' : 'has-children'}`" v-for="item in list" :key="item.id">
                <div>
                    <RelationItem :showExtention="item.children && item.children.length" :relationData="item" :level="level"></RelationItem>
                    <div class="param-releation-body" v-if="item.extention">
                        <param-relation :list="item.children" :level="level"></param-relation>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import RelationItem from './relation-item.vue'
    import produce from 'immer'
    export default {
        name: 'param-relation',

        props: {
            level: Number,
            list: []
        },

        components: {
            RelationItem
        },

        computed: {
            relationName () {
                return this.list[0].relation ? '或' : '且'
            }
        },

        methods: {
            handleRelationChange () {
                this.$bus.$emit('onChange', produce(this.list[0], draft => {
                    draft.relation = draft.relation ? 0 : 1
                    return draft
                }))
            }
        }
    }
</script>
<style scoped>
    .param-releation{
        width: 100%;
        display: flex;
        justify-content: center;
      align-content: center;
/*  stretch让盒子内的每个元素的高度都等于行高 */
      align-items: stretch; 

    }
    .param-releation-item{
        width: 100%;
        padding: 5px 0 5px 10px;
    }
    .relation-flag{
        width: 30px;
        margin-right: 10px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .flag-line{
        width: 0;
        border-left: 2px dashed #5d78ff;
        flex-grow: 1;
    }
    .relation-content{
        flex-grow: 1;
    }
    .has-children{
        padding-right: 20px;
        margin-bottom: 20px;
        border: 1px solid #eee;
    }
    .param-releation-item:last-child{
        margin-bottom: 0;
    }
    
    .param-releation-body{

    }
</style>
