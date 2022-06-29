<template>
  <div>
    <van-cell title="俺有账号，点击登录" @click="login" />
    <div class="head">
      <img src="/static/login-head.png" />
      <div class="card-top">
        <h3>请扫码关注公众号</h3>
        回复关键字 <span style="color: red">code</span> 即可得到邀请码
      </div>
    </div>
    <div class="card">
      <div class="qrcode">
        <img src="/static/qrcode.jpg" />
      </div>
      <van-field
        v-model="code"
        label="邀请码"
        placeholder="在此输入邀请码"
      />
      <div class="submit">
        <van-button type="primary" block round @click="verifyCode"
          >验证</van-button
        >
      </div>
    </div>
    <div class="bottom">
      <a href=""> 木鱼后台用户协议 </a>
    </div>
		<Form :show="show"/>
  </div>
</template>
<script>
import Form from "@/components/user/Form.vue";
import api from "@/api";
export default {
  name: "Login",
  data() {
    return {
      // 邀请码
      code: "",
      // 表单显示状态及内容
			show: {
				status: false,
				form: 'login'
			},
    };
  },
	components: { Form },
  mounted() {
    document.querySelector("body").setAttribute("style", "background:#F2F3F7");
  },
  methods: {
    // 邀请码验证
    verifyCode() {
			this.show = {
				status: true,
				form: 'register'
			}
      // 为了能回到首页
     /*  this.$store.dispatch('setToken', 'test');
      this.$router.push("/home"); */
    },
    // 弹出登录
		login() {
			this.show = {
				status: true,
				form: 'login'
			};
		},
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
<style scoped>
.head {
  padding-top: 20px;
  padding-bottom: -10px;
  margin-bottom: -10px;
  background-color: #1989fa;
  text-align: center;
}
.head > img {
  max-width: 120px;
}
.card {
  background-color: #fff;
  padding: 10px;
  margin: 20px;
  margin-top: 0;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-top-color: #fff;
}
.submit {
  padding-top: 40px;
  padding: 20px;
  padding-bottom: 10px;
}
.card-top {
  background-color: #fff;
  padding: 10px;
  margin: 20px;
  margin-bottom: -4px;
  margin-top: -4px;
  border-bottom-color: #fff;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  text-align: center;
}
h3 {
  color: #4d636e;
}
.bottom {
  text-align: center;
  margin-top: 40px;
}
.bottom > a {
  font-size: 15px;
  color: #4d636e;
}
.qrcode {
  text-align: center;
}
.qrcode > img {
  max-width: 200px;
}
</style>