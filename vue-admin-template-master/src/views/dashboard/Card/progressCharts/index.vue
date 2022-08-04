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
                //最小值与最大值设置
                min: 0,
                max: 100,
            },
            yAxis: {
                show: false,//隐藏y轴
                type: 'category'

            },
            //系列
            series: [
                {
                    type: 'bar',

                    data: [78],
                    color: 'yellowgreen',
                    //柱状条颜色
                    barWidth: 10,
                    //背景颜色
                    showBackground: true,
                     backgroundStyle: {
                         color: '#eee'
                     },
                }
            ],
            //文本标签
             label: {
                show: true,
                //改变文本的内容
                formatter: '|',
                position: 'right',
                color: 'yellowgreen'
             },
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