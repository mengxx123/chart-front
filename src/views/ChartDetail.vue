<template>
    <my-page title="图表制作">
        <div class="layout-nav">
            <ui-tabs :value="activeTab" @change="handleTabChange">
                <ui-tab value="tab1" title="数据"/>
                <ui-tab value="tab2" title="设置"/>
            </ui-tabs>
            <div class="tab-contents">
                <div class="tab-content">
                    <div class="data-box">
                        <div id="data" class="data"></div>
                    </div>
                </div>
                <div class="tab-content" v-if="activeTab === 'tab2'">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <ui-text-field  v-model="option.title" label="标题" />
                        </div>
                        <div class="form-group">
                            <ui-text-field  v-model="option.subTitle" label="子标题" />
                        </div>
                        <!-- <div class="form-group">
                            <label class="control-label col-sm-3">系列的默认颜色列表</label>
                            <div class="col-sm-9">
                                <ul>
                                    <li><colorPicker v-model="color"></colorPicker></li>
                                </ul>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <ui-checkbox v-model="option.xAxis.show" label="显示 x 轴" />
                        </div>
                        <div class="form-group">
                            <ui-text-field  v-model="option.xAxis.name" label="x 轴标题" v-if="option.xAxis.show" />
                        </div>
                        <div class="form-group">
                            <ui-checkbox v-model="option.yAxis.show" label="显示 y 轴" />
                        </div>
                        <div class="form-group">
                            <ui-text-field  v-model="option.yAxis.name" label="y 轴标题" v-if="option.yAxis.show" />
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

                        <!-- <fieldset id="form" style="margin: 20px 0; padding: 0;">
                            <table>
                                <tr>
                                    <td>高度:</td>
                                    <td>
                                        <input type="text" name="height" value="400" style="width: 200px;" /> px
                                    </td>
                                </tr>
                            </table>
                        </fieldset> -->
                    </form>
                </div>
                <div class="tab-content" v-if="activeTab === 'tab3'">
                    <h2>Tab Three</h2>
                    <p>
                    这是第三个 tab
                    </p>
                </div>
            </div>
        </div>
        <div class="layout-content">
            <div class="btns">
                <ui-raised-button class="btn" label="生成图表" primary  @click="createChart" />
                <ui-raised-button class="btn" label="下载图片" @click="download" />
            </div>
            <div id="main" class="canvas"></div>
        </div>

        <div class="view-box" v-if="showViewbox">
            <div class="view-box-close" @click="hideViewbox"></div>
            <img class="view-box-img" :src="viewboxImg">
        </div>
    </my-page>
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
                type: 'bar',
                activeTab: 'tab1',
                color: '#09c',
                showViewbox: false,
                viewboxImg: '66.png',

                msg: 'Welcome to Your Vue.js App',
                downloadSrc: '/static/download.png',
                option: {
                    title: '天气数据',
                    subTitle: '',
                    xAxis: {
                        show: true,
                        name: ''
                    },
                    yAxis: {
                        show: true,
                        name: ''
                    },
                    legend: {
                        show: true,
                        left: 'left',
                        top: 'top'
                    },
                    series: {
                        showLabel: false
                    }
                }
            }
        },
        //components: { colorPicker },
        mounted: function () {
            this.type = this.$route.params.type
            if (this.type === 'pie') {
                this.option.xAxis.show = false
                this.option.yAxis.show = false
                // data = [
                //     {value:335, name:'直接访问'},
                //     {value:310, name:'邮件营销'},
                //     {value:234, name:'联盟广告'},
                //     {value:135, name:'视频广告'},
                //     {value:1548, name:'搜索引擎'}
                // ]
            }


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
            handleTabChange (val) {
                this.activeTab = val
            },
            hideViewbox() {
                this.showViewbox = false
            },
            createChart() {
                // var height = 0;
                // try {
                //     height = parseInt($('input[name=height]').val());
                // } catch (e) {
                // }
                // if (height <= 0) {
                //     height = 400;
                // }
                // $('#charts').height(height);
                var datagrid = this.table.getData();
                console.log('数据', datagrid)
                var type = $('select[name=type]').val();
                var title = $('input[name=title]').val();
                this.show_chart(type, title, datagrid);
                return false;
            },
            show_chart: function (type, title, datagrid) {
                console.log(datagrid)

                var series = [];
                var xlabels = [];
                var xtitle = datagrid[0][0];
                let legends = []

                if (this.type === 'pie') {
                    series = [
                        {
                            name: '访问来源',
                            type: 'pie',
                            label: {
                                normal: {
                                    show: this.option.series.showLabel
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            //radius : '55%',
                            //center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                } else {
                    for (let i = 1; i < datagrid[0].length - 1; i++) {
                        var y = datagrid[0][i];

                        if (y) {
                            legends.push(y)
                            series.push({
                                name: y,
                                data: [],
                                type: this.type
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
                }
                
                //alert(xlabels);
                //alert(series[0].data);

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

<style lang="scss" scoped>
    .btns {
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
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
        z-index: 10000000;
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
