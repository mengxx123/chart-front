import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Chart = resolve => require(['@/views/Chart'], resolve)
const ChartDetail = resolve => require(['@/views/ChartDetail'], resolve)
const Radar = resolve => require(['@/views/Radar'], resolve)
const Line = resolve => require(['@/views/Line'], resolve)
const Pie = resolve => require(['@/views/Pie'], resolve)
const Pie2 = resolve => require(['@/views/Pie2'], resolve)
const Gauge = resolve => require(['@/views/Gauge'], resolve)
const Scatter = resolve => require(['@/views/Scatter'], resolve)
const Funnel = resolve => require(['@/views/Funnel'], resolve)
const Map = resolve => require(['@/views/Map'], resolve)
const Map2 = resolve => require(['@/views/Map2'], resolve)
const Pictograph = resolve => require(['@/views/Pictograph'], resolve)
const Venn = resolve => require(['@/views/Venn'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const About = resolve => require(['@/views/About'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        redirect: '/chart'
        // component: Home
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
        path: '/chart/:type',
        component: ChartDetail
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/radar',
        component: Radar
    },
    {
        path: '/help',
        component: Help
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
        path: '/pie',
        component: Pie
    },
    {
        path: '/pie2',
        component: Pie2
    },
    {
        path: '/scatter',
        component: Scatter
    },
    {
        path: '/venn',
        component: Venn
    },
    {
        path: '/funnel',
        component: Funnel
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
