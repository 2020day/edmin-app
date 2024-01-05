import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookei, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 控制菜单栏的展开和收缩
    collapsed: false,
    // 用户的跨页面显示
    user: getUserCookie(),
    // 存储菜单权限
    menuRoutes: [],
  },
  getters: {
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userinfo) {
      state.user = userinfo;
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
    // 退出登录后置空
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userinfo) {
      commit('setUserInfo', userinfo);
      setUserCookei(userinfo);
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
  },
  modules: {
  },
});
