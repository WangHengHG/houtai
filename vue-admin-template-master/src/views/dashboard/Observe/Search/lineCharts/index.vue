<template lang="">
    <div>
        <div class="header">
            <span class="search-header">搜索用户数</span>
            <svg t="1659519106878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="20" height="20"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="2293"></path></svg>
        </div>
        <div class="main">
            <span class="main-title">12312</span>
            <span class="main-content">17.1</span>
            <svg t="1659520602171" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3333" width="18" height="18"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="3334" fill="#d81e06"></path></svg>
            <svg t="1659520885358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="18" height="18"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="4270" fill="#1afa29"></path></svg>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
        
    </div>
</template>
<script>
import  * as echarts from "echarts";
export default {
    mounted() {
        //初始化echarts实例
        let lineChart = echarts.init(this.$refs.charts);
        //配置数据
        lineChart.setOption({
            xAxis: {
                show: false, //隐藏x轴
                type: "category",
            },
            yAxis: {
                show: false, //隐藏y轴
            },
            //系列
            series: [
                {
                    type: "line",
                    data: [10, 57, 28, 42, 9, 29, 10, 44],
                    //拐点的样式的设置
                    itemStyle: {
                        opacity: 0,
                    },
                    //线条的样式
                    lineStyle: {
                        color: "blue",
                    },
                    //填充颜色
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "blue", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#fff", // 100% 处的颜色
                                },
                            ],
                            global: false, // 缺省为 false
                        },
                    },
                    smooth: true,
                },
            ],
            //布局的调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
        });
    },
};
</script>
<style lang="less" scoped>
.header {
    display: flex;
    align-items: center;

    .search-header {
        margin-right: 20px;
    }
}

.main {
    margin: 10px 0px;

    .main-title {
        margin-right: 30px;
    }

    .main-content {
        margin-right: 20px;
    }
}

svg {
    vertical-align: top;
}

.footer {
    .charts {
        width: 100%;
        height: 50px;
    }
}
</style>