<template>
  <div class="store-item">
    <i class="icon"><img :src="icon" /></i>
    <div class="body">
      <div>{{ title }}</div>
      <div>{{ time }}</div>
    </div>
    <van-icon name="arrow" color="#1989fa"/>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["icon", "title", "time"],
};
</script>

<style lang="less" scoped>
.store-item {
  &:active {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);
  }
  background-color: #fff;
  border-radius: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  .icon {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .body {
    flex-grow: 1;
    margin-left: 5px;
    line-height: 22px;
  }
}
</style>