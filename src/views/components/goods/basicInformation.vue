<template>
  <div class="basic_form">
    <a-form-model
      ref="basicFormRef"
      :model="basicForm"
      :rules="basicFormRules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="标题" prop="title">
        <a-input v-model="basicForm.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input type="textarea" v-model="basicForm.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select v-model="basicForm.category" placeholder="选择商品类目" @change="handleChange">
          <a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
        <!-- 子类目 -->
        <a-select v-model="basicForm.c_items" placeholder="选择所属子类目">
          <a-select-option v-for="child in categoryItem" :key="child" :value="child">
            {{ child }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="标签" prop="tags">
        <a-select
          mode="tags"
          placeholder="选择标签"
          :default-value="['包邮，最晚次日到达']"
          v-model="basicForm.tags"
        >
          <a-select-option value="">
            {{ ' 包邮，最晚次日到达' }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="next_btn" label=" ">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      basicForm: {
        title: '',
        desc: '',
        category: '',
        c_items: '',
        tags: '',
      },
      categoryList: [],
      categoryItem: [],
      basicFormRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        category: [{ required: true, message: '请选择类目', trigger: 'blur' }],
        // tags: [{ required: true, message: '标签不能为空', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const data = await categoryApi.list();
      this.categoryList = data.data.data.data;
    },
    handleChange(val) {
      this.categoryList.forEach((item) => {
        if (item.id === val) {
          this.categoryItem = item.c_items;
        }
      });
    },
    next() {
      this.$refs.basicFormRef.validate((valid) => {
        if (valid) {
          console.log(this.basicForm);
          this.$emit('next', this.basicForm);
        } else {
          this.$message.error('请填写必要的信息');
        }
      });
    },
  },
  mounted() {
    this.bus.$on('mybasicForm', (val) => {
      this.basicForm = val;
    });
  },
};
</script>

<style lang="less" scoped>
.next_btn {
  text-align: center;
  // position: relative;
  // left: 18%;
}
</style>
