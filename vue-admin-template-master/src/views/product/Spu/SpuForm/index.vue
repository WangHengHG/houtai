<template lang="">
    <div>
        <el-form label-width="80px">
          <el-form-item label="SPU名称">
              <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
          </el-form-item>
          <el-form-item label="品牌">
              <el-select placeholder="请选择品牌" v-model="spu.tmId">
                  <el-option  v-for="(tradeMark, index) in tradeMarkList" :key="index" :value="tradeMark.tmName"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="SPU描述">
              <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
          </el-form-item>
          <el-form-item label="SPU图片">
              <!-- action: 上传的地址 list-type: 文件列表的类型  on-preview: 图片预览  on-remove: 删除图片会触发 file-list:照片墙需要展示的数据(数组: 数组里面的元素务必要有name, url属性) -->
                <el-upload
                    action="/dev-api/admin/product/upload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :file-list="spuImageList"
                    :on-success="handlerSuccess"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
          </el-form-item>
          <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}个未选择`" v-model="attrIdAndName">
                    <el-option v-for="(unSelect, index) in unSelectSaleAttr" :key="unSelectSaleAttr.id" :label="unSelect.name" :value="`${unSelect.id}: ${unSelect.name}`"></el-option>
                </el-select>
                <el-button type="primary"icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
                <!-- 展示的是当前spu属于自己的销售属性 -->
                {{this.unSelectSaleAttr}}
                <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
                    <el-table-column label="序号" width="80" type="index" align="center" ></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值名称列表">
                        <template slot-scope="{row, $index}">
                            <el-tag
                                :key="tag.id"
                                v-for="(tag, index) in row.spuSaleAttrValueList"
                                closable
                                :disable-transitions="false">
                                {{tag.saleAttrValueName}}
                            </el-tag>
                            <!--  -->
                            <el-input
                                class="input-new-tag"
                                v-if="row.inputVisible"
                                v-model="row.inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm(row)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">保存</el-button>
              <el-button @click="$emit('changeScene', 0)">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            //存储spu信息属性, 初始化的时候是一个空的对象, 在修改spu的时候, 会向服务器发请求, 返回spu信息, 在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
            //添加spu, 如果是添加spu的时候并没有向服务器发请求, 数据收集到哪里[spu],
            spu: {
                category3Id: 0,
                //描述
                description: "",
                //手机spu图片的信息
                spuImageList: [
                    // {
                    // "id": 0,
                    // "imgName": "string",
                    // "imgUrl": "string",
                    // "spuId": 0
                    // }
                ],
                //spu的名称
                spuName: "",
                //销售属性与属性值
                spuSaleAttrList: [
                    // {
                    // "baseSaleAttrId": 0,
                    // "id": 0,
                    // "saleAttrName": "string",
                    // "spuId": 0,
                    // "spuSaleAttrValueList": [
                    //     {
                    //     "baseSaleAttrId": 0,
                    //     "id": 0,
                    //     "isChecked": "string",
                    //     "saleAttrName": "string",
                    //     "saleAttrValueName": "string",
                    //     "spuId": 0
                    //     }
                    // ]
                    // }
                ],
                //品牌的id
                tmId: 0,
            },
            tradeMarkList: [], //存储品牌信息
            spuImageList: [], //存储spu图片的数据
            saleAttrList: [], //销售属性的数据
            attrIdAndName:'', //收集未选择的销售属性的id
        };
    },
    methods: {
        //照片墙删除某一个图片的时候会触发
        handleRemove(file, fileList) {
            //file: 代表的是删除的那张图
            //fileList: 照片墙删除某一张图片以后, 剩余的其他的图片
            //收集照片墙图片的数据
            //对于已有的图片,有name和url字段, 对于服务器而言, 不需要name, url字段, 需要处理
            this.spuImageList = fileList
        },
        //照片墙图片预览的回调
        handlePictureCardPreview(file) {
            console.log(file.url);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //初始化SpuForm的数据
        async initSpuData(spu) {
            //获取spu信息的数据
            let SpuInfoResult = await this.$API.spu.reqSpuInfo(spu.id);
            if (SpuInfoResult.code == 200) {
                this.spu = SpuInfoResult.data;
            }
            //获取品牌的信息
            let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data;
            }
            //获取Spu图片的数据
            let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
            if (spuImageResult.code == 200) {
                let listArr = (this.spuImageList = spuImageResult.data);
                //由于照片墙显示图片的数据需要数组, 数组里面的元素需要有name与url字段
                //需要把服务器返回的数据进行修改
                listArr.forEach((item) => {
                    item.name = item.imgName;
                    item.url = item.imgUrl;
                });
                //把整理好的数据赋值给
                this.spuImageList = listArr;
            }
            //获取平台所有销售属性
            let saleResult = await this.$API.spu.reqBaseSaleAttrList();
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data;
            }
        },
        //照片墙图片上传成功的回调
        handlerSuccess(response, file, fileList){
            //收集图片的信息
            this.spuImageList = fileList;
        },
        //添加新的销售属性
        addSaleAttr(){
            //已经收集到了需要添加的销售属性的信息
            const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':');
            //想spu对象的spuSaleAttrList数组当中添加新的销售属性
            let newSaleAttr = {baseSaleAttrId, saleAttrName, spuSaleAttrValueList: []};
            //添加新的销售属性
            this.spu.spuSaleAttrList.push(newSaleAttr);
            //清空数据
            this.attrIdAndName = '';
        },
        //添加按钮的回调
        addSaleAttrValue(row){
            this.$set(row, 'inputVisible', true);
            //通过响应式数据inputValue字段收集新增的销售属性值
            this.$set(row, 'inputValue', '');
        },
        //el-input失去焦点的事件
        handleInputConfirm(row){
            //结构出销售属性当中收集的数据
            const {baseSaleAttrId, inputValue} = row;
            //新增的销售属性之不能为空
            if(inputValue.trim() == ''){
                this.$message('属性值不能为空');
                this.$set(row, 'inputVisible', false);
                return
            };
            //属性值不能重复
            let result = row.spuSaleAttrValueList.some(item=> {
                return item.saleAttrValueName == inputValue
            });
            if(result) {
                this.$message('属性值重复');
                return
            };
            //新增的销售属性值
            let newSaleAttrValue = {
                baseSaleAttrId,
                inputValue,
                saleAttrValueName: inputValue,
            };

            row.spuSaleAttrValueList.push(newSaleAttrValue)
            this.$set(row, 'inputVisible', false);    

        }
    },
    mounted() {
    },
    computed: {
        //计算出还未选择的销售属性
        unSelectSaleAttr(){
            //数组的过滤方法, 可以从已有的数组当中过滤出用户需要的元素, 并且返回一个新的数组
            let result =  this.saleAttrList.filter(item=> {
                // every: 数组的方法, 返回布尔值
                return this.spu.spuSaleAttrList.every(item1=>{
                    return item1.saleAttrName != item.name;
                })
            });
            return result;
        }
    }
};
</script>
<style lang="less">
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>