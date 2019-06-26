import Vue from 'vue'
import Camera from './Camera.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Camera),
}).$mount('#camera')