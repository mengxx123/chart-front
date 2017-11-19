/**
 * Created by hang on 2017/8/14.
 */

var data = [
    ["X轴", "系列1", "系列2", "系列3"],
    ["a", 12, 3, 1],
    ["b", '', 21, 3],
    ["c", 23, 31, 9],
    ["d", 23, 31, 9]
]

$("#download").click(function() {
    var svg = $('svg')[0];
    var svg_xml = (new XMLSerializer).serializeToString(svg);
    var base64 = btoa(unescape(encodeURIComponent(svg_xml)));
    var data_uri = "data:image/svg+xml;base64," + base64;

    var image = new Image;
    image.src = data_uri;
    image.onload = function(){
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext("2d");
        context.clearRect(0, 0, image.width, image.height);
        context.drawImage(image, 0, 0);

        var title = $.trim($('input[name=title]').val());
        if(title.length == 0){
            title = 'charts_udpwork_com';
        }
        var a = document.createElement("a");
        a.download = title + ".png";
        a.href = canvas.toDataURL("image/png");
        a.target = '_blank';
        a.click();
    };
})

$(function(){
    $(document).ready(function() {
        var table = $('#data').handsontable({
            minRows: 50,
            minCols: 8,
            minSpareRows: 1,
            minSpareCols: 1,
            rowHeaders: true,
            colHeaders: true,
            data: data
        }).data('handsontable')

        $('#create').click(function(){
            var height = 0;
            try{
                height = parseInt($('input[name=height]').val());
            }catch(e){}
            if(height <= 0){
                height = 400;
            }
            $('#charts').height(height);
            var datagrid = table.getData();
            var type = $('select[name=type]').val();
            var title = $('input[name=title]').val();
            var ytitle = $('input[name=ytitle]').val();
            show_chart(type, title, ytitle, datagrid);
            return false;
        }).click()
    })
})

function show_chart(type, title, ytitle, datagrid){
    var series = [];
    var xlabels = [];
    var xtitle = datagrid[0][0];

    for(i=1; i<datagrid[0].length-1; i++){
        var y = datagrid[0][i];
        if(y == '' || y == null){
            break;
        }
        series.push({
            name: y,
            data: []
        });
    }
    for(i=1; i<datagrid.length-1; i++){
        var x = datagrid[i][0];
        if(x == '' || x == null){
            break;
        }
        xlabels.push(x);
        for(j=1; j<datagrid[i].length-1; j++){
            if(datagrid[0][j].length == 0){
                continue;
            }
            var y = parseFloat(datagrid[i][j]);
            if(!isNaN(y)){
                series[j-1].data.push([x, y]);
            }else{
                series[j-1].data.push([x, null]);
            }
        }
    }
    var tmp = [];
    for(i=0; i<series.length; i++){
        if(series[i].data.length > 0){
            tmp.push(series[i]);
            //	alert(series[i].data);
        }
    }
    series = tmp;
    //alert(xlabels);
    //alert(series[0].data);

    $('#charts').html('');
    var charts = new Highcharts.Chart({
        chart: {
            renderTo: 'charts',
            type: type
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: xtitle,
                style: {
                    color: '#666',
                    "font-size": '120%'
                }
            },
            categories: xlabels,
            min: 0, //
            //minRange: 1,
            minPadding: 1, //
            labels: {
                formatter: function() {
                    return this.value + '';
                }
            }
        },
        yAxis: {
            title: {
                text: ytitle,
                style: {
                    color: '#666',
                    "font-size": '120%'
                }
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            }
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                return this.series.name + ': '+this.y +''; //
            }
        },
        plotOptions: {
            series:{
                connectNulls: true
            },
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            },
            spline: {
                dataLabels: {
                    enabled: true
                }
            },
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            column: {
                dataLabels: {
                    enabled: true
                }
            },
            area: {
                dataLabels: {
                    enabled: true
                }
            },
            pie: {
                allowPointSelect: true,
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        var p = this.percentage + '';
                        var pos = p.indexOf('.');
                        if(pos != -1){
                            p = p.substr(0, pos + 2);
                        }
                        return '<b>'+ this.point.name +'</b>: ' + p +' %';
                    }
                }
            }
        },
        series: series
    });
}