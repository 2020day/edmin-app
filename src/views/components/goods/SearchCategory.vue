<template>
  <div class="search_box">
    <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="输入关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字"> </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="请选择商品类目"
          allowClear
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
        <router-link :to="{ name: 'goodsAdd' }">
          <a-button type="primary" class="addgoods"> 添加商品 </a-button>
        </router-link>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/category';

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
      categoryList: [],
      // 类目的映射
      categoryObj: {},
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    // 获取类目列表
    async getCategoryList() {
      const data = await api.list(this.searchForm);
      this.categoryList = await data.data.data.data;
      await data.data.data.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
      this.bus.$emit('getCategoryObj', this.categoryObj);
    },
    // 点击搜索时调用的函数
    handleSubmit() {
      // 往数据表格页面传递数据
      this.bus.$emit('getSearchForm', this.searchForm);
    },
    // 选择框改变时候调用函数
    handleChange(val) {
      // console.log(val);
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less" scoped>
.search_box {
  padding: 13px 30px;
  .addgoods {
    position: relative;
    top: 0;
    left: 100px;
  }
}
</style>
