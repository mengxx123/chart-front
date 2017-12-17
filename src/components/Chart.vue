<template>
    <div class="layout-body">
        <div class="container">
            <ul class="chart-list">
                <li class="chart-item">
                    <router-link to="/bar">
                        <img class="chart-img" src="/static/img/bar1.png">
                        <i class="icon icon-bar"></i>
                        <div class="chart-name">柱状图</div>
                        <div class="chart-desc">标准柱状图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/line">
                        <i class="icon icon-line"></i>
                        <div class="chart-name">折线图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/pie">
                        <i class="icon icon-pie"></i>
                        <div class="chart-name">标准饼图</div>
                        <div class="chart-desc">基本的饼图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/pie2">
                        <i class="icon icon-pie"></i>
                        <div class="chart-name">嵌套饼图</div>
                        <div class="chart-desc">由两个（或多个）饼图嵌套而成</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/radar">
                        <i class="icon icon-radar"></i>
                        <div class="chart-name">雷达图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/map">
                        <i class="icon icon-radar"></i>
                        <div class="chart-name">地图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/scatter">
                        <i class="icon icon-radar"></i>
                        <div class="chart-name">散点图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/venn">
                        <i class="icon icon-radar"></i>
                        <div class="chart-name">维恩图</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/funnel">
                        <i class="icon icon-pie"></i>
                        <div class="chart-name">漏斗图</div>
                        <div class="chart-desc"></div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/map">
                        <i class="icon icon-pie"></i>
                        <div class="chart-name">地图</div>
                        <div class="chart-desc"></div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/map2">
                        <i class="icon icon-pie"></i>
                        <div class="chart-name">地图</div>
                        <div class="chart-desc">pm2.5</div>
                    </router-link>
                </li>
                <li class="chart-item">
                    <router-link to="/pictograph">
                        <i class="icon icon-pie"></i>
                        <div class="chart-name">象形图</div>
                        <div class="chart-desc">pm2.5</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    var data = [
        ['', "蒸发量", "降水量"],
        ["1月", 2, 4],
        ["2月", 6, 12],
        ["3月", 8, 16],
        ["4月", 10, 20]
    ]

    $("#download").click(function () {
        var svg = $('svg')[0];
        var svg_xml = (new XMLSerializer).serializeToString(svg);
        var base64 = btoa(unescape(encodeURIComponent(svg_xml)));
        var data_uri = "data:image/svg+xml;base64," + base64;

        var image = new Image;
        image.src = data_uri;
        image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;

            var context = canvas.getContext("2d");
            context.clearRect(0, 0, image.width, image.height);
            context.drawImage(image, 0, 0);

            var title = $.trim($('input[name=title]').val());
            if (title.length == 0) {
                title = 'charts_udpwork_com';
            }
            var a = document.createElement("a");
            a.download = title + ".png";
            a.href = canvas.toDataURL("image/png");
            a.target = '_blank';
            a.click();
        };
    })

    export default {
        name: 'hello',
        data () {
            return {
                showViewbox: false,
                viewboxImg: '66.png',

                msg: 'Welcome to Your Vue.js App',
                xAxis: {
                    name: '1212'
                },
                downloadSrc: '/static/download.png',
                option: {
                    title: '柱状图示例',
                    subTitle: '',
                    xAxisName: '',
                    yAxisName: ''
                }
            }
        },
        mounted: function () {
            var tableEl = document.getElementById('data')
            this.table = new Handsontable(tableEl, {
                minRows: 50,
                minCols: 8,
                minSpareRows: 1,
                minSpareCols: 1,
                rowHeaders: true,
                colHeaders: true,
                data: data
            })

            this.createChart()
            //this.table = $('#data').handsontable().data('handsontable')
        },
        methods: {
            hideViewbox() {
                this.showViewbox = false
            },
            createChart() {
                var height = 0;
                try {
                    height = parseInt($('input[name=height]').val());
                } catch (e) {
                }
                if (height <= 0) {
                    height = 400;
                }
                $('#charts').height(height);
                var datagrid = this.table.getData();
                console.log('数据', datagrid)
                var type = $('select[name=type]').val();
                var title = $('input[name=title]').val();
                var ytitle = $('input[name=ytitle]').val();
                this.show_chart(type, title, ytitle, datagrid);
                return false;
            },
            show_chart: function (type, title, ytitle, datagrid) {
                console.log(datagrid)

                var series = [];
                var xlabels = [];
                var xtitle = datagrid[0][0];

                console.log('长度', datagrid[0])
                for (let i = 1; i < datagrid[0].length - 1; i++) {
                    var y = datagrid[0][i];
                    if (y) {
                        series.push({
                            name: y,
                            data: [],
                            type: 'bar'
                        })
                    }
                }
                console.log('第一', series)
                for (let i = 1; i < datagrid.length - 1; i++) {
                    // 获取 x 轴标题
                    var x = datagrid[i][0];
                    if (x == '' || x == null) {
                        break;
                    }
                    xlabels.push(x);
                    console.log('智障', datagrid[i])
                    if (!datagrid[i]) {
                        break
                    }

                    for (let j = 1; j < datagrid[i].length - 1; j++) {
                        if (!datagrid[0][j]) {
                            continue;
                        }
                        var y = parseFloat(datagrid[i][j]);
                        if (!isNaN(y)) {
                            series[j - 1].data.push([x, y]);
                        } else {
                            series[j - 1].data.push([x, null]);
                        }
                    }
                }
                var tmp = [];
                for (let i = 0; i < series.length; i++) {
                    if (series[i].data.length > 0) {
                        tmp.push(series[i]);
                        //	alert(series[i].data);
                    }
                }
                series = tmp;
                //alert(xlabels);
                //alert(series[0].data);

                console.log(xlabels)
                console.log(series)

                // 基于准备好的dom，初始化echarts实例
                this.chart = echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: this.option.title,
                        subtext: this.option.subTitle
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量']
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: xlabels,
                            name: this.option.xAxisName
                        }
                    ],
                    yAxis: [
                        {
                            name: this.option.yAxisName,
                            type: "value"
                        }
                    ],
                    series: series
                };

                // 使用刚指定的配置项和数据显示图表。
                this.chart.setOption(option);
            },
            download: function () {
                this.showViewbox = true
                this.viewboxImg = this.chart.getDataURL()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chart-list {
        overflow: hidden;
    }
    .chart-list .chart-item {
        float: left;
        width: 25%;
        margin-bottom: 16px;
        text-align: center;
        border: 1px solid #ccc;
    }
    .chart-list .chart-item:hover {
        background-color: #f1f1f1;
    }
    .chart-list .chart-item a {
    }
    .chart-img {
        display: block;
        width: 186px;
        height: 93px;
        margin: 0 auto;
    }
    .chart-list .icon {
        font-size: 36px;
    }
    .chart-list .chart-name {
        color: #333;
        font-size: 20px;
        text-align: center;
    }
    .chart-list .chart-desc {
        color: #666;
        text-align: center;
    }
</style>
