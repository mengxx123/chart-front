<template>
    <div class="page page-home">
        <div class="banner">
            <ui-header></ui-header>
            <img class="logo" src="/static/img/logo.svg">
            <img class="banner-img" src="/static/img/banner.png">
            <h3>数据可视化神器</h3>
            <div class="desc">无需编程，简单三步既可生成交互性图表</div>
            <a class="btn" href="#">立即使用</a>
        </div>
        <div class="layout-body">
            <div class="feature-box">
                <div class="container">
                    <h2 class="section-title">功能特性</h2>
                    <div>
                        <div>
                            <ul class="feature-list">
                                <li class="item">
                                    <div class="title">拖入数据生成图表</div>
                                    <div class="desc">直接将 CSV、Excel、文本数据文件拖动或复制到数据输入框即可生成图表；</div>
                                </li>
                                <li class="item">
                                    <div class="title">丰富的模板</div>
                                    <div class="desc">内置丰富的模板供您选择，同时您也可以根据自己需要定制自己的模板；</div>
                                </li>
                                <li class="item">
                                    <div class="title">清晰的数据表格</div>
                                    <div class="desc">导入的数据以数据表格的形式展现，您可以直接操作这些数据并直接更新到图表中，另外您还可以将改变后的数据导出；</div>
                                </li>
                                <li class="item">
                                    <div class="title">所见即所得</div>
                                    <div class="desc">图表中每一个细节都可以灵活的配置，所有的操作都是可视化操作完成，真正做到所见即所得！</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img class="feature-img" src="/static/img/feature-1.png">
                </div>
            </div>
            <div class="help-box">
                <div class="container">
                    <h2 class="section-title">服务与支持</h2>
                    <ul class="help-list">
                        <li class="item">
                            <router-link to="/about">反馈问题、建议</router-link>
                        </li>
                        <li class="item">
                            <router-link to="/about">使用帮助</router-link>
                        </li>
                        <li class="item">
                            <router-link to="/about">模板定制</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted: function () {
        },
        methods: {
        }
    }
</script>
