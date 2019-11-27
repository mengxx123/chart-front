<template>
    <my-page title="图表" :page="page">
        <app-list :data="groups" />
        <ul class="chart-list">
            <!-- <li class="chart-item">
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
            </li> -->
        </ul>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '条码',
                        apps: [
                            {
                                name: '二维码',
                                desc: '',
                                icon: '/static/img/qrcode.svg',
                                to: 'xxx',
                                href: 'https://qrcode.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '条形码',
                                desc: '',
                                icon: '/static/img/barcode.svg',
                                to: 'xxx',
                                href: 'https://barcode.yunser.com/',
                                target: '_blank'
                            }
                        ]
                    },
                    {
                        name: '分类',
                        apps: [
                            {
                                name: '词云',
                                desc: '',
                                icon: '/static/img/word_cloud.svg',
                                to: 'xxx',
                                href: 'https://wordcloud.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '条形图',
                                desc: '',
                                icon: '/static/img/chart_bar.svg',
                                to: 'xxx',
                                href: 'https://bar.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '拓扑图',
                                desc: '',
                                icon: '/static/img/chart_functional.svg',
                                to: 'xxx',
                                href: 'https://topo.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: 'UML 图',
                                desc: '',
                                icon: '/static/img/chart_functional.svg',
                                to: 'xxx',
                                href: 'https://d3.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '柱状图',
                                desc: '标准柱状图',
                                icon: '/static/img/chart_bar.svg',
                                to: '/chart/bar'
                            },
                            {
                                name: '折线图',
                                desc: '',
                                icon: '/static/img/chart_bar.svg',
                                to: '/chart/line'
                            },
                            {
                                name: '雷达图',
                                desc: '',
                                icon: '/static/img/chart_bar.svg',
                                to: '/chart/radar'
                            },
                            {
                                name: '散点图',
                                desc: '',
                                icon: '/static/img/chart_bar.svg',
                                to: '/chart/scatter'
                            },
                            {
                                name: '饼图',
                                desc: '',
                                icon: '/static/img/chart_bar.svg',
                                to: '/chart/pie'
                            },
                            {
                                name: '漏斗图',
                                desc: '',
                                icon: '/static/img/chart_bar.svg',
                                to: '/chart/funnel'
                            },
                            // {
                            //     name: '标准饼图',
                            //     description: '基本的饼图',
                            //     image: '/static/img/bar1.png',
                            //     to: '/chart/pie',
                            //     icon: 'pie'

                            // }
                        ]
                    },
                    {
                        name: '其他',
                        apps: [
                            {
                                name: '投骰子实验',
                                desc: '',
                                icon: '/static/img/chart.svg',
                                to: '/dice',
                            },
                            {
                                name: '抛硬币实验',
                                desc: '',
                                icon: '/static/img/chart.svg',
                                to: '/coin',
                            },
                            {
                                name: '抛硬币实验',
                                desc: '两个硬币',
                                icon: '/static/img/chart.svg',
                                to: '/coin/ex',
                            },
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=chart',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=chart',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted: function () {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/var';

    .chart-list {
        @include clearfix;
        .chart-item {
            float: left;
            width: 120px;
            height: 120px;
            margin-right: 16px;
            margin-bottom: 16px;
            text-align: center;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
            // border: 1px solid #ccc;
            overflow: hidden;
            &:hover {
                background-color: #f1f1f1;
            }
        }
        .link {
            display: block;
            height: 100%;
        }
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
