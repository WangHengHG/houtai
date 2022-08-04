<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card>
                    <Detail title="总销售额" count="￥ 126560">
                        <template slot="charts">
                            <div style="display: flex; justify-content: space-between;">
                                <div>
                                    <span>周同比&nbsp;&nbsp;56.67%</span>
                                    <svg t="1659520602171" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3333" width="18" height="18"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="3334" fill="#d81e06"></path></svg>
                                </div>
                                <div>
                                    <span>日同比&nbsp;19.16%</span>
                                    <svg t="1659520885358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="18" height="18"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="4270" fill="#1afa29"></path></svg>
                                </div>
                            </div>
                        </template>
                        <template slot="footer">
                            <span>日销售额￥ 4455</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <Detail title="访问量" count="88460">
                        <template slot="charts">
                            <Linecharts></Linecharts>
                        </template>
                        <template slot="footer">
                            <span>日访问量 1234</span>
                        </template>
                    </Detail>
                    
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <Detail title="支付笔数" count="88460">
                        <template slot="charts">
                            <BarCharts></BarCharts>
                        </template>
                        <template slot="footer">
                            <span>转化率 65%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <Detail title="运营活动效果" count="78%">
                        <template slot="charts">
                            <progressCharts></progressCharts>
                        </template>
                        <template slot="footer">
                            <div style="display: flex; justify-content: space-between;">
                                <div>
                                    <span>周同比&nbsp;&nbsp;56.67%</span>
                                    <svg t="1659520602171" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3333" width="18" height="18"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="3334" fill="#d81e06"></path></svg>
                                </div>
                                <div>
                                    <span>日同比&nbsp;19.16%</span>
                                    <svg t="1659520885358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="18" height="18"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="4270" fill="#1afa29"></path></svg>
                                </div>
                            </div>
                        </template>
                    </Detail>
                </el-card>
            </el-col>


        </el-row>
    </div>
</template>

<script>

import Detail from './Detail';
import Linecharts from './lineChart';
import BarCharts from './barChart';
import progressCharts from './progressCharts';

    export default {
        components: {
            Detail,
            Linecharts,
            BarCharts,
            progressCharts
        }
    }
</script>

<style scoped>
    svg{
        vertical-align: top;
    }

</style>