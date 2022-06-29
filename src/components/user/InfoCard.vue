<template>
  <div>
    <div class="head">
      <div class="user">
        <div class="nick">污橘</div>
        <div class="grade">普通用户</div>
        <div class="grade" style="margin-top: 0">注册时间：2022/4/23</div>
      </div>
      <div class="avatar">
        <img src="http://q1.qlogo.cn/g?b=qq&nk=1691954622&s=640" />
      </div>
    </div>
    <div class="suggest">
      <van-button
        type="primary"
        icon="smile-comment-o"
        plain
        hairline
        block
        url="https://support.qq.com/products/403719?"
      >
        有建议，告诉我
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userDate"],
  data() {
    return {
      user: {
        uname: "",
        password: "",
      },
    };
  },
  created() {
    console.log(this.userDate);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.head {
  margin: 10px;
  margin-top: 30px;
  padding: 10px 10px;
  color: #fff;
  background-color: #1989fa;
  border-radius: 5px;
  display: flex;
  .user {
    flex-basis: 80%;
    .nick {
      margin-left: 10px;
      font-size: 16px;
			span {
				font-size: 20px;
			}
    }
    .grade {
      margin-left: 10px;
      margin-top: 10px;
      font-size: 13px;
      color: #eee;
    }
  }
  .avatar {
    img {
      max-width: 80px;
      border-radius: 80px;
    }
  }
}
.suggest {
  padding: 20px;
  padding-top: 40px;
}
</style>