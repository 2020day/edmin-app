<template>
  <div class="main-header">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ''
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: currentRoute[1].name }">{{
            currentRoute[1] ? currentRoute[1].meta.title : ''
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户信息 -->
    <div class="user-info">
      <li>
        欢迎{{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li class="logout" @click="logout" @keydown.enter="handleKeyDown">退出</li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: [],
    };
  },
  // 监听事件经过函数
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  created() {
    this.getCurrenRoute();
  },
  methods: {
    // 页面加载前得到面包屑数据
    getCurrenRoute() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
    // 调用菜单展开和收缩的函数
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
      this.$message.success('退出成功');
    },
    handleKeyDown() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
      this.$message.success('退出成功');
    },
  },
};
</script>

<style></style>
