<template lang="">
    <el-card class="box-card">
        <div slot="header" class="header clearfix">
            <div class="category-header">
                <span>销售额类别占比</span>
                <el-radio-group v-model="value">
                    <el-radio-button label="全部渠道"></el-radio-button>
                    <el-radio-button label="线上"></el-radio-button>
                    <el-radio-button label="门店"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </el-card>
</template>
<script>
export default {
    data(){
        return {
            value: '全部渠道'
        }
    }
}
</script>
<style lang="less" scoped>
    .box-card {
    margin: 10px 0px;
    .charts {
        width: 100%;
        height: 260px;
    }
    }
    .herder {
    }
    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>