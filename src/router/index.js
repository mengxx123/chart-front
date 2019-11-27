import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Chart = resolve => require(['@/views/Chart'], resolve)

const Coin = resolve => require(['@/views/Coin'], resolve)
const CoinEx = resolve => require(['@/views/CoinEx'], resolve)
const Dice = resolve => require(['@/views/Dice'], resolve)
const Prime = resolve => require(['@/views/Prime'], resolve)

const ChartDetail = resolve => require(['@/views/ChartDetail'], resolve)
const ChartRadar = resolve => require(['@/views/ChartRadar'], resolve)
const ChartScatter = resolve => require(['@/views/ChartScatter'], resolve)
const ChartPie = resolve => require(['@/views/ChartPie'], resolve)
const ChartFunnel = resolve => require(['@/views/ChartFunnel'], resolve)
const Line = resolve => require(['@/views/Line'], resolve)
const Pie2 = resolve => require(['@/views/Pie2'], resolve)
const Gauge = resolve => require(['@/views/Gauge'], resolve)
const Map = resolve => require(['@/views/Map'], resolve)
const Map2 = resolve => require(['@/views/Map2'], resolve)
const Pictograph = resolve => require(['@/views/Pictograph'], resolve)
const Venn = resolve => require(['@/views/Venn'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        redirect: '/chart'
        // component: Home
    },
    {
        path: '/coin',
        component: Coin
    },
    {
        path: '/coin/ex',
        component: CoinEx
    },
    {
        path: '/dice',
        component: Dice
    },
    {
        path: '/prime',
        component: Prime
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/chart',
        component: Chart
    },
    {
        path: '/chart/radar',
        component: ChartRadar
    },
    {
        path: '/chart/pie',
        component: ChartPie
    },
    {
        path: '/chart/funnel',
        component: ChartFunnel
    },
    {
        path: '/chart/scatter',
        component: ChartScatter
    },
    {
        path: '/chart/:type',
        component: ChartDetail
    },
    {
        path: '/line',
        component: Line
    },
    {
        path: '/gauge',
        component: Gauge
    },
    {
        path: '/pie2',
        component: Pie2
    },
    {
        path: '/venn',
        component: Venn
    },
    {
        path: '/map',
        component: Map
    },
    {
        path: '/map2',
        component: Map2
    },
    {
        path: '/pictograph',
        component: Pictograph
    }
]

export default new Router({
    mode: 'history',
    routes: routes
})
