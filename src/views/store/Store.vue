<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="store">
      <!-- 顶部导航栏 -->
      <van-nav-bar
        title="仓库名称"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="setting-o" size="17" />
        </template>
      </van-nav-bar>
      <!-- 仓库 token 栏 -->
      <van-notice-bar color="#fff" background="#1989fa" style="height: 40px">
        <template #left-icon>
          <span
            style="
              margin-right: 5px;
              background: #ecf9ff;
              color: #1989fa;
              border-radius: 25px;
              padding: 0 5px;
            "
            >仓库 token</span
          >
        </template>
        <template #right-icon>
          <van-button
            type="primary"
            icon="description"
            size="small"
            style="background-color: #ecf9ff; color: #1989fa"
            ref="copyButton"
            >复制</van-button
          >
          <van-button
            type="primary"
            icon="replay"
            size="small"
            style="margin-left: 10px; background-color: #ecf9ff; color: #1989fa"
            @click="refreshToken"
            >更新</van-button
          >
        </template>
        {{ token }}</van-notice-bar
      >
      <!-- 仓库公告栏 -->
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        mode="link"
        @click="editNotice"
      >
        <template #left-icon>
          <span
            style="
              margin-right: 5px;
              background: #1989fa;
              color: #fff;
              border-radius: 25px;
              padding: 0 5px;
            "
            >公告设置</span
          >
        </template>
        {{ notice.value }}</van-notice-bar
      >
      <!-- 仓库数据统计 -->
      <Card class="info-view" :bodyStyle="dataBodyStyle" headerBorder>
        <template #header>
          <span><van-icon name="chart-trending-o" /> 数据统计</span>
          <van-icon
            :name="dataCardStatus ? 'arrow-up' : 'arrow-down'"
            @click="changeDataStatus"
            style="color: #1989fa"
          />
        </template>
        <van-grid :column-num="2" :border="false" ref="vanGrid">
          <van-grid-item v-for="(item, index) in dataList" :key="index">
            <Card class="data-item">
              <template #header>
                <span>{{ item.name }}</span>
                <van-icon :name="item.icon" />
              </template>
              <h2>{{ item.value }}</h2>
            </Card>
          </van-grid-item>
        </van-grid>
      </Card>
      <!-- 仓库功能列表 -->
      <van-grid
        :column-num="3"
        class="handle-item"
        :border="false"
        style="width: 90%; margin: 0 auto"
      >
        <van-grid-item v-for="(item, index) in handleList" :key="index">
          <Card
            :bodyStyle="{
              padding: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }"
            @click="handleClick(item)"
          >
            <img :src="item.img" />
            <span>{{ item.name }}</span>
          </Card>
        </van-grid-item>
      </van-grid>
      <!-- 设置公告弹出层 -->
      <van-popup
        v-model:show="show"
        teleport="body"
        :close-on-click-overlay="false"
        @closed="close()"
      >
        <van-cell title="公告设置" />
        <van-form
          @submit="onSubmit"
          validate-trigger="onSubmit"
          style="width: 90vw"
          ref="vanForm"
        >
          <van-cell-group inset>
            <van-field
              v-model="notice.newValue"
              type="textarea"
              rows="1"
              autosize
              name="公告"
              placeholder="请输入公告"
              :rules="[{ required: true, message: '请填写公告' }]"
            />
          </van-cell-group>
          <div style="margin: 16px; display: flex">
            <van-button
              type="warning"
              round
              style="flex: 1"
              @click="this.show = false"
            >
              取消
            </van-button>
            <van-button
              type="primary"
              native-type="submit"
              round
              style="flex: 1"
            >
              确认修改
            </van-button>
          </div>
        </van-form>
      </van-popup>
    </div>
  </van-config-provider>
</template>

<script>
import Card from "@/components/Card.vue";
import setCopy from "@/utils/setCopy.js";
export default {
  name: "Store",
  data() {
    return {
      dataCardStatus: true, // 数据统计折叠状态
      maxHeight: "auto", // 数据统计高度
      token: "", // 仓库 token
      // 仓库公告
      notice: {
        value: "米袋虽空——樱花开哉！",
        newValue: "",
      },
      show: false, // 公告弹出层显示状态
      // 仓库数据统计列表
      dataList: [
        {
          name: "用户统计",
          icon: "friends-o",
          value: "0",
        },
        {
          name: "会员统计",
          icon: "vip-card-o",
          value: "0",
        },
        {
          name: "今日签到",
          icon: "sign",
          value: "0",
        },
        {
          name: "在线人数",
          icon: "user-o",
          value: "0",
        },
      ],
      // 仓库功能列表
      handleList: [
        {
          name: "用户管理",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/user",
        },
        {
          name: "卡密系统",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/cdkey",
        },
        {
          name: "用户反馈",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/feedback",
        },
        {
          name: "兑换系统",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/exchange",
        },
        {
          name: "远程文档",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/doc",
        },
        {
          name: "商城系统",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/shop",
        },
        {
          name: "抽奖系统",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store/lottery",
        },
        {
          name: "敬请期待",
          img: "https://img01.yzcdn.cn/vant/logo.png",
          path: "/store",
        },
      ],
      // vant 自定义主题
      themeVars: {
        gridItemContentBackgroundColor: "rgba(0,0,0,0)", // 卡片内容背景色
      },
    };
  },
  components: {
    Card,
  },
  computed: {
    // 设置最大高度使可以呈现过渡动画
    dataBodyStyle() {
      return this.dataCardStatus
        ? { maxHeight: this.maxHeight }
        : { maxHeight: 0, padding: "0 20px" };
    },
  },
  created() {
    this.refreshToken();
  },
  mounted() {
    // 获取数据统计高度
    this.maxHeight = this.$refs.vanGrid.$el.clientHeight + "px";
    // 设置复制按钮及内容
    setCopy(this.$refs.copyButton.$el, this.token);
  },
  methods: {
    // 改变数据统计折叠状态
    changeDataStatus() {
      this.dataCardStatus = !this.dataCardStatus;
    },
    // 导航栏返回上一页
    onClickLeft() {
      this.$router.back();
    },
    // 导航栏右侧按钮点击事件
    onClickRight() {
      this.$router.push("/store/setting");
    },
    // 更新token
    refreshToken() {
      this.token = Math.random().toString(36).substr(2, 9);
    },
    // 打开公告弹出层
    editNotice() {
      this.notice.newValue = this.notice.value;
      this.show = true;
    },
    // 关闭弹窗后触发事件
    close() {
      this.notice.newValue = "";
      this.$refs.vanForm.resetValidation(); // 重置表单验证
    },
    // 弹窗表单验证通过后触发事件
    onSubmit(e) {
      this.notice.value = this.notice.newValue;
      this.show = false;
    },
    // 仓库功能列表点击事件
    handleClick(item) {
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="less" scoped>
.store {
  width: 100%;
  .card {
    width: 90%;
    margin: 0 auto;
  }
  .info-view {
    margin: 20px auto 0;
    background: #ecf9ff;
    color: #1989fa;
    .van-grid-item {
      margin-top: -8px;
      margin-bottom: -8px;
      .data-item {
        width: 100%;
        color: #fff;
        background-image: linear-gradient(to bottom right, #3eb3ff, #6dd5fa);
      }
    }
  }
  .handle-item {
    .van-grid-item {
      margin-bottom: -16px;
      .card {
        width: 100%;
        background: #ecf9ff;
        img {
          width: 50%;
          height: 50%;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>