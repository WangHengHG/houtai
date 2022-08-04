<template lang="">
    <div class="charts" ref="charts">
        
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    mounted(){
        //初始化echarts实例
        let lineChart = echarts.init(this.$refs.charts);
        //配置数据
        lineChart.setOption({
            xAxis: {
                show: false,//隐藏x轴
                //均分
                type: 'category'
            },
            yAxis: {
                show: false,//隐藏y轴

            },
            //系列
            series: [
                {
                    type: 'bar',
                    data: [10, 57, 28, 42, 9, 29, 10, 44, 33, 21, 8],
                    color: 'pink'
                }
            ],
            //布局的调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom:0
            },
            //提示
            tooltip: {},
        })
    }
}
</script>
<style lang="less">
    .charts {
        width: 100%;
        height: 100%;
    }
</style>