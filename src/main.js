import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import VCharts from 'v-charts'
import QRCode from 'qrcode'
import 'iview/dist/styles/iview.css'
import './static/css/global.css'
Vue.use(iView)
Vue.use(VCharts)
Vue.use(QRCode)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
