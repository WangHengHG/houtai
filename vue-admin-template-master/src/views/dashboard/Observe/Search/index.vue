<template lang="">
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <div class="search-header">
                    <span>线上热门搜索</span>
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="charts">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <lineCharts></lineCharts>
                    </el-col>
                    <el-col :span="12">
                        <lineCharts></lineCharts>
                    </el-col>
                </el-row>
                <!-- table表格 -->
                  <el-table :data="tableData" tyle="width: 100%" border class="table">
                    <el-table-column
                    label="排名"
                    width="80"
                    type="index">
                    </el-table-column>
                    <el-table-column
                    label="搜索关键字"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    label="用户数"
                    sortable
                    >
                    </el-table-column>
                    <el-table-column
                    label="周涨幅"
                    sortable
                    >
                    </el-table-column>
                </el-table>    
                <!-- 分页器 -->
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000"
                    class="pagenation"
                    >
                </el-pagination>
            </div>

        </el-card>
    </div>
</template>
<script>
import lineCharts from './lineCharts';
export default {
    data() {
        return {
            tableData: [{}]
        }
    },
    components: {
        lineCharts,
    }
};
</script>
<style lang="less" scoped>
.search-header {
    display: flex;
    justify-content: space-between;
}
.charts {

}
.table {
    margin: 10px 0px;
}
.pagenation {
    float: right;
}

</style>