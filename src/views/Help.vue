<template>
    <my-page class="page page-help">
        <ui-header></ui-header>
        <div class="layout-body">
            <div class="container">
                <article class="article">
                    <h1>帮助</h1>
                    <h2></h2>
                    <p></p>
                </article>
            </div>
        </div>
        <ui-footer></ui-footer>
    </my-page>
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
