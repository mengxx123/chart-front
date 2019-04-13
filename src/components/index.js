import header from './header'
import footer from './footer'
import colorPicker from './colorPicker.vue'
import page from './page'
import appList from './app-list'

export default {
    install: function (Vue) {
        Vue.component('ui-header', header)
        Vue.component('ui-footer', footer)
        Vue.component('colorPicker', colorPicker)
        Vue.component('my-page', page)
        Vue.component('app-list', appList)
    }
}
