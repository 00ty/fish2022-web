<template>
  <div>
    <van-action-sheet
      v-model:show="show.status"
      :closeable="false"
      :title="show.form === 'login' ? '登 录' : '注 册'"
    >
      <div class="content">
        <van-field
          v-if="show.form === 'register'"
          v-model="form.nickname"
          label="昵称"
          placeholder="在此输入"
        />
        <van-field v-model="form.username" label="用户名" placeholder="在此输入" />
        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="在此输入"
        />
        <div style="padding: 40px"></div>
        <div class="submit">
          <van-button type="primary" block round @click="submit"
            >立即{{ show.form === "login" ? "登录" : "注册" }}</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        password: "",
      },
    };
  },
  props: ["show"],
  methods: {
    // 提交表单
    submit() {
      if (this.show.form === "login") {
        this.login();
      } else {
        this.register();
      }
    },
    // 登录
    login() {
      /* this.$toast({
        message: "登录成功",
        position: "bottom",
      }); */
      this.$store.dispatch('setToken', Math.random().toString(36).substr(2,9));
      this.$router.push("/home");
    },
    // 注册
    register() {
      /* this.$toast({
        message: "注册成功，已为您自动登录",
        position: "top",
      }); */
      this.$store.dispatch('setToken', Math.random().toString(36).substr(2,9));
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.submit {
  padding-top: 40px;
  padding: 20px;
  padding-bottom: 30px;
}
</style>