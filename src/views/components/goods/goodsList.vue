<template>
  <div class="goodsList">
    <!-- 搜索区域 -->
    <my-search />
    <!-- 表格区域 -->
    <my-table />
  </div>
</template>

<script>
import MySearch from './SearchCategory.vue';
import MyTable from './goodsListTable.vue';

export default {
  data() {
    return {};
  },
  components: {
    MySearch,
    MyTable,
  },
};
</script>

<style></style>
