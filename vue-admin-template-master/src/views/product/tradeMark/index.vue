<template lang="">
    <div>
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button></el-button>
        <!-- 表格组件 
        data: 表示组件将来需要展示的数据---数组类型
        border: 是给表格添加边框
        column属性
        label: 显示的标题
        width: 对应列的宽度
        align: 标题的对齐方式
        -->
        <el-table :data="data" style="width: 100%" border>
            <el-table-column  prop="prop" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column  prop="prop" label="品牌名称" width="width"></el-table-column>
            <el-table-column  prop="prop" label="品牌logo" width="width"></el-table-column>
            <el-table-column  prop="prop" label="操作" width="width"></el-table-column>
        </el-table>
        <!-- 分页器
        当前页
        数据的总条数
        每一页展示的条数
        current-page: 当前第几页
        total: 展示数据总条数
        page-sizes: 代表的是每一页需要展示多少条数据
        page-sizes: 可以设置每一页展示多少条数据
        layout: 可以实现分页器的布局
        pager-count: 按钮的数量 数量是9 连续页码则是7
        -->
        <el-pagination
            style='margin-top: 20px; textAlign:center'
            :current-page="6"
            :total="99"
            @size-change="handleSizeChange"
            :page-sizes="[3, 5, 10]"
            :pager-count='9'
            :page-size="3"
            layout=" prev, pager, next, jumper,->, sizes, total "
        ></el-pagination>
    </div>
</template>
<script>
export default {
    name: 'tradMark',

}
</script>
<style lang="">
    
</style>