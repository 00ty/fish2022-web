<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar
    :title="searchShow ? '' : '用户管理'"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    z-index="999"
    @click-left="onClickLeft"
  >
    <template #right>
      <van-field v-model="searchText" v-if="searchShow" placeholder="请输入账号" @blur="onBlurSearch"></van-field>
      <van-icon name="search" size="18" @click="onClickSearch" />
    </template>
  </van-nav-bar>
  <!-- 标签页 -->
  <van-tabs
    v-model:active="activeName"
    background="#d4e5ff"
    color="#1989fa"
    title-active-color="#1989fa"
    border
    @change="onChange"
  >
    <van-tab
      v-for="item in tabs"
      :key="item.name"
      :title="item.title"
      :name="item.name"
      ><Card class="user-list" shadow>
        <template #header>
          <a style="color: #1989fa" @click="add(this.name)"
            ><van-icon name="add-o" /> 添加用户</a
          >
          <van-popover
            v-model:show="showPopover"
            :actions="actions"
            @select="onSelect"
            placement="bottom-end"
          >
            <template #reference>
              <a style="color: #1989fa"><van-icon name="sort" /> 排序方式</a>
            </template>
          </van-popover>
        </template>
        <van-list
          v-model:loading="active.loading"
          :finished="active.finished"
          @load="onLoad"
          :finished-text="'你就这么点儿'+(activeName=='vip'?'会员':(activeName=='active'?'活跃':''))+'用户？'"
        >
          <ListItem
            v-for="item in active.userList"
            :key="item.id"
            :icon="item.icon"
            :title="item.title"
            :time="
              itemBottomLabel[active.itemBottom] +
              ': ' +
              item[active.itemBottom]
            "
            @click="goDetail(item.id)"
          />
        </van-list> </Card
    ></van-tab>
  </van-tabs>
</template>

