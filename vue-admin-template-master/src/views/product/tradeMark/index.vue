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
        注意: element UI当中的table组件, 是以一列一列进行展示数据的
        prop: 对应列内容的字段名
        -->
        <el-table :data="list" style="width: 100%" border>
            <el-table-column  type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column  prop="tmName" label="品牌名称" width="width"></el-table-column>
            <el-table-column  prop="logoUrl" label="品牌logo" width="width">
                <template slot-scope="{row, $index}">
                    <img src="https://img14.360buyimg.com/n1/s450x450_jfs/t1/204081/28/3137/101861/61276b03E47151545/12ce4877587a7806.jpg.avif" alt="" style="width:100px; height: 100px">
                </template>
            </el-table-column>
            <el-table-column  prop="prop" label="操作" width="width">
                <template slot-scope="{row, $index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
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
            :current-page= "page"
            :total="total"
            @size-change="handleSizeChange"
            :page-sizes="[3, 5, 10]"
            @current-change="getPageList"
            :pager-count='7'
            :page-size="3"
            layout=" prev, pager, next, jumper,->, sizes, total "
        ></el-pagination>
    </div>
</template>
<script>
export default {
    name: 'tradMark',
    data(){
        return {
            // 代表分页器第几页
            page: 1,
            // 当前页数展示数据条数
            limit: 3,
            //总共数据条数
            total: 0,
            //列表展示的数据
            list: []
        }
    }, 
    // 组件挂载完毕发请求
    mounted(){
        // 获取列表数据的方法
        this.getPageList();
    },
    methods: {
        // 获取品牌列表的数据
        async getPageList(pager = 1){
            this.page = pager;
            // 解构出参数
            // 获取品牌列表的接口
            const {page, limit} = this;
            let result = await this.$API.trademark.reqTradeMarkList(page, limit);
            if(result.code == 200) {
                this.total = result.data.total,
                this.list = result.data.records
            }
        },
        //当分页器某一页需要展示数据的条数发生变化的时候会触发
        handleSizeChange(limit){
            this.limit = limit;
            this.getPageList()
        }

    }
}
</script>
<style lang="">
    
</style>