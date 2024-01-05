<template>
  <div>
    <a-form-model
      ref="salesFormRef"
      :model="salesForm"
      :rules="salesFormRules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" prop="price">
        <a-input v-model="salesForm.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="salesForm.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory">
        <a-input v-model="salesForm.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit">
        <a-input v-model="salesForm.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="`https://mallapi.duyiedu.com/upload/images?appk=${$store.state.user.appkey}`"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avator"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal> -->
      </a-form-model-item>
      <a-form-model-item class="next_btn" label=" ">
        <a-button @click="befor">上一步</a-button>
        <a-button type="primary" @click="over">完成</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salesForm: {
        price: 19.9,
        price_off: '',
        inventory: 100,
        unit: 'g',
        images: '',
      },
      // 规则
      salesFormRules: {
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        inventory: [{ required: true, message: '请输入库存量', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
      },
      fileList: [],
      loading: false,
    };
  },
  methods: {
    befor() {
      this.$emit('befor', this.salesForm);
    },
    over() {
      this.$emit('over', this.salesForm);
    },
    handlePreview() {},
    handleChange() {},
  },
  mounted() {
    this.bus.$on('mysalesForm', (val) => {
      this.salesForm = val;
    });
  },
};
</script>

<style></style>
