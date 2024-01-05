import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/MyHome.vue';
import MyLogin from '../MyLogin.vue';
import getMenuRoute from '../utils/premission';

Vue.use(VueRouter);
// eslint-disable-next-line no-unused-vars
const ayncRuterMap = [
  {
    path: '/goods',
    name: 'goods',
    meta: { title: '商品', hidden: false, icon: 'shop' },
    component: Home,
    children: [{
      path: '/goodsList',
      name: 'goodsList',
      meta: { title: '商品列表', hidden: false, icon: 'bars' },
      component: () => import('../views/components/goods/goodsList.vue'),
    },
    {
      path: '/goodsAdd',
      name: 'goodsAdd',
      meta: { title: '添加商品', hidden: false, icon: 'plus-square' },
      component: () => import('../views/components/goods/goodsAdd.vue'),
    },
    {
      path: '/editGoods/:id',
      name: 'editGoods',
      meta: { title: '修改商品', hidden: true, icon: 'plus-square' },
      component: () => import('../views/components/goods/goodsAdd.vue'),
    },
    {
      path: '/goodsCategrey',
      name: 'goodsCategrey',
      meta: { title: '商品类目', hidden: false },
      component: () => import('../views/components/goods/goodsCategrey.vue'),
    },
    ],
  },
];

const routes = [
  // 如果用户访问根目录，会自动重定位到login网页里面
  { path: '/', redirect: '/login', meta: { title: '登录', hidden: true } },
  {
    path: '/login', name: 'login', meta: { title: '登录', hidden: true }, component: MyLogin,
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页', hidden: false, icon: 'home' },
    component: Home,
    children: [{
      path: '/homePage',
      meta: { title: '统计', hidden: false, icon: 'book' },
      name: 'homePage',
      component: () => import('../views/components/homePage/pageIndex.vue'),
    }],
  },
];

const router = new VueRouter({
  routes,
});
// 路由拦截器
let isAddRouter = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey
      && store.state.user.role && store.state.user.email) {
      // 调用函数访问用户有权限的页面
      if (!isAddRouter) {
        const menuRoutes = getMenuRoute(store.state.user.role, ayncRuterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRouter = !isAddRouter;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
