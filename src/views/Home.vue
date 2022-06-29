<template>
  <div class="home">
    <!-- 渐变背景 -->
    <div class="top">
      <!-- 公告 -->
      <van-notice-bar
        left-icon="volume-o"
        text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
      />
    </div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!-- 剩余仓库 -->
    <Card class="store-num" shadow>
      <p style="float: right; color: #1989fa">{{ store }}</p>
      <p>剩余仓库</p>
      <van-progress :percentage="store" :show-pivot="false" />
    </Card>
    <!-- 工具列表 -->
    <Card class="tool-list" header="工具列表" :bodyStyle="bodyStyle" shadow>
      <div class="tool-item" v-for="item in 4" :key="item">
        <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        <p>123</p>
      </div>
      <van-button class="my-button" type="primary" block round @click="goDoc"
        >查阅文档</van-button
      >
    </Card>
    <!-- 仓库列表 -->
    <Card class="store-list" shadow>
      <template #header>
        <p>我的仓库</p>
        <a style="color: #1989fa" @click="add"
          ><van-icon name="add-o" /> 添加仓库</a
        >
      </template>
      <van-list v-model:loading="loading" :finished="finished">
        <ListItem
          v-for="item in storeList"
          :key="item.id"
          :icon="item.icon"
          :title="item.title"
          :time="item.time"
          @click="goDetail(item.id)"
        />
        <template #finished>
          <span v-if="allFinished">没有更多了</span>
          <van-button v-else type="primary" block round @click="onLoad"
            >加载更多</van-button
          >
        </template>
      </van-list>
    </Card>
    <!-- 底部占位使仓库列表不被遮挡 -->
    <div style="height: 51px"></div>
    <!-- 添加仓库弹出层 -->
    <van-popup
      v-model:show="show"
      teleport="body"
      :close-on-click-overlay="false"
      @closed="close()"
    >
      <van-cell title="添加仓库" />
      <van-form
        @submit="onSubmit"
        validate-trigger="onSubmit"
        style="width: 90vw"
        ref="vanForm"
      >
        <van-cell-group inset>
          <van-field
            v-model="newStore"
            name="仓库"
            placeholder="请输入仓库名称"
            :rules="[{ required: true, message: '请填写仓库名称' }]"
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
          <van-button type="primary" native-type="submit" round style="flex: 1">
            确认添加
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import ListItem from "@/components/ListItem.vue";
export default {
  data() {
    return {
      store: 50, // 剩余仓库
      // 工具列表卡片body样式
      bodyStyle: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
      },
      loading: false, // 加载状态
      finished: true, // 是否加载完成
      allFinished: false, // 是否全部加载完成
      // 加载次数
      onLoadTimes: 0,
      // 仓库列表
      storeList: [],
      // 仓库列表数据库
      storeListData: [
        {
          id: 1,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "仓库名称",
          time: "2020-01-01",
        },
        {
          id: 2,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "仓库名称",
          time: "2020-01-01",
        },
        {
          id: 3,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "仓库名称",
          time: "2020-01-01",
        },
        {
          id: 4,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "仓库名称",
          time: "2020-01-01",
        },
        {
          id: 5,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "仓库名称",
          time: "2020-01-01",
        },
        {
          id: 6,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "仓库名称",
          time: "2020-01-01",
        },
      ],
      newStore: "", // 新增仓库名称
      show: false, // 是否显示添加仓库弹出层
    };
  },
  components: { Card, ListItem },
  computed: {
    // 剩余仓库百分比
    percentage() {
      return this.store / 100;
    },
  },
  created() {
    this.onLoad();
  },
  methods: {
    // 加载更多
    onLoad() {
      // 将加载状态设置为true并将加载完成状态设置为false，否则不会触发加载事件
      this.finished = false;
      this.loading = true;
      // 用setTimeout模拟加载数据
      setTimeout(() => {
        let temp = this.storeListData.slice(
          this.onLoadTimes,
          this.onLoadTimes + 5
        );
        this.onLoadTimes += 5;
        if (temp.length < 5) { // 如果加载的数据小于5，则全部加载完成
          this.allFinished = true;
        }
        this.storeList = this.storeList.concat(temp);
        // 加载完成后恢复加载状态及加载完成状态
        this.loading = false;
        this.finished = true;
      }, 1000);
    },
    // 打开添加仓库弹出层
    add() {
      this.show = true;
    },
    // 弹窗表单验证通过后触发事件
    onSubmit(e) {
      this.storeListData.push({
        id: this.storeListData.length + 1,
        icon: "https://img01.yzcdn.cn/vant/logo.png",
        title: this.newStore,
        time: "2020-01-01",
      });
      if (this.allFinished) {
        this.finished = false;
        this.loading = true;
        setTimeout(() => {
          this.storeList.push(this.storeListData.slice(-1)[0]);
          this.loading = false;
          this.finished = true;
        }, 1000);
      }
      this.show = false;
    },
    // 关闭弹窗后触发事件
    close() {
      this.newStore = "";
      this.$refs.vanForm.resetValidation();
    },
    // 查阅文档
    goDoc() {
      console.log("查阅文档");
    },
    // 跳转仓库详情
    goDetail(id) {
      this.$router.push({
        path: "/store",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.my-swipe,
.card {
  width: 90%;
  margin: 0 auto;
  border-radius: 25px;
}
.top {
  width: 100%;
  height: 150px;
  margin-bottom: -80px;
  background: linear-gradient(to right, #59cde7, #1989fa);
  color: #fff;
}
.my-swipe {
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.store-num {
  background-color: #d6e3ff;
  padding-top: 20px;
  margin-top: -30px !important;
  position: relative;
  z-index: 1;
}
.my-swipe,
.store-num {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  p {
    line-height: 30px;
  }
}
.tool-list {
  padding: 30px 0 50px;
  margin-top: -30px;
  position: relative;
  z-index: 0;
  .tool-item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 80px;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      display: inline-block;
    }
  }
  .my-button {
    margin-top: 10px;
  }
}
.store-list {
  background-image: linear-gradient(#d4e5ff, #fff);
  margin-top: -40px;
  position: relative;
  z-index: 1;
}
</style>