<template lang="">
    <div>
        <el-form label-width="80px"  value="">
            <el-form-item label="SPU名称">
                {{spu.spuName}}
            </el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称"  v-model="skuInfo.skuName">
                </el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number">
                </el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input placeholder="重量(千克)" v-model="skuInfo.weight">
                </el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc">
                </el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item :label="attr.attrName" v-for="(attr, index) in attrInfoList" :key="attr.id">
                        <el-select placeholder="请选择" v-model="attr.attrIdAndAttrValueId">
                            <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}}`" v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
                        <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndValueId">
                            <el-option  :value="`${saleAttr.id}:${saleAttrValue.id}`" :label="saleAttrValue.saleAttrValueName" v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
                    <el-table-column width="80" type="selection" ></el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="{row, $index}">
                            <img :src="row.imgUrl" style="width:100px;height:100px"></img>
                            
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">
                                设为默认
                            </el-button>
                            <el-button v-else>
                                默认
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            spuImageList: [],//存储图片的数据
            spuSaleAttrList: [],//存储销售属性的数据
            attrInfoList: [],//存储商品信息的数据
            //收集图片的数据的字段
            imageList: [],
            //收集sku数据的字段, 收集的数据目前缺少isDefault字段, 将来提交给服务器数据的时候需要整理数据
            skuInfo: {
                //第一类收集的数据: 父组件给的数据
                "category3Id": 0,
                "spuId": '',
                "tmId": '',
                "skuName": "",
                //第二类数据: 通过双向绑定v-model收集
                "price": '',
                "weight": "",
                "skuDesc": "",
                //第三类: 需要自己书写代码
                //平台属性
                "skuAttrValueList": [
                    // {
                    // "attrId": 0,
                    // "attrName": "",
                    // "id": 0,
                    // "skuId": 0,
                    // "valueId": 0,
                    // "valueName": ""
                    // }
                ],
                //默认图片
                "skuDefaultImg": "",
                //收集图片的字段
                "skuImageList": [
                    // {
                    // "id": 0,
                    // "imgName": "string",
                    // "imgUrl": "string",
                    // "isDefault": "string",
                    // "skuId": 0,
                    // "spuImgId": 0
                    // }
                ],
                //sku销售属性列表数据
                "skuSaleAttrValueList": [
                    // {
                    // "id": 0,
                    // "saleAttrId": 0,
                    // "saleAttrName": "string",
                    // "saleAttrValueId": 0,
                    // "saleAttrValueName": "string",
                    // "skuId": 0,
                    // "spuId": 0
                    // }
                ],


            },
            spu: {

            }
        }
    },
    methods: {
        cancel(){
            this.$emit('changeScene', {scene: 0, flag: ''});
            Object.assign(this._data, this.$options.data())
        },
        //获取skuForm数据
        async getData(category1Id, category2Id, spu){
            //收集父组件给予的数据
            this.skuInfo.category3Id = spu.category3Id;
            this.skuInfo.spuId = spu.id;
            this.skuInfo.tmId = spu.tmId;
            this.spu = spu;
            //获取图片的数据
            let result = await this.$API.spu.reqSpuImageList(spu.id);
            if(result.code == 200) {
                let list = result.data;
                list.forEach(item=> {
                    item.isDefault = 0;
                })
                this.spuImageList = list;
            };
            //获取销售属性的数据
            let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
            if(result.code == 200) {
                console.log(result1);
                this.spuSaleAttrList = result1.data;
            };
            //获取平台属性的数据
            let result2 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id);
            if(result2.code == 200) {
                this.attrInfoList = result2.data;
            }
        },
        //table表格复选框按钮的事件
        handleSelectionChange(params){
            //获取到用户选中图片的信息数据, 但是必须要注意, 当前收集的数据当中, 缺少isDefaslt字段
            this.imageList = params
        },
        //排他的操作
        changeDefault(row){
            //图片列表的数据的isDefault字段都变为0
            this.spuImageList.forEach(item=> {
                item.isDefault = 0;
            });
            //点击的哪个图片的数据变为1
            row.isDefault = 1;
            //收集默认图片的地址
            this.skuInfo.skuDefaultImg = row.imgUrl;
        },
        //保存按钮的事件
        async save(){
            //整理参数
            //整理平台属性
            const {attrInfoList, skuInfo, spuSaleAttrList, imageList} = this;
            //整理平台数据的方式1
            //新建数组
            // let arr = [];
            // //把收集到的数据先整理一下
            // attrInfoList.forEach(item=> {
            //     //当前平台属性用户进行了选择
            //     if(item.attrIdAndAttrValueId){
            //         const [attrId, valueId] = item.attrIdAndAttrValueId.split(':');
            //         //携带给服务器的参数应该是对象
            //         let object = {attrId, valueId};
            //         arr.push(object);
            //     }
            // });
            //将整理好的参数赋值给skuInfo.skuAttrValueList
            
            //整理平台数据的方式2
            let result = attrInfoList.reduce((prev, item)=> {
                if(item.attrIdAndAttrValueId){
                    const [attrId, valueId] = item.attrIdAndAttrValueId.split(':');
                    prev.push({attrId, valueId})
                }
                return prev;
            },[]);
            this.skuInfo.skuAttrValueList = result;
            //整理销售属性
            skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item)=> {
                if(item.saleAttrIdAndValueId){
                    const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(':');
                    prev.push({saleAttrId, saleAttrValueId});
                }
                return prev;
            }, []);
            //整理图片的数据
            skuInfo.skuImageList = imageList.map(item=> {
                return {
                    imgName: item.imgName,
                    imgUrl: item.imgUrl,
                    isDefault: item.isDefault,
                    spuImgId: item.id,
                }
            });
            //发请求
            let reqResult = await this.$API.spu.reqAddSku(skuInfo);
            console.log(reqResult);

        }
    }
}
</script>
<style lang="">
    
</style>