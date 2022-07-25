<template lang="">
    <div>
        <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        <el-card>
            <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
            <el-table
                :data="attrList"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="80"
                align="center">
                </el-table-column>
                <el-table-column
                prop="attrName"
                label="属性名称"
                width="150">
                </el-table-column>
                <el-table-column
                prop="address"
                label="属性值列表">
                    <template slot-scope="{row, $index}">
                        <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" style="margin:0 20px">{{attrValue.valueName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="操作"
                width="150">
                <template solt-scope="{row, $index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "Attr",
    data() {
        return {
            category1Id: "",
            category2Id: "",
            category3Id: "",
            attrList: [],
        };
    },
    methods: {
        //自定义事件的回调
        getCategoryId({ categoryId, level }) {
            //区分三级分类响应的ID以及父组件进行存储
            console.log(level);
            if (level == 1) {
                (this.category1Id = categoryId),
                    (this.category2Id = ""),
                    (this.category3Id = "");
            } else if (level == 2) {
                (this.category2Id = categoryId), (this.category3Id = "");
            } else {
                //代表三级分类ID有了
                this.category3Id = categoryId;
                //发请求获取平台的属性
                this.getAttrList();
            }
        },
        //获取平台属性的数据
        async getAttrList() {
            let result = await this.$API.attr.reqAttrList(
                this.category1Id,
                this.category2Id,
                this.category3Id
            );
            if (result.code == 200) {
                this.attrList = result.data;
            }
        },
    },
};
</script>
<style lang="">
</style>