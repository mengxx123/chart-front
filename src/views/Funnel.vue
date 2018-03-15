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
                        text: this.option.title,
                        subtext: this.option.subTitle,
                        x: 'center'
                    },
                    tooltip: {},
                    legend: { //图例
                        bottom: 10,
                        left: 10,
                        orient: 'vertical',
                        data : ['潜在客户阶段','意向客户阶段','谈判阶段','签约']
                    },
                    //calculable : true,
                    series : [
                        {
                            name:'漏斗图',
                            type:'funnel', //漏斗图
                            left: '10%',
                            top: 60,
                            //x2: 80,
                            bottom: 60,
                            width: '80%',
                            // height: {totalHeight} - y - y2,
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort : 'descending', //数据排序，如果是：ascending，则是金字塔状
                            gap : 2, //数据图像间距
                            label: {
                                normal: {
                                    show: true, //显示文本标签
                                    position: 'inside' //内置图形文本标签，outside是外置，还有left，right，inner，center
                                },
                                emphasis: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            labelLine: { //设置文本标签位置为left或right时显示的引导线
                                normal: {
                                    length: 10, //长度
                                    lineStyle: {
                                        width: 1, //线宽
                                        type: 'solid' //类型：实现，还有虚线：dashed和dotted
                                    }
                                }
                            },
                            itemStyle: { //图像样式
                                normal: {
                                    borderColor: '#fff', //描边颜色
                                    borderWidth: 1  //描边宽度
                                }
                            },
                            data:[ //内容数据
                                {value:25, name:'签约'},
                                {value:50, name:'谈判阶段'},
                                {value:75, name:'意向客户阶段'},
                                {value:100, name:'潜在客户阶段'}
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
</style>
