import Vue from 'vue'
import Picamera from './Picamera.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Picamera),
}).$mount('#picamera')