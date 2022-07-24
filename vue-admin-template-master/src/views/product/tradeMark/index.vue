<template lang="">
    <div>
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showDialog">添加</el-button></el-button>
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
                    <img :src="row.logoUrl" alt="" style="width:100px; height: 100px">
                </template>
            </el-table-column>
            <el-table-column  prop="prop" label="操作" width="width">
                <template slot-scope="{row, $index}">
  <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark">修改</el-button>
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

        <!-- 对话框 
        :visible.sync: 控制对话框显示与隐藏用的
        -->
        <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
        <!-- form: 表单  :model属性, 这个属性的作用是, 把表单的数据收集到哪个对象的身上, 将来elementUI需要表单验证, 需要这个属性 -->
            <el-form :model="tmForm" style="width:80%">
                <el-form-item label="品牌名称" label-width="100px">
                    <el-input v-model="tmForm.tmName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px">
                    <!-- 这里收集数据不能使用v-model, 因为不是表单元素
                        action: 设置图片上传的地址
                        on-success: 可以检测到图片上传成功, 当图片上传成功会执行一次
                        before-upload: 上传图片之前会执行一次
                    -->
                    <el-upload
                        class="avatar-uploader"
                        action="/dev-api/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdataTradeMark">确 定</el-button>
            </div>
         </el-dialog>
    </div>
</template>
<script>
export default {
    name: "tradMark",
    data() {
        return {
            // 代表分页器第几页
            page: 1,
            // 当前页数展示数据条数
            limit: 3,
            //总共数据条数
            total: 0,
            //列表展示的数据
            list: [],
            //对话框显示与隐藏控制的属性
            dialogFormVisible: false,
            //收集品牌的信息, 对象身上的属性, 不能瞎写
            tmForm: {
                logoUrl: '',
                tmName: '',
                id: ''
            }
        };
    },
    // 组件挂载完毕发请求
    mounted() {
        // 获取列表数据的方法
        this.getPageList();
        // 上传图片相关的回调
        
    },
    methods: {
        // 获取品牌列表的数据
        async getPageList(pager = 1) {
            this.page = pager;
            // 解构出参数
            // 获取品牌列表的接口
            const { page, limit } = this;
            let result = await this.$API.trademark.reqTradeMarkList(page, limit);
            if (result.code == 200) {
                (this.total = result.data.total), (this.list = result.data.records);
            }
        },
        //当分页器某一页需要展示数据的条数发生变化的时候会触发
        handleSizeChange(limit) {
            this.limit = limit;
            this.getPageList();
        },
        //点击添加品牌的按钮
        showDialog(){
            this.dialogFormVisible=true
            //清除数据
            this.tmForm = {tmName:'', logoUrl:''}
        },
        //修改某一个品牌
        updateTradeMark(){
            this.dialogFormVisible=true

        },
        //图片上传成功
        handleAvatarSuccess(res, file) {
            //res是上传成功之后, 返回给前端的数据
            //file: 上传成功之后, 服务器返回给前端的数据
            this.tmForm.logoUrl = res.data
        },
        //图片上传之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //添加按钮(添加品牌|修改品牌)
        async addOrUpdataTradeMark(){
            this.dialogFormVisible = false;
            //发请求(添加|修改)
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
            if(result.code == 200) {
                //弹出信息: 添加品牌成功, 修改品牌成功
                this.$message(this.tmForm.id?'修改品牌成功':'添加品牌成功');
                //添加或修改品牌成功之后, 需要再次获取品牌列表
                this.getPageList();
            }
        }
    },
};
</script>
<style lang="less">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>