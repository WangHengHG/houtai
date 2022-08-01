<template lang="">
    <div>
        <el-table border :data="records">
          <el-table-column label="序号" prop="prop" width="80" type="index" align="center"></el-table-column>
          <el-table-column label="名称" prop="skuName" width="300" align="center"></el-table-column>
          <el-table-column label="描述" prop="skuDesc" align="center"></el-table-column>
          <el-table-column label="默认图片" width="110">
              <template slot-scope="{row, $index}">
                  <img :src="row.skuDefaultImg" style="width:80px;heoght: 80px;">
              </template>
          </el-table-column>
          <el-table-column label="重量" prop="weight" width="80" align="center"></el-table-column>
          <el-table-column label="价格" prop="price" width="80" align="center"></el-table-column>
          <el-table-column label="操作" prop="isSale" align="center">
              <template slot-scope="{row, $index}">
                  <div>
                      <el-button type="info" icon="el-icon-sort-down" size="mini" v-if="row.isSale == 0" @click="sale(row)"></el-button>
                      <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="cancelSale(row)"></el-button>
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
                      <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                  </div>
              </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination :total="total" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" @current-change="getSkuList" @size-change="handleSizeChange" layout="prev, pager, next, jumper,-> , sizes, total" style="text-align: center;"></el-pagination>>
        <!-- 抽屉效果 -->
        <el-drawer :visible.sync="drawer" :show-close = false size="50%">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{skuInfo.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{skuInfo.price}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                        <el-tag type="success" v-for="(attr, index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin: 0px 5px 5px 0px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel>
                    <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                        <img :src="item.imgUrl" style="width : 100%; height: 100%">
                    </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
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
            skuInfo: {},//存储sku信息
            drawer: false,//抽屉效果

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
            let result = await this.$API.sku.reqOnSale(row.id);
            if(result.code == 200) {
                row.isSale = 1;
                this.$message({type: 'success', message: '上架成功'});
            }
        },
        //下架
        async cancelSale(row){
            let result = await this.$API.sku.reqCancelSale(row.id);
            if(result.code == 200) {
                row.isSale = 0;
                this.$message({type: 'success', message: '下架成功!'});
            }
        },
        //edit按钮的回调
        edit(){
            this.$message('正在开发中!')
        },
        //获取sku详情的方法
        async getSkuInfo(row){
            let result = await this.$API.sku.reqSkuById(row.id);
            if(result.code == 200) {
                this.skuInfo = result.data;
            };
            this.drawer = true;
        }
        
    }
}
</script>
<style lang="less">
          .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button {
      width: 16px;
      height: 16px;
      background-color: red;
      border-radius: 50%;
  }
</style>
<style lang="less" scoped>
    .el-row .el-col-5 {
        font-size: 18px;
        text-align: right;
    }
    .el-col {
        margin: 10px 10px;
    }

</style>