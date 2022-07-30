<template lang="">
    <div>
        <el-form label-width="80px"  value="">
            <el-form-item label="SPU名称">
                海绵宝宝
            </el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称">
                </el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)">
                </el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input placeholder="重量(千克)">
                </el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="textarea" rows="4">
                </el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item label="屏幕尺寸">
                        <el-select placeholder="请选择" value="">
                            <el-option></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item label="颜色">
                        <el-select placeholder="请选择" v-model="mo">
                            <el-option  value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table border>
                    <el-table-column label="序号" width="80" type="selection"></el-table-column>
                    <el-table-column label="图片"></el-table-column>
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            skuImageList: [],//存储图片的数据
            spuSaleAttrList: [],//存储销售属性的数据
            attrInfoList: [],//存储商品信息的数据
            category1Id: '',
            category2Id: '',
            category3Id: '',
            mo: '',
        }
    },
    methods: {
        cancel(){
            console.log(11);
            this.$emit('changeScene', {scene: 0, flag: ''});
        },
        //获取skuForm数据
        async getData(category1Id, category2Id, spu){
            //获取图片的数据
            let result = await this.$API.sku.reqSkuImageList(spu.id);
            if(result.code == 200) {
                this.skuImageList = result.data;
            };
            //获取销售属性的数据
            let result1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
            if(result.code == 200) {
                console.log(result1);
                this.spuSaleAttrList = result1.data;
            };
            //获取平台属性的数据
            let result2 = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.category3Id);
            if(result2.code == 200) {
                this.attrInfoList = result2.data;
            }
        }
    }
}
</script>
<style lang="">
    
</style>