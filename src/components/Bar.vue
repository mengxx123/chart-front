<template>
    <div class="layout-body">
        <div class="layout-nav">
            <ul id="tool-tab" class="nav nav-tabs">
                <div class="nav-item active"><a id="tab-style" class="nav-link" href="#tab11" data-toggle="tab">数据</a></div>
                <div class="nav-item"><a class="nav-link" href="#tab12" data-toggle="tab">设置</a></div>
                <div class="nav-item"><a id="tab-index" class="nav-link" href="#tab13" data-toggle="tab">其他</a></div>
            </ul>
            <div class="tab-content">
                <div id="tab11" class="tab-pane fade active in">
                    <p>这是一个免费的在线生成各种统计图表的工具, 可像 Excel 一样编辑, 然后生成曲线图, 折线图, 柱状图, 饼图, 直方图等多种丰富的统计图表!</p>

                    <p>注: 支持从 Excel 表直接复制粘贴表格. 填入数据后, 表格会自动扩展.</p>

                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-sm-3">类型</label>
                            <div class="col-sm-9">
                                <select class="form-control" name="type">
                                    <option value="spline">曲线图</option>
                                    <option value="line">折线图</option>
                                    <option value="column" selected="selected">柱状图(竖柱)</option>
                                    <option value="bar">条形图(横条)</option>
                                    <option value="pie">饼图</option>
                                    <option value="area">面积图</option>
                                    <option value="scatter">XY 散点图</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3">标题</label>
                            <div class="col-sm-9">
                                <input class="form-control" v-model="option.title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3">子标题</label>
                            <div class="col-sm-9">
                                <input class="form-control" v-model="option.subTitle">
                            </div>
                        </div>】
                        <div class="form-group">
                            <label class="control-label col-sm-3">系列的默认颜色列表</label>
                            <div class="col-sm-9">
                                <ul>
                                    <li><colorPicker v-model="color"></colorPicker></li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3">显示x轴</label>
                            <div class="col-sm-9">
                                <label class="checkbox-inline ">
                                    <input type="checkbox" v-model="option.xAxis.show">显示
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3">x轴标题</label>
                            <div class="col-sm-9">
                                <input class="form-control" v-model="option.xAxis.name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3">显示y轴</label>
                            <div class="col-sm-9">
                                <label class="checkbox-inline ">
                                    <input type="checkbox" v-model="option.yAxis.show">显示
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3">y轴标题</label>
                            <div class="col-sm-9">
                                <input class="form-control" v-model="option.yAxis.name">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-9 col-sm-offset-3">
                                <button class="btn btn-primary" @click="createChart" type="button">生成图表</button>
                                <button class="btn btn-primary" @click="download" type="button">下载图片</button>
                            </div>
                        </div>

                        <fieldset id="form" style="margin: 20px 0; padding: 0;">
                            <table>
                                <tr>
                                    <td>高度:</td>
                                    <td>
                                        <input type="text" name="height" value="400" style="width: 200px;" /> px
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                    </form>
                </div>
                <div id="tab12" class="tab-pane fade">
                    <div class="data-box">
                        <div id="data" class="data"></div>
                    </div>
                </div>
                <div id="tab13" class="tab-pane fade">

                </div>
            </div>
        </div>
        <div class="layout-content">
            <div id="main" class="canvas"></div>
        </div>

        <div class="view-box" v-if="showViewbox">
            <div class="view-box-close" @click="hideViewbox"></div>
            <img class="view-box-img" :src="viewboxImg">
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
                downloadSrc: '/static/download.png',
                option: {
                    title: '柱状图示例',
                    subTitle: '',
                    xAxis: {
                        show: true,
                        name: ''
                    },
                    yAxis: {
                        show: true,
                        name: ''
                    }
                }
            }
        },
        //components: { colorPicker },
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
                let legends = []

                for (let i = 1; i < datagrid[0].length - 1; i++) {
                    var y = datagrid[0][i];

                    if (y) {
                        legends.push(y)
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

                console.log('哈哈哈')
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
                    legend: {
                        data: legends,
                        width: 500,
                        height: 200
                    },
                    color: ['#f00', '#09c', '#c90', '#09f'],
                    xAxis: [
                        {
                            show: this.option.xAxis.show,
                            type: "category",
                            data: xlabels,
                            name: this.option.xAxis.name
                        }
                    ],
                    yAxis: [
                        {
                            show: this.option.yAxis.show,
                            name: this.option.yAxis.name,
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


    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    /**/
    .view-box {
        /*display: none;*/
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, .6);
    }
    .view-box-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 50px;
        height: 50px;
        background: silver;
        border-radius: 25px;
        box-shadow: 2px 2px 5px 0px black;
        cursor: pointer;
    }
    .view-box-close:hover {
        background: red;
    }
    .view-box-close:before {
        position: absolute;
        content: '';
        width: 30px;
        height: 10px;
        background: white;
        transform: rotate(45deg);
        top: 20px;
        left: 10px;
    }
    .view-box-close:after{
        content: '';
        position: absolute;
        width: 30px;
        height: 10px;
        background: white;
        transform: rotate(-45deg);
        top: 20px;
        left: 10px;
    }
    .view-box-img {
        display: block;
        position: relative;
        top: 50%;
        margin: 0 auto;
        transform: translateY(-50%);
        background-color: #fff;
    }
</style>
