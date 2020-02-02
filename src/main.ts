import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.echarts = echarts;
Vue.prototype.axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
