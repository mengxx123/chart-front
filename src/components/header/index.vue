<template>
    <header class="layout-header navbar navbar-light navbar-h5" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                        data-target="#navbar-collapse">
                    <span class="sr-only">切换导航2</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" to="/">在线图表制作</router-link>
            </div>
            <div id="navbar-collapse" class="collapse navbar-collapse">
                <ul class="nav navbar-nav" id="menu-layoutit">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chart">图表</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                            文件 <i class="icon icon-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a id="open" href="#">打开</a></li>
                            <li><a id="new" href="#">新建</a></li>
                            <li><a id="save" href="#"><!--<i class="draw-icon draw-icon-save"></i>--> 保存</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                            图表类型 <i class="icon icon-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><router-link to="/">首页</router-link></li>
                            <li><router-link to="/bar">柱状图</router-link></li>
                            <li><router-link to="/radar">雷达图</router-link></li>
                            <li><router-link to="/line">折线图</router-link></li>
                            <li><router-link to="/bar">柱状图</router-link></li>
                            <li><router-link to="/pie">饼图</router-link></li>
                            <li><router-link to="/map">地图</router-link></li>
                            <li><router-link to="/gauge">仪表盘</router-link></li>
                            <li><router-link to="/scatter">散点图</router-link></li>
                            <li><router-link to="/venn">维恩图</router-link></li>
                            <li><router-link to="/">气泡图</router-link></li>
                            <li><router-link to="/">漏斗图</router-link></li>

                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/help">帮助</router-link>
                    </li>
                </ul>
                <!--<ul class="nav navbar-nav pull-right">-->
                    <!--<li class="nav-item">-->
                        <!--<a class="nav-link" href="http://tool.yunser.com" target="_blank">更多工具</a>-->
                    <!--</li>-->
                <!--</ul>-->
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
