<template>
    <my-page title="自然数中质数的占比" :page="page">
        <div class="body">
            <div>
                <ui-text-field class="input" v-model="number" label="数量" />
                <br>
                <ui-raised-button class="btn" primary label="计算" @click="retry" />
                <ui-raised-button secondary label="重置" @click="reset" />
            </div>
            <!-- <div class="count">共抛了 <span class="total">{{ total }}</span> 次</div> -->
        </div>
        <div class="chart" id="box"></div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    function isPrime(number) {
        if (typeof number !== 'number' || number<2) {
            // 不是数字或者数字小于2
            return false;
        }

        if (number === 2) {//2是质数
            return true;
        } else if (number % 2 === 0) {//排除偶数
            return false;
        }
        var squareRoot = Math.sqrt(number);

        //因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
        for(var i = 3; i <= squareRoot; i += 2) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
    
    export default {
        data () {
            return {
                number: 6,
                count: 0,
                result: true,
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: Icons.add,
                        //     click: this.add
                        // },
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     href: 'https://project.yunser.com/products/8bf7e0a0efe411e8b4371f10bd077ce0',
                        //     target: '_blank',
                        //     title: '帮助'
                        // }
                    ]
                }
            }
        },
        mounted() {
            this.statData = [
                // {
                //     number: 0,
                //     value: 0
                // },
                // {
                //     number: 2,
                //     value: 1
                // },
                // {
                //     number: 3,
                //     value: 0
                // }
            ]
            this.total = 0
            this.head = 0
            this.chart = echarts.init(document.getElementById("box"))
            this.retry()
        },
        methods: {
            reset() {
                this.statData = []
                this.number = 0
                this.updateChart()
            },
            retry(text) {
                this.count = 0
                this.total = 0
                this.statData = []
                for (let i = 0; i < this.number; i++) {
                    if (isPrime(i)) {
                        this.count += 1
                    }
                    this.total += 1
                    this.statData.push({
                        number: i + 1,
                        value: this.count / this.total
                    })
                }
                this.updateChart()
            },
            updateChart() {
                let option = {
                    title: {
                        text: '自然数中质数的占比',
                        x: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.statData.map(item => item.number)
                    },
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 1,
                        splitNumber: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '前 {b0} 个自然数：<br />质数的占比：{c0}',
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
