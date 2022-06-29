<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="配置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 配置列表 -->
    <van-cell
      v-for="item in list"
      :key="item"
      :title="item.title"
      clickable
      size="large"
      @click="edit(item)"
    >
      <template v-if="typeof item.value == 'boolean'" #right-icon>
        <van-switch v-model="item.value" size="24" />
      </template>
      <template v-else #value>
        <span>{{ item.value }}{{item.unit}}</span>
      </template>
    </van-cell>
    <!-- 修改配置弹出层 -->
    <van-popup
      v-model:show="show"
      teleport="body"
      :close-on-click-overlay="false"
      @closed="close()"
    >
      <van-cell :title="editItem.title" />
      <van-form @submit="onSubmit" validate-trigger="onSubmit" style="width: 90vw" ref="vanForm">
        <van-cell-group inset>
          <van-field
            v-model="editItem.newValue"
            :name="editItem.title"
            :placeholder="' 请输入' + editItem.title"
            :rules="[{ required: true, message: '请填写' + editItem.title }]"
          >
          <!-- 右侧单位 -->
          <template #extra>
            {{ editItem.unit }}
          </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px; display: flex;">
          <van-button type="warning" round style="flex:1" @click="this.show= false"> 取消 </van-button>
          <van-button type="primary" native-type="submit" round style="flex:1">
            确认修改
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "StoreSetting",
  data() {
    return {
      // 配置列表
      list: [
        {
          title: "仓库名称",
          value: "仓库名称",
        },
        {
          title: "软件版本",
          value: "v1.0.0",
        },
        {
          title: "注册送会员",
          value: "0",
          unit: "天",
        },
        {
          title: "邀请送会员",
          value: "0",
          unit: "天",
        },
        {
          title: "注册送金币",
          value: "0",
        },
        {
          title: "邀请送金币",
          value: "0",
        },
        {
          title: "签到送金币",
          value: "0",
        },
        {
          title: "允许注册",
          value: true,
        },
        {
          title: "允许邀请",
          value: true,
        },
        {
          title: "允许签到",
          value: true,
        },
        {
          title: "允许反馈",
          value: true,
        },
        {
          title: "会员获币倍数",
          value: "1.00",
        },
      ],
      show: false, // 是否显示编辑弹窗
      editItem: {}, // 当前编辑项
    };
  },
  methods: {
    // 导航栏返回上一页
    onClickLeft() {
      this.$router.back();
    },
    // 编辑按钮点击事件
    edit(item) {
      if (typeof item.value == "boolean") {
        item.value = !item.value;
      } else {
        this.editItem = item;
        this.editItem.newValue = this.editItem.value;
        this.show = true;
      }
    },
    // 关闭弹窗后触发事件
    close() {
      this.editItem.newValue = "";
      this.editItem = {};
      this.$refs.vanForm.resetValidation();
    },
    // 弹窗表单验证通过后触发事件
    onSubmit(e) {
      this.editItem.value = this.editItem.newValue;
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>