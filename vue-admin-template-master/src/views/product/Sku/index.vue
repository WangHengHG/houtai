<template lang="">
    <div>
        <el-table border :data="records">
          <el-table-column label="序号" prop="prop" width="80" type="index"></el-table-column>
          <el-table-column label="名称" prop="skuName" width="300"></el-table-column>
          <el-table-column label="描述" prop="skuDesc"></el-table-column>
          <el-table-column label="默认图片" width="110">
              <template slot-scope="{row, $index}">
                  <img :src="row.skuDefaultImg" style="width: 80px;height: 80px">
              </template>
          </el-table-column>
          <el-table-column label="重量" prop="weight" width="80"></el-table-column>
          <el-table-column label="价格" prop="price" width="80"></el-table-column>
          <el-table-column label="操作" prop="isSale">
              <template slot-scope="{row, $index}">
                  <div>
                      <el-button type="success" icon="el-icon-sort-down" size="mini" v-if="isSale == 0" @click="sale(row)"></el-button>
                      <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="cancelSale(row)"></el-button>
                      <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                      <el-button type="info" icon="el-icon-info" size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                  </div>
              </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination :total="total" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" @current-change="getSkuList" @size-change="handleSizeChange" layout="prev, pager, next, jumper,-> , sizes, total" style="text-align: center;"></el-pagination>>
    </div>
</template>
<script>
export default {
    name: 'Sku',
    data(){
        return {
            page: 1,//代表当前第几页
            limit: 10, //代表当前页面展示几条数据
            records: [],//存储sku列表的数据
            total: 0, //一共展示的数据

        }
    },
    mounted(){
        //获取sku列表
        this.getSkuList();
    },
    methods: {
        //获取sku列表数据的方法
        async getSkuList(pages = 1){
            //解构出默认的参数
            this.page = pages;
            const {page, limit} = this;
            let result = await this.$API.sku.reqSkuList(page, limit);
            if(result.code == 200) {
                this.total = result.data.total;
                this.records = result.data.records;
            }
        },
        //
        handleSizeChange(limit){
            //修改参数
            this.limit = limit;
            this.getSkuList();
        },
        //上架
        async sale(row){
            console.log(row);

            let result = await this.$API.sku.reqOnSale(row.id);
            if(result.code == 200) {
                row.isSale = 1;
                this.$message({type: 'success', message: '上架成功'});
            }
        },
        //下架
        async cancelSale(row){
            console.log(row);

            let result = await this.$API.sku.reqCancelSale(row.id);
            if(result.code == 200) {
                row.isSale = 0;
                this.$message({type: 'success', message: '上架成功'});
            }
        }
        
    }
}
</script>
<style lang="">
    
</style>