<script>
import Card from "@/components/Card.vue";
import ListItem from "@/components/ListItem.vue";
export default {
  name: "User",
  data() {
    return {
      searchShow: false, // 搜索框是否显示
      searchText: "", // 搜索框内容
      activeName: "all", // 激活的标签页name
      // 标签页数据
      tabs: [
        {
          name: "all",
          title: "全部用户",
        },
        {
          name: "normal",
          title: "普通用户",
        },
        {
          name: "vip",
          title: "会员用户",
        },
        {
          name: "active",
          title: "今日活跃",
        },
      ],
      // 列表底部标签对应的字段名称
      itemBottomLabel: {
        time: "注册时间",
        vipTime: "VIP到期时间",
        money: "账户余额",
      },
      onLoadTimes: 0, // 加载次数
      // 用户列表数据库
      allListData: [],
      // 全部用户列表信息
      allUser: {
        userList: [], // 用户列表
        onLoadTimes: 0, // 加载次数
        loading: false, // 加载状态
        finished: false, // 是否加载完成
        sortName: "time", // 排序字段名称
        sortType: "desc", // 排序方式
        itemBottom: "time", // 列表底部标签默认值
      },
      // 普通用户列表信息
      normalUser: {
        userList: [], // 用户列表
        onLoadTimes: 0, // 加载次数
        loading: false, // 加载状态
        finished: false, // 是否加载完成
        sortName: "time", // 排序字段名称
        sortType: "desc", // 排序方式
        itemBottom: "time", // 列表底部标签默认值
      },
      // 会员用户列表信息
      vipUser: {
        userList: [], // 用户列表
        onLoadTimes: 0, // 加载次数
        loading: false, // 加载状态
        finished: false, // 是否加载完成
        sortName: "vip", // 排序字段名称
        sortType: "asc", // 排序方式
        itemBottom: "vipTime", // 列表底部标签默认值
      },
      // 今日活跃用户列表信息
      activeUser: {
        userList: [], // 用户列表
        onLoadTimes: 0, // 加载次数
        loading: false, // 加载状态
        finished: false, // 是否加载完成
        sortName: "time", // 排序字段名称
        sortType: "desc", // 排序方式
        itemBottom: "time", // 列表底部标签默认值
      },
      // 弹出框状态
      showPopover: false,
      // 弹出框文本
      actions: [
        {
          text: "注册时间-降序",
          name: "time",
          type: "desc",
        },
        {
          text: "注册时间-升序",
          name: "time",
          type: "asc",
        },
        {
          text: "会员时长-降序",
          name: "vipTime",
          type: "desc",
        },
        {
          text: "会员时长-升序",
          name: "vipTime",
          type: "asc",
        },
        {
          text: "金币数量-降序",
          name: "money",
          type: "desc",
        },
        {
          text: "金币数量-升序",
          name: "money",
          type: "asc",
        },
      ],
    };
  },
  computed: {
    // vip用户列表数据库
    vipListData() {
      return this.allListData.filter((item) => item.isVip === true);
    },
    // 普通用户列表数据库
    normalListData() {
      return this.allListData.filter((item) => item.isVip === false);
    },
    // 今日活跃用户列表数据库
    activeListData() {
      return this.allListData.filter((item) => item.isAction === true);
    },
    // 返回当前页面用户列表依赖的数据库
    activeData() {
      return this[this.activeName + "ListData"];
    },
    // 当前页面用户列表对象，用于获取当前页面列表信息及进行各项操作
    active() {
      return this[this.activeName + "User"];
    },
  },
  components: {
    Card,
    ListItem,
  },
  created() {
    this.getAllListData(); // 获取全部用户列表数据
    this.onLoad(); // 加载列表数据
  },
  methods: {
    // 导航栏返回上一页
    onClickLeft() {
      this.$router.back();
    },
    // 导航栏搜索按钮点击事件
    onClickSearch() {
      if (this.searchShow) {
        console.log(this.searchText);
      } else {
        this.searchShow = true;
      }
    },
    // 搜索框失去焦点事件
    onBlurSearch() {
      this.searchShow = false;
    },
    // 加载数据
    getAllListData() {
      let list = [];
      for (let i = 0; i < 33; i++) {
        let isVip = Math.random() > 0.5;
        let timeMonth = Math.floor(Math.random() * 13);
        let timeDay = Math.floor(Math.random() * 32);
        let time =
          (timeMonth < 10 ? "0" + timeMonth : timeMonth) +
          "-" +
          (timeDay < 10 ? "0" + timeDay : timeDay);
        let vipTimeMonth = Math.floor(Math.random() * 13);
        let vipTimeDay = Math.floor(Math.random() * 32);
        let vipTime =
          (vipTimeMonth < 10 ? "0" + vipTimeMonth : vipTimeMonth) +
          "-" +
          (vipTimeDay < 10 ? "0" + vipTimeDay : vipTimeDay);
        list.push({
          id: i,
          icon: "https://img01.yzcdn.cn/vant/logo.png",
          title: "用户 " + i,
          time: "2022-" + time,
          isVip,
          vipTime: isVip ? "2022-" + vipTime : null,
          money: Math.floor(Math.random() * 1000),
          isAction: Math.random() > 0.5,
        });
      }
      list.sort((a, b) => (a.time > b.time ? -1 : 1));
      this.allListData = list;
    },
    // 加载更多
    onLoad() {
      // 用定时器模拟加载数据
      setTimeout(() => {
        let temp = this.activeData.slice(
          this.active.onLoadTimes,
          (this.active.onLoadTimes += 10) // 截取10条数据并将加载次数加10
        );
        if (temp.length < 10) {
          // 如果加载的数据小于10，则全部加载完成
          this.active.finished = true;
        }
        // 将加载的数据添加到列表中,并且将加载状态改为false
        this.active.userList = this.active.userList.concat(temp);
        this.active.loading = false;
      }, 1000);
    },
    // 切换标签
    onChange(activeName) {
      this.onLoad();
    },
    // 添加用户
    add() {},
    // 切换排序事件
    onSelect(action) {
      // 切换当前页面排序字段及排序类型
      this.active.sortName = action.name;
      this.active.sortType = action.type;
      // 切换底部标签
      this.active.itemBottom = action.name;
      // 排序方式
      let value = action.type == "desc" ? -1 : 1;
      this.activeData.sort((a, b) => {
        // 如果会员到期时间为空，则以 0000-00-00 为值进行排序
        a = a[action.name] || "0000-00-00";
        b = b[action.name] || "0000-00-00";
        return a > b ? value : -value;
      });
      /* 重新加载列表 */
      this.active.onLoadTimes = 0; // 清空加载次数
      this.active.userList = []; // 清空列表
      this.active.finished = false; // 恢复全部加载状态为false
      this.active.loading = true; // 设置加载状态为true
      this.onLoad(); // 开始加载
    },
    // 跳转详情
    goDetail(id) {
      this.$router.push(`/store/user/detail/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.user-list {
  background-image: linear-gradient(#d4e5ff, #fff);
  border-radius: 0;
  border: none;
}
</style>