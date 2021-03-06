// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'iview/dist/styles/iview.css'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import {store} from './store/store'
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
