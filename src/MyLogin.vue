<template>
  <div class="login_box">
    <a-form-model
      class="login_form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm()"> 登录 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm()"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import axios from './axios';

export default {
  data() {
    // 自定义邮箱
    const checkEmail = (role, value, cd) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9 -])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cd();
      }
      cd(new Error('请输入合法邮箱'));
      return true;
    };
    return {
      loginForm: {
        email: '2559192550@qq.com',
        password: 'tian2020',
      },
      loginFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    // 登录按钮
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return true;
        }
        const data = await axios.post('/passport/login', this.loginForm);
        if (data.data.status !== 'success') {
          return this.$message.error('登录失败');
        }
        // console.log(data.data);
        this.$message.success('登录成功');
        this.$store.dispatch('setUserInfo', data.data.data);
        this.$router.push('/home');
        return true;
      });
    },
    // 重置按钮
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
@import url(./assets/css/login.less);
</style>
