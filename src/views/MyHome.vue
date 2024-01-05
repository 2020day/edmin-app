<template>
  <div class="home">
    <!-- 菜单 -->
    <left-menu :key="key"></left-menu>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <!-- 头部 -->
      <silder-nav />
      <!-- 内容区域 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftMenu from './components/MyMenu.vue';
import silderNav from './components/MyHeader.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    leftMenu,
    silderNav,
  },
  methods: {},
};
</script>
<style lang="less">
@import url(../assets/css/home.less);
</style>
