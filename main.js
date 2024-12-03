import Vue from 'vue'
import App from './App'
import moment from './moment.js'
Vue.config.productionTip = false

// import cuCustom from './colorui/components/cu-custom.vue'
// Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
