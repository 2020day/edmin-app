<template>
  <div class="add_box">
    <a-steps :current="current" class="steps_i">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-information v-if="current === 0" @next="next"></basic-information>
      <sales-message v-else @befor="prev" @over="next"></sales-message>
    </div>
  </div>
</template>
<script>
import basicInformation from './basicInformation.vue';
import SalesMessage from './salesMessage.vue';

export default {
  components: { basicInformation, SalesMessage },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      // 基本信息表单
      basicForm: {},
      // 销售信息表单
      salesForm: {},
      Form: {
        ...this.basicForm,
        ...this.salesForm,
      },
    };
  },
  methods: {
    next(basicForm) {
      this.basicForm = basicForm;
      if (this.current === 1) {
        //
      } else {
        this.bus.$emit('mysalesForm', this.salesForm);
        this.current += 1;
      }
    },
    prev(salesForm) {
      this.salesForm = salesForm;
      this.bus.$emit('mybasicForm', this.basicForm);
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.add_box {
  .steps_i {
    width: 70%;
    margin: 10px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
