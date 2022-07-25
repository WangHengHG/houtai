<template>
    <div>
        <!-- 三级联动
        inline: 代表的是行内表单: 一行可以放置多个表单元素
        -->
        <el-card style="margin:20px 0px">
            <el-form :inline="true" class="demo-form-inline" :model="cForm">
                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
                        <el-option :label="c1.name" :value="c1.id" v-for="(c1, index) in list1" :key="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2">
                        <el-option :label="c2.name" :value="c2.id" v-for="(c2, index) in list2" :key="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select placeholder="请选择" v-model="cForm.category3Id">
                        <el-option :label="c3.name" :value="c3.id" v-for="(c3, index) in list3" :key="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'CategorySelect',
        data(){
            return{
                //一级分类的数据
                list1: [],
                list2: [],
                list3: [],
                //收集相应的一级, 二级, 三级分类的ID
                cForm: {
                    category1Id: '',
                    category2Id: '',
                    category3Id: ''
                }
            }
        },
        //当组件挂载完毕: 向服务器发请求, 获取相应的一级分类的数据
        mounted(){
            //获取一级分类的数据
            this.getCategory1List();
        },
        methods: {
            //获取一级分类数据的方法
            async getCategory1List(){
                let result = await this.$API.attr.reqCategorySelect1List(1);
                if(result.code == 200) {
                    this.list1 = result.data
                }
            },
            //1级分类的select的事件的回调(当一级分类的option发生变化的时候, 获取相应二级分类的数据)
            async handler1(){
                //解构出一级分类的ID
                const {category1Id} = this.cForm
                let result = await this.$API.attr.reqCategorySelect2List(category1Id);
                if(result.code == 200) {
                    this.list2 = result.data
                }
            },
            //2级分类的select的事件的回调(当二级分类的option发生变化的时候, 获取相应三级分类的数据)
            async handler2(){
                //解构出一级分类的ID
                const {category2Id} = this.cForm
                let result = await this.$API.attr.reqCategorySelect3List(category2Id);
                if(result.code == 200) {
                    this.list3 = result.data
                }
            }
        }
    }
</script>

<style scoped>

</style>