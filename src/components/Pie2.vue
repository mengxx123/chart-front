<template>
    <div class="hello">
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
                                <label class="control-label col-sm-3">显示标题</label>
                                <div class="col-sm-9">
                                    <label class="checkbox-inline ">
                                        <input type="checkbox" v-model="option.title.show">显示
                                    </label>
                                </div>
                            </div>
                            <div v-if="option.title.show">
                                <div class="form-group">
                                    <label class="control-label col-sm-3">标题</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" v-model="option.title.text">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">子标题</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" v-model="option.title.subtext">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">标题水平安放位置</label>
                                    <div class="col-sm-9">
                                        <label class="radio-inline">
                                            <input type="radio" v-model="option.title.left" value="left">居左
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" v-model="option.title.left" value="center">居中
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" v-model="option.title.left" value="right">居右
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">标题垂直安放位置</label>
                                    <div class="col-sm-9">
                                        <label class="radio-inline">
                                            <input type="radio" v-model="option.title.top" value="top">居上
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" v-model="option.title.top" value="middle">居中
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" v-model="option.title.top" value="bottom">居下
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3">显示图例</label>
                                <div class="col-sm-9">
                                    <label class="checkbox-inline ">
                                        <input type="checkbox" v-model="option.legend.show">显示
                                    </label>
                                </div>
                            </div>
                            <div class="form-group" v-if="option.legend.show">
                                <label class="control-label col-sm-3">图例水平安放位置</label>
                                <div class="col-sm-9">
                                    <label class="radio-inline">
                                        <input type="radio" v-model="option.legend.left" value="left">居左
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" v-model="option.legend.left" value="center">居中
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" v-model="option.legend.left" value="right">居右
                                    </label>
                                </div>
                            </div>
                            <div class="form-group" v-if="option.legend.show">
                                <label class="control-label col-sm-3">图例水平安放位置</label>
                                <div class="col-sm-9">
                                    <label class="radio-inline">
                                        <input type="radio" v-model="option.legend.top" value="top">居上
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" v-model="option.legend.top" value="middle">居中
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" v-model="option.legend.top" value="bottom">居下
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3">x轴标题</label>
                                <div class="col-sm-9">
                                    <input class="form-control" v-model="option.xAxisName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3">y轴标题</label>
                                <div class="col-sm-9">
                                    <input class="form-control" v-model="option.yAxisName">
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
                                    <tr>
                                        <td></td>
                                        <td></td>
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

    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                xAxis: {
                    name: '1212'
                },
                downloadSrc: '/static/download.png',
                option: {
                    title: {
                        show: true,
                        text: '饼图示例',
                        subtext: '',
                        left: 'center',
                        top: 'top'
                    },
                    xAxisName: '',
                    yAxisName: '',
                    legend: {
                        show: true,
                        left: 'left',
                        top: 'top'
                    }
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
        },
        methods: {
            createChart: function () {
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
                            type: 'radar'
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
                        show: this.option.title.show,
                        text: this.option.title.text,
                        subtext: this.option.title.subtext,
                        left: this.option.title.left,
                        top: this.option.title.top,
                    },
                    tooltip: {},
                    legend: {
                        orient: "vertical",
                        x: "left",
                        data: ["直达", "营销广告", "搜索引擎", "邮件营销", "联盟广告", "视频广告", "百度", "谷歌", "必应", "其他"]
                    },
                    series: [
                        {
                            name: "访问来源",
                            type: "pie",
                            selectedMode: "single",
                            radius: [0, 70],
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: "inside"
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: [
                                {
                                    value: 335,
                                    name: "直达"
                                },
                                {
                                    value: 679,
                                    name: "营销广告"
                                },
                                {
                                    value: 1548,
                                    name: "搜索引擎"
                                }
                            ]
                        },
                        {
                            name: "访问来源",
                            type: "pie",
                            radius: [100, 140],
                            data: [
                                {
                                    value: 335,
                                    name: "直达"
                                },
                                {
                                    value: 310,
                                    name: "邮件营销"
                                },
                                {
                                    value: 234,
                                    name: "联盟广告"
                                },
                                {
                                    value: 135,
                                    name: "视频广告"
                                },
                                {
                                    value: 1048,
                                    name: "百度"
                                },
                                {
                                    value: 251,
                                    name: "谷歌"
                                },
                                {
                                    value: 147,
                                    name: "必应"
                                },
                                {
                                    value: 102,
                                    name: "其他"
                                }
                            ]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                this.chart.setOption(option);
            },
            download: function () {
                this.downloadSrc = this.chart.getDataURL()
            }
        },
        watch: {
            option: {
                handler(newValue, oldValue) {
                    this.createChart()
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
</style>
