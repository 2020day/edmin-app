import Vue from 'vue';
import VCharts from 'v-charts';
// import axios from 'axios';
import Antd from 'ant-design-vue'; // 增加
import App from './App.vue';
import bus from './bus/index';
import router from './router';
import store from './store';
// 全局引入ant-design插件
import 'ant-design-vue/dist/antd.css';
// 引入基本样式
import './assets/css/reset.less';

// 各页面数据可以传递
Vue.prototype.bus = bus;
// axios.defaults.baseURL = 'https://mallapi.duyiedu.com/';
// Vue.prototype.$http = axios;
Vue.use(VCharts);
Vue.use(Antd); // Vue.use(Button)修改
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
