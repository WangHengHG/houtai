<template lang="">
    <div>
        <el-card style="margin: 20px 0px">
            <!-- 三级联动已经是全局组件了 -->
           <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0"></CategorySelect>
        </el-card>
        <el-card>
            <!-- 底部这里将来是由三部分切换的 -->
            <div v-show="scene==0">
                <!-- 展示SPU列表的结构 -->
                <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加SPU</el-button>
                <el-table border style="width:100%" :data="records">
                    <el-table-column label="序号" align="center" width='80' type="index"></el-table-column>
                    <el-table-column label="SPU的名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU的描述" prop="description"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <!-- 这里的按钮将来用hintButton -->
                            <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"  @click="updataSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"></hint-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除当前spu" slot="reference">
                                </hint-button>
                            </el-popconfirm>
                            
                        </template>
                    </el-table-column>
                </el-table>


                <el-pagination :total="total" :current-page="page" :page-sizes="[3,5,10]" :page-size="limit" @size-change="handleSizeChange" @current-change="getSpuList" layout="prev, pager, next, jumper,->, sizes, total" style="text-align:center">

                </el-pagination>
            </div>
            <spuForm v-show="scene==1" @changeScene="changeScene" ref="spu">添加spu|修改spu</spuForm>
            <skuForm v-show="scene==2" @changeScene="changeScene" ref="sku">添加sku</skuForm>
        </el-card>
    </div>
</template>
<script>
//引入子组件
import spuForm from './SpuForm';
import skuForm from './SkuForm';

export default {
    name: 'Spu',
    components: {
        spuForm,
        skuForm,
    },
    data(){
        return{
            category1Id : '',
            category2Id : '',
            category3Id : '',
            isShowTable : true,
            page: 1,
            limit: 3,
            records: [],//spu列表的数据
            total: 0,//分页器一共需要展示数据的条数
            scene: 0, //0代表展示spu列表的数据, 1: 展示添加或者修改spu  2: 添加sku
        }
    },
    methods: {
        //三级联动的自定义事件, 可以把子组件的响应的ID传递给父组件
        getCategoryId({categoryId, level}){
            //categoryId: 可以获取一, 二, 三级分类的ID
            //level: 可以区分是几级分类的ID
            if(level == 1) {
                this.category1Id = categoryId;
                //清除2, 3级分类的ID
                this.category2Id = '';
                this.category3Id = '';
            } else if(level == 2) {
                this.category2Id = categoryId;
                this.category3Id = '';
            } else{
                this.category3Id = categoryId;
                //获取SPU列表数据进行展示
                this.getSpuList();
            }
        },
        //获取SPU列表数据的方法
        async getSpuList(pages = 1){
            this.page = pages;
            //携带三个参数: page: 第几页  limit: 每一页需要展示多少条数据  三级分类ID
            const {page, limit, category3Id} = this;
            let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
            if(result.code==200){
                this.total = result.data.total;
                this.records = result.data.records;
            }
        },
        //点击分页器第几页按钮的回调
        // handlerCurrentChange(page){
        //     this.page = page;
        //     this.getSpuList();
        // },
        //当分页器某一页展示数据的条数发生变化的回调
        handleSizeChange(limit){
            this.limit = limit;
            this.getSpuList();
        },
        //添加spu按钮的回调
        addSpu(){
            this.scene = 1;

            //通知子组件SPUForm发请求--两个
            this.$refs.spu.addSpuData(this.category3Id);
        },
        //修改spu按钮的回调
        updataSpu(row){
            this.scene = 1;
            //获取子组件SpuForm
            //在父组件中可以通过$refs获取子组件等等
            this.$refs.spu.initSpuData(row);
        },
        //自定义事件回调
        changeScene({scene, flag}){
            this.scene = scene;
            //flag这个形参是为了区分保存按钮是添加还是修改
            if(flag == '修改') {
                this.getSpuList(this.page);
            }else {
                this.getSpuList();
            }
        },
        //删除spu的按钮回调
        async deleteSpu(row){
            let result = await this.$API.spu.reqDeleteSpu(row.id);
            if(result.code == 200) {
                this.$message({type:'success', message:'删除成功'});
                //代表spu个数大于1删除的时候停留在当前页, 如果spu 的个数小于1, 回到上一页
                this.getSpuList(this.records.length > 1? this.page: this.page - 1);
            }
        },
        //添加sku按钮的回调
        addSku(row){
            //切换场景为2
            this.scene = 2;
            //父组件调用子组件的方法, 让子组件发请求 --三个请求
            this.$refs.sku.getData(this.category1Id, this.category2Id,row);
        }
    },

}
</script>
<style lang="">
    
</style>