import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './lib/vants'
import 'vant/lib/index.css'
import '@/styles/index.less'
import 'amfe-flexible'
import * as filters from '@/utils/dayjs'

Object.keys(filters).forEach(i => {
  Vue.filter(i, filters[i])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
