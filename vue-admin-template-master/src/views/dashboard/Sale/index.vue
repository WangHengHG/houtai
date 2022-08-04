<template lang="">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!--  v-model="activeName" @tab-click="handleClick" -->
            <!-- 头部左侧内容 -->
            <el-tabs class="tab" v-model="activeName">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visite"></el-tab-pane>
            </el-tabs>
            <!-- 头部右侧内容 -->
            <div class="right">
                <span @click="setDate">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <el-date-picker
                    v-model="date"
                    class= "date"
                    size= 'mini'
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format= 'yyyy-MM-dd'
                    >
                </el-date-picker>
            </div>
        </div>
        <!-- 内容区域 -->
        <div>
            <el-row :gutter="10">
                <el-col :span="16">
                    <!-- 容器 -->
                    <div class="charts" ref="charts"></div>
                </el-col>
                
                <el-col :span="8">
                    <div class="main-right">
                        <h3>门店{{title}}排名</h3>
                        <ul>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>
                            <li>
                                <span class="r-index">0</span>
                                <span class="r-value">肯德基</span>
                                <span>123456</span>
                            </li>


                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs';
export default {
    // 引入echarts
    name:'',
    data(){
        return {
            activeName: 'sale',
            date: [],
        }
    },
    mounted(){
        //初始化echarts
        this.myCharts = echarts.init(this.$refs.charts);
        this.setWeek();
        this.myCharts.setOption({
            title: {
                text: '销售额趋势',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                data: ['一月', '二月', '三月','四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                axisTick: {
                    alignWithLabel: true
                }
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220, 110, 89, 66, 86, 124],
                color: 'yellowgreen'
                }
            ]
        })
    },
    computed: {
        //计算属性-标题
        title(){
            return this.activeName == 'sale'? '销售额': '访问量'
        },
    },
    methods: {
        setDate(){
            const day = dayjs().format('YYYY-MM-DD');
            this.date = [day,day];
        },
        setWeek(){
            const start = dayjs().day(1).format('YYYY-MM-DD');
            const end = dayjs().day(7).format('YYYY-MM-DD');
            this.date = [start, end];
        },
        setMonth(){
            let start = dayjs().startOf('month').format('YYYY-MM-DD');
            let end = dayjs().endOf('month').format('YYYY-MM-DD');
            this.date = [start, end]
        },
        setYear(){
            let start = dayjs().startOf('year').format('YYYY-MM-DD');
            let end = dayjs().endOf('year').format('YYYY-MM-DD');
            this.date = [start, end]
        }
    },
    //监听属性
    watch: {
        title(){
            //重新修改图表的配置的数据
            //图表的配置的数据可以再次修改, 如果有新的数值, 用新的数值, 没有新数值,就不改变
            this.myCharts.setOption({
                title: {
                    text: this.title + '趋势',
                },
            })
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
/deep/.el-card__header {
  border-bottom: none;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0%;
  span {
    margin: 0 10px;
  }
}
.date {
  width: 250px;
  margin: 0 20px;
}
ul {
    list-style: none;
    width: 100%;
    height: 260px;
    padding: 0;
    li {
        margin: 10px 0px;
        height: 8%;
        .r-index {
            float: left;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: black;
            color: white;
            text-align: center;
            margin-right: 60px;
        }
        .r-value {
            float: right;
        }
    }
}

</style>