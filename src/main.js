// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

let signalR = require('./signalr-client-1.0.0-alpha2-final')

Vue.config.productionTip = false
Vue.prototype.$signalR = signalR;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
