<template>
  <div class="login-box">
    <a-form-model class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
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
        email: '',
        password: '',
      },
      // 验证规则
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
    };
  },
  methods: {
    // 登录按钮
    submitForm() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) {
          return true;
        }
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
