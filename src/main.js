import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "./axios";
import qs from "qs"
Vue.config.productionTip = false
Vue.prototype.$qs=qs
Vue.prototype.$axios=axios
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
