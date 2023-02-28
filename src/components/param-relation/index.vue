<template>
    <div>
        <relation-container :list="relationList" :level="level"></relation-container>
    </div>
</template>
<script>
    import RelationContainer from './relation-container.vue'
    import produce from 'immer'
    const ID_SPERATOR_CHAR = '_'
    const TITLE_SPERATOR_CHAR = '-'
    const DEFAULT_NAME = '参数'
    const DEFAULT_DATA = {
        id: '0',
        title: '',
        level: 0,
        extention: 1,   // 1：展开状态，0：收起状态, 控制当前层级的
        relation: 0,    // 1：与，0：控制子级的
        children: []
    }
    export default {
        props: {
            level: Number,// 最大层级
            list: []
        },

        components: {
            RelationContainer
        },

        data () {
            return {
                relationList: [
                    {
                        ...DEFAULT_DATA,
                        children: this.list
                    }
                ]
            }
        },

        watch: {
            list (newData) {
                this.relationList = [
                    {
                        ...DEFAULT_DATA,
                        children: newData
                    }
                ]
            }
        },

        methods: {
            handleChange (value) {
                let list = produce(this.relationList, draft => {
                    let result = this.findItem(draft, value)
                    result.title = value.title
                    result.extention = value.extention
                    result.relation = value.relation
                    return draft
                })
                this.$emit('onChange', list[0].children)
            },

            handleAdd (value) {
                let list = produce(this.relationList, draft => {
                    let result = this.findItem(draft, value)
                    console.log(result)
                    if (!result.children) {
                        result.children = []
                    }
                    let length = result.children.length
                    result.children = [...result.children, {
                        id: Math.random(), //`${value.id}${ID_SPERATOR_CHAR}${length}`,
                        parentId: value.id,
                        title: `${value.title ? value.title + TITLE_SPERATOR_CHAR : DEFAULT_NAME}${length + 1}`,
                        level: value.level + 1,
                        extention: 1
                    }]
                })
                this.$emit('onChange', list[0].children)
            },

            handleDelete (value) {
                let list = produce(this.relationList, draft => {
                    this.deleteItem(draft, value)
                })
                this.$emit('onChange', list[0].children)
            },

            findItem (arr, value) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === value.id) {
                        return arr[i]
                    }
                    if (arr[i].children && arr[i].children.length) {
                        let result = this.findItem(arr[i].children, value)
                        if (result) {
                            return result
                        }
                    }
                }
            },

            deleteItem (arr, value) {
                if (!value.parentId) {
                    arr[0].children = []
                    return;
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === value.parentId) {
                        let index = arr[i].children.findIndex(item => item.id === value.id)
                        arr[i].children.splice(index, 1)
                        return
                    }
                    if (arr[i].children && arr[i].children.length) {
                        this.deleteItem(arr[i].children, value)
                    }
                }
            }
        },

        mounted () {
            this.$bus.$on('onChange', relationData => {
                this.handleChange(relationData)
            })
            this.$bus.$on('onAdd', relationData => {
                this.handleAdd(relationData)
            })
            this.$bus.$on('onDelete', relationData => {
                this.handleDelete(relationData)
            })
        }
    }
</script>
