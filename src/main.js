// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mui from 'vue-awesome-mui'
import vueHashCalendar from 'vue-hash-calendar'
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
Vue.config.productionTip = false
Vue.use(vueHashCalendar)
Vue.use(Mui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
