<template>
    <my-page title="投骰子实验" :page="page">
        <div class="body">
            <!-- <div class="coin" :style="{transform: `rotateY(${deg}deg)`}">
                {{ result ? '正面' : '反面' }}
            </div> -->
            <div>
                <ui-text-field class="input" v-model="times" label="次数" />
                <br>
                <ui-raised-button class="btn" primary label="投骰子" @click="retry" />
                <ui-raised-button secondary label="重置" @click="reset" />
            </div>
            <!-- <div class="count">共抛了 <span class="total">{{ total }}</span> 次</div> -->
            <div></div>
            <table class="table">
                <tr>
                    <th>结果</th>
                    <th>频数</th>
                    <th>频率</th>
                </tr>
                <tr v-for="item in results">
                    <td>{{ item.result }}</td>
                    <td>{{ item.number }}</td>
                    <td>{{ item.rate }}</td>
                </tr>
            </table>
        </div>
        <div class="chart" id="box"></div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                total: 0,
                deg: 0,
                times: 100,
                result: true,
                results: [
                    {
                        result: '1',
                        number: 0,
                        rate: 0
                    },
                    {
                        result: '2',
                        number: 0,
                        rate: 0
                    },
                    {
                        result: '3',
                        number: 0,
                        rate: 0
                    },
                    {
                        result: '4',
                        number: 0,
                        rate: 0
                    },
                    {
                        result: '5',
                        number: 0,
                        rate: 0
                    },
                    {
                        result: '6',
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
                            href: 'https://project.yunser.com/products/a6487dc00d4311ea901ee7e49215c09c',
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
            this.total = 0
            this.head = 0
            this.chart = echarts.init(document.getElementById("box"))
            this.updateChart()
            // this.debug()
        },
        methods: {
            debug() {
                this.retry()
            },
            reset() {
                this.statData = []
                this.total = this.head = 0
                for (let i = 0; i < this.results.length; i++) {
                    this.results[i].number = 0
                    this.results[i].rate = 0
                }
                this.updateChart()
            },
            retry(text) {
                this.deg = 0
                for (let i = 0; i < this.results.length; i++) {
                    this.results[i].number = 0
                    this.results[i].rate = 0
                }
                this.total = 0
                this.head = 0
                this.statData = []
                for (let i = 0; i < this.times; i++) {
                    this.result = Math.ceil(Math.random() * 6) - 1
                    // if (this.result) {
                    //     this.head += 1
                    // } else {
                    //     this.results[1].number++
                    // }
                    this.results[this.result].number++
                    this.total += 1
                    // console.log
                    this.statData.push({
                        times: this.statData.length + 1,
                        value: this.results[0].number / this.total
                    })
                }
                for (let i = 0; i < this.results.length; i++) {
                    console.log('rate', this.results[i].number, this.total, this.results[i].number / this.total )
                    this.results[i].rate = this.results[i].number / this.total
                }
                this.updateChart()
                // let timer = window.setInterval(() => {
                //     this.deg += 20
                //     if (this.deg > 360 * 3) {
                //         this.deg = 0
                //         window.clearInterval(timer)
                //     }
                // }, 10)
            },
            updateChart() {
                let option = {
                    title: {
                        text: '数字 1 的频率',
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
                        formatter: '总次数： {b0}<br />数字 1 的频率：{c0}',
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.table {
    margin-top: 16px;
    // margin: 0 auto;
    th,
    td {
        padding: 4px 12px;
        border: 1px solid #666;
    }
}
.body {
    padding: 16px;
    // display: flex;
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
