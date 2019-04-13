<template>
    <my-page title="抛硬币统计" :page="page">
        <div class="body">
            <div class="coin" :style="{transform: `rotateY(${deg}deg)`}">
                {{ result ? '正面' : '反面' }}
            </div>
            <div>
                <ui-text-field class="input" v-model="times" label="次数" />
                <br>
                <ui-raised-button class="btn" primary label="抛硬币" @click="retry" />
                <ui-raised-button secondary label="重置" @click="reset" />
            </div>
            <!-- <div class="count">共抛了 <span class="total">{{ total }}</span> 次</div> -->
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
                times: 1,
                result: true,
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
            this.total = 0
            this.head = 0
            this.chart = echarts.init(document.getElementById("box"))
            this.updateChart()
        },
        methods: {
            reset() {
                this.statData = []
                this.total = this.head = 0
                this.updateChart()
            },
            retry(text) {
                this.deg = 0
                for (let i = 0; i < this.times; i++) {
                    this.result = Math.random() > 0.5
                    if (this.result) {
                        this.head += 1
                    } else {
                    }
                    this.total += 1
                    this.statData.push({
                        times: this.statData.length + 1,
                        value: this.head / this.total
                    })
                }
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
                let option = {
                    title: {
                        text: '正面朝上的频率',
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
                        formatter: '总次数： {b0}<br />正面朝上概率：{c0}',
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
