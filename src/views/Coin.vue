<template>
    <my-page title="抛硬币实验" :page="page">
        <div class="body">
            <div class="coin" :style="{transform: `rotateY(${deg}deg)`}">
                {{ result ? '正面' : '反面' }}
            </div>
            <div>
                <ui-text-field class="input" v-model.number="times" type="number" label="抛硬币次数" />
                <br>
                <ui-text-field class="input" v-model.number="labCount" type="number" label="实验次数" />
                <br>
                <ui-raised-button class="btn" primary label="开始实验" @click="retry" />
                <ui-raised-button secondary label="重置" @click="reset" />
            </div>
            <!-- <div class="count">共抛了 <span class="total">{{ total }}</span> 次</div> -->
        </div>
        <table class="table">
            <tr>
                <th>实验编号</th>
                <th>正面频数</th>
                <th>正面频率</th>
                <th>反面次数</th>
                <th>反面频率</th>
            </tr>
            <tr v-for="item, index in allResult">
                <td>{{ index + 1 }}</td>
                <td>{{ item.headCount }}</td>
                <td>{{ item.headRate }}</td>
                <td>{{ item.tailCount }}</td>
                <td>{{ item.tailRate }}</td>
            </tr>
            <tr>
                <td>平均</td>
                <td>{{ avg.headCount }}</td>
                <td>{{ avg.headRate }}</td>
                <td>{{ avg.tailCount }}</td>
                <td>{{ avg.tailRate }}</td>
            </tr>
            <tr>
                <td>最大值</td>
                <td>{{ max.headCount }}</td>
                <td>{{ max.headRate }}</td>
                <td>{{ max.tailCount }}</td>
                <td>{{ max.tailRate }}</td>
            </tr>
            <tr>
                <td>最小值</td>
                <td>{{ min.headCount }}</td>
                <td>{{ min.headRate }}</td>
                <td>{{ min.tailCount }}</td>
                <td>{{ min.tailRate }}</td>
            </tr>
        </table>
        <div class="chart" id="box"></div>
        <div class="chart" id="box2"></div>
        <div class="chart" id="box3"></div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                labCount: 3,
                total: 0,
                deg: 0,
                times: 100,
                result: true,
                allResult: [
                    {
                        headCount: 4,
                        headRate: 0.4,
                        tailCount: 6,
                        tailRate: 0.6,
                    }
                ],
                avg: {
                    headCount: 0,
                    headRate: 0,
                    tailCount: 0,
                    tailRate: 0,
                },
                max: {
                    headCount: 0,
                    headRate: 0,
                    tailCount: 0,
                    tailRate: 0,
                },
                min: {
                    headCount: 0,
                    headRate: 0,
                    tailCount: 0,
                    tailRate: 0,
                },
                results: [
                    {
                        result: '正面',
                        number: 0,
                        rate: 0
                    },
                    {
                        result: '反面',
                        number: 0,
                        rate: 0
                    },
                ],
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: Icons.add,
                        //     click: this.add
                        // },
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/8bf7e0a0efe411e8b4371f10bd077ce0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.statData = [
                // {
                //     times: 1,
                //     value: 1
                // },
                // {
                //     times: 2,
                //     value: 0.4
                // },
                // {
                //     times: 3,
                //     value: 0.56
                // }
            ]
            this.statData2 = []
            this.statData3 = []
            this.total = 0
            this.head = 0
            this.chart = echarts.init(document.getElementById("box"))
            this.chart2 = echarts.init(document.getElementById("box2"))
            this.chart3 = echarts.init(document.getElementById("box3"))
            this.updateChart()
            this.debug()
        },
        methods: {
            debug() {
                this.retry()
            },
            reset() {
                this.statData = []
                this.total = this.head = 0
                this.allResult = []
                this.avg = {
                    headCount: 0,
                    headRate: 0,
                    tailCount: 0,
                    tailRate: 0,
                }

                // for (let i = 0; i < this.results.length; i++) {
                //     this.results[i].number = 0
                //     this.results[i].rate = 0
                // }
                this.updateChart()
            },
            retry(text) {
                let labCount = this.labCount || 1
                this.allResult = []
                this.statData = []
                this.statData2 = []

                for (let labIdx = 0; labIdx < labCount; labIdx++) {
                    let allCount = 0
                    let headCount = 0
                    let tailCount = 0
                    

                    for (let i = 0; i < this.times; i++) {
                        let isHead = Math.random() > 0.5
                        if (isHead) {
                            headCount++
                        } else {
                            tailCount++
                        }
                        allCount++
                        if (labIdx === 0) {
                            this.statData.push({
                                times: this.statData.length + 1,
                                value: headCount / allCount
                            })
                        }
                        // console.log
                    }
                    // for (let i = 0; i < this.results.length; i++) {
                    //     console.log('rate', this.results[i].number, this.total, this.results[i].number / this.total )
                    //     this.results[i].rate = this.results[i].number / this.total
                    // }
                    this.statData2.push({
                        times: this.statData2.length + 1,
                        value: headCount
                    })
                    this.statData3.push({
                        times: this.statData2.length + 1,
                        value: headCount / allCount
                    })

                    this.allResult.push({
                        headCount,
                        headRate: headCount / allCount,
                        tailCount,
                        tailRate: tailCount / allCount,
                    })
                }

                let sumHeadCount = 0
                let sumHeadRate = 0
                let sumTailCount = 0
                let sumTailRate = 0
                for (let result of this.allResult) {
                    sumHeadCount += result.headCount
                    sumTailCount += result.tailCount
                    sumHeadRate += result.headRate
                    sumTailRate += result.tailRate
                }

                function max(arr) {
                    let max = 0 - Number.MAX_SAFE_INTEGER
                    for (let item of arr) {
                        if (item > max) {
                            max = item
                        }
                    }
                    return max
                }
                function min(arr) {
                    let min = Number.MAX_SAFE_INTEGER
                    for (let item of arr) {
                        if (item < min) {
                            min = item
                        }
                    }
                    return min
                }
                function avg(arr) {
                    let sum = 0
                    for (let item of arr) {
                        sum += item
                    }
                    return sum / arr.length
                }
                console.log('max', max([1, 2, 3]))
                console.log('min', min([1, 2, 3]))
                console.log('avg', avg([1, 2, 3]))
                // avg
                this.avg.headCount = (sumHeadCount / labCount).toFixed(6)
                this.avg.headRate = (sumHeadRate / labCount).toFixed(6)
                this.avg.tailRate = (sumTailRate / labCount).toFixed(6)
                this.avg.tailCount = (sumTailCount / labCount).toFixed(6)
                // max
                this.max.headCount = max(this.allResult.map(item => item.headCount))
                this.max.headRate = max(this.allResult.map(item => item.headRate))
                this.max.tailRate = max(this.allResult.map(item => item.tailRate))
                this.max.tailCount = max(this.allResult.map(item => item.tailCount))
                // min
                this.min.headCount = min(this.allResult.map(item => item.headCount))
                this.min.headRate = min(this.allResult.map(item => item.headRate))
                this.min.tailRate = min(this.allResult.map(item => item.tailRate))
                this.min.tailCount = min(this.allResult.map(item => item.tailCount))

                this.deg = 0
                let timer = window.setInterval(() => {
                    this.deg += 20
                    if (this.deg > 360 * 3) {
                        this.deg = 0
                        window.clearInterval(timer)
                        this.updateChart()
                    }
                }, 10)
            },
            updateChart() {
                this.updateChart1()
                this.updateChart2()
                this.updateChart3()
            },
            updateChart1() {
                let option = {
                    title: {
                        text: '第一次实验正面朝上的频率',
                        x: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.statData.map(item => item.times)
                    },
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 1,
                        splitNumber: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '总次数： {b0}<br />正面朝上频率：{c0}',
                    },
                    series: [{
                        data: this.statData.map(item => item.value),
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                lineStyle:{  
                                    color:'#4285f4'  
                                }  
                            }  
                        }, 
                        // color: '#ff0000'
                    }]
                }
                this.chart.setOption(option)
            },
            updateChart2() {
                let option = {
                    title: {
                        text: '正面朝上的频数',
                        x: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.statData2.map(item => item.times)
                    },
                    yAxis: {
                        type: 'value',
                        // min: 0,
                        // max: 1,
                        // splitNumber: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '第 {b0} 次实验<br />正面朝上的频数：{c0}',
                    },
                    series: [{
                        data: this.statData2.map(item => item.value),
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                lineStyle:{  
                                    color:'#4285f4'  
                                }  
                            }  
                        }, 
                        // color: '#ff0000'
                    }]
                }
                this.chart2.setOption(option)
            },
            updateChart3() {
                let option = {
                    title: {
                        text: '正面朝上的频率',
                        x: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.statData3.map(item => item.times)
                    },
                    yAxis: {
                        type: 'value',
                        // min: 0,
                        // max: 1,
                        // splitNumber: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '第 {b0} 次实验<br />正面朝上的频率：{c0}',
                    },
                    series: [{
                        data: this.statData3.map(item => item.value),
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                lineStyle:{  
                                    color:'#4285f4'  
                                }  
                            }  
                        }, 
                        // color: '#ff0000'
                    }]
                }
                this.chart3.setOption(option)
            },

        }
    }
</script>

<style lang="scss" scoped>
.table {
    margin-left: 16px;
    // margin: 0 auto;
    margin-bottom: 16px;
    th,
    td {
        padding: 4px 12px;
        border: 1px solid #666;
    }
}
.body {
    padding: 16px;
    display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
}
.coin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin-right: 16px;
    margin-bottom: 24px;
    border-radius: 50%;
    border: 1px solid #333;
    background-color: #f1f1f1;
    font-size: 24px;
}
.up {
    height: 20px;
    color: #666;
}
.down {
    font-size: 16px;
    font-weight: bold;
}
.count {
    margin-top: 24px;
    font-size: 16px;
    .total {
        font-weight: bold;
        font-size: 32px;
    }
}
.chart {
    height: 400px;
    width: 800px;
    // padding: 20px;
}
.btn {
    margin-right: 8px;
}
.input {
    width: 186px;
}
</style>
