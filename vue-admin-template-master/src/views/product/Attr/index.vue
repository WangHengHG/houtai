<template lang="">
    <div>
        <el-card style="margin: 20px 0px">
            <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
        </el-card>
        <el-card>
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
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
                    <template slot-scope="{row, $index}">
                        <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataAttr(row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row)"></el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 添加属性|修改属性的结构 -->
            <div v-show="!isShowTable">
                <el-form :inline="true" ref="form" label-width="80px" v-model="attrInfo">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
                <el-button @click="isShowTable=true">取消</el-button>
                <el-table border style="width:100%; margin: 20px 0px" :data="attrInfo.attrValueList">
                  <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                  <el-table-column label="属性值名称" width="width">
                      <template slot-scope="{row, $index}">
                          <!-- 这里的结构需要input和span相互切换 -->
                          <el-input placeholder="请输入属性值名称" v-model="row.valueName" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="row.flag = false" :ref="$index"></el-input>
                          <span v-else @click="toEdit(row, $index)" style="display: block">{{row.valueName}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" width="width">
                      <template slot-scope="{row, $index}">
                          <!-- 气泡确认框 -->
                            <el-popconfirm :title="`确定删除${row.valueName}吗？`"  @onConfirm="deleteAttrValue($index)">
                                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                      </template>
                  </el-table-column>
                </el-table>
                <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
                <el-button @click="isShowTable=true">取消</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
//按需引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep';
export default {
    name: "Attr",
    data() {
        return {
            category1Id: "",
            category2Id: "",
            category3Id: "",
            attrList: [],
            //控制tabel的显示与隐藏
            isShowTable: true,
            //收集新增属性|修改属性使用的
            attrInfo: {
                "attrName": "",//属性名
                "attrValueList": [ //属性值, 可以有多个, 每一个属性值都是一个对象 需要attrId, valueName
                    
                ],
                "categoryId": 0,//三级分类的ID
                "categoryLevel": 0,//因为服务器也需要区分是几级ID
                "id": undefined
            }
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
        //添加属性值的回调
        addAttrValue(){
            //向属性值的数组里面添加元素
            this.attrInfo.attrValueList.push({
                attrId:this.attrInfo.id, //相应的属性的ID, 目前还没有相应的属性的ID, 目前而言带给服务器的ID为undefined
                valueName: '',
                flag: true,
            })
            //flag属性： 给每一个属性值添加一个标记flag， 用户切换查看模式与编辑模式， 好处： 每一个属性值可以控制自己的模式切换
            //当前flag属性， 响应式数据（数据变化视图跟着变化）
            //
            this.$nextTick(()=> {
                this.$refs[this.attrInfo.attrValueList.length-1].focus();
            })
        },
        //添加属性按钮的回调
        //清除数据
        //收集三级分类的ID
        addAttr(){
            this.isShowTable = false;
            this.attrInfo = {
                "attrName": "",//属性名
                "attrValueList": [],
                "categoryId": this.category3Id,
                "categoryLevel": 3,
            }
        },
        //修改某一个属性
        updataAttr(row){
            this.isShowTable = false;
            //将选中的属性赋值给attrInfo
            //由于数据结构当中存在对象里面套数据, 以及数组里面又套对象, 因此需要使用深拷贝解决这类问题
            //深拷贝和浅拷贝出现频率很高, 切记达到手写深拷贝与浅拷贝
            this.attrInfo = cloneDeep(row);
            //在修改某一个属性的时候， 将相应的属性值元素添加上flag这个标记
            this.attrInfo.attrValueList.forEach(item=> {
                //这样书写也可以给属性值添加flag字段， 但是会发现视图不会跟着变化， 因为flag不是响应式数组
                //因为vue无法探测普通的新增属性， 这样书写的属性并非响应式的
                //第一个参数： 对象  ， 第二个参数： 添加新的响应式属性  第三个参数： 新的属性的属性值
                this.$set(item,'flag', false)
            })
        },
        //切换焦点的查看模式
        toLook(row){
            //如果属性值为空， 不能作为新的属性值， 需要给用户提示，让他输入一个其他的属性值
            if(row.valueName.trim() == '') {
                this.$message('请你输入一个正常的属性值');
                return
            }
            //新增的属性值不能与已有的属性值重复
            let isRepat = this.attrInfo.attrValueList.some(item=>{
                //需要将row从数组里面判断的时候去除
                //row最新新增的属性值
                //判断的时候， 需要把已有的数组当中新增的这个属性值去除
                if(row!==item){
                    return row.valueName == item.valueName;
                }
            })
            if(isRepat) {
                this.$message('改属性值已存在！');
                return
            };
            //row形参是当前用户添加的最新的属性值
            //当前的编辑模式变成查看模式【让input消失， 显示span】
            row.flag = false;
        },
        //点击span的回调， 变为编辑模式
        toEdit(row, index){
            row.flag = true;
            //获取input节点， 实现自动的聚焦
            //需要注意， 点击span的时候， 切换为input变为编辑模式， 但是需要注意， 对于浏览器而言， 页面的重绘与重排， 需要耗费时间的
            //因此我们不可能一点击span 立马获取到input
            //$nextTick， 当节点渲染完毕了， 会执行一次
            this.$nextTick(()=> {
                //获取相应的表单元素， 实现聚焦
                this.$refs[index].focus();
            })

        },
        //气泡确认框的确定按钮的回调
        //注意elementUI不动版本的事件名称不同
        deleteAttrValue(index){
            //当前删除属性值的操作是不需要发请求的
            this.attrInfo.attrValueList.splice(index, 1);
        },
        //保存按钮， 进行添加属性或者是修改属性的操作
        async addOrUpdateAttr(){
            //整理参数， 如果用户添加了很多属性值， 且属性值为空的不应该提交给服务器
            //提交给服务器数据当中不应该出现flag字段
            this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=> {
                //过滤掉属性值不为空的
                if(item.valueName !='') {
                    //删除掉flag属性
                    delete item.flag;
                    return true;
                }
            });
            if(this.attrInfo.attrValueList.length == 0) {
                this.$message('所有属性值都为空，取消保存！')
            } else{
                try {
                    let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
                    //展示平台属性的信号量进行切换
                    this.isShowTable = true;
                    //提示消息
                    this.$message({type: 'success', message:'保存成功'});
                    //保存成功以后需要再次获取平台属性进行展示
                    this.getAttrList();
                } catch (error) {
                    this.$message('保存失败')
                }
            }

        },
        //删除属性的回调
        async deleteAttr(row){
            let result = await this.$API.attr.reqDeleteAttr(row.id);
            if(result.code == 200) {
                this.getAttrList();
                this.$message({type:'success', message: '该属性删除成功！'})
            } else{
                this.$message({type:'success', message: '属性删除失败'+ result.data})
            }
        }
    },
    watch: {
        category3Id: {
            handler(newValue, oldValue){
                if(newValue == ''){
                    this.attrList = [];
                }
            }
        }
    }
};
</script>
<style lang="">
</style>