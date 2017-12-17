import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Chart from '@/components/Chart'
import Bar from '@/components/Bar'
import Radar from '@/components/Radar'
import Line from '@/components/Line'
import Pie from '@/components/Pie'
import Pie2 from '@/components/Pie2'
import Gauge from '@/components/Gauge'
import Scatter from '@/components/Scatter'
import Funnel from '@/components/Funnel'
import Map from '@/components/Map'
import Map2 from '@/components/Map2'
import Pictograph from '@/components/Pictograph'
import Venn from '@/components/Venn'

import Help from '@/components/Help'
import About from '@/components/About'

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/chart',
        component: Chart
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/bar',
        component: Bar
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
