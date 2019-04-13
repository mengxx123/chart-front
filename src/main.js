import Vue from 'vue'
import App from './App'
import router from './router'
import ui from './components'
import './scss/main.scss'

Vue.config.productionTip = false

Vue.use(ui)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
