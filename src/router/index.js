import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
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
import Pictograph from '@/components/pictograph'
import Venn from '@/components/Venn'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
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
})
