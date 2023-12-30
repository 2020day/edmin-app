import Vue from 'vue';
import Antd from 'ant-design-vue'; // 增加
import App from './App.vue';
import router from './router';
import store from './store';
// 全局引入ant-design插件
import 'ant-design-vue/dist/antd.css';
// 引入基本样式
import './assets/css/reset.less';

Vue.use(Antd); // Vue.use(Button)修改
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
