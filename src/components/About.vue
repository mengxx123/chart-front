<template>
    <div class="page page-about">
        <ui-header></ui-header>
        <div class="page-body">
            <div class="container container-main">
                <article class="article">
                    <h1>关于</h1>
                    <div>云设图+ 是一个在线图表编辑器，只需要简单的三步：导入数据，选择模板，设置参数即可创建强大的交互性图表，图表中所有的内容都可以通过可视化操作来配置或修改，真正做到所见即所得！</div>

                    <h2>更新日志</h2>
                    <p>v 0.03 - 2017/09/06</p>
                    <p>v 0.02 - 2017/08/11</p>
                    <p>v 0.01 - 2017/07/18</p>

                    <h2>联系方式</h2>
                    <p>您可以通过下面的联系方式与我们取得联系：</p>
                    <p>邮箱：<a href="mailto:admin@yunser.com">admin@yunser.com</a></p>
                    <p>Q Q：1418503647</p>
                </article>
            </div>
        </div>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
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

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
