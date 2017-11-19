/**
 * Created by hang on 2017/8/14.
 */

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

var app = new Vue({
    el: '#app',
    data: function () {
        return {
            xAxis: {
                name: '1212'
            },
            downloadSrc: 'download.png',
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
            for (i = 1; i < datagrid[0].length - 1; i++) {
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
            for (i = 1; i < datagrid.length - 1; i++) {
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

                for (j = 1; j < datagrid[i].length - 1; j++) {
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
            for (i = 0; i < series.length; i++) {
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
            this.downloadSrc = this.chart.getDataURL()
        }
    }
})

app.createChart()
