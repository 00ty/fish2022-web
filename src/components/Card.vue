<template>
  <div class="card" :class="shadow ? 'is-shadow' : ''">
    <div
      class="card-header"
      :class="headerBorder ? 'header-border' : ''"
      v-if="$slots.header || header"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="card-body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: Boolean,
    },
    headerBorder: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.card-header {
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-border {
  border-bottom: 1px solid #ebeef5;
}
.card-body {
  transition: 0.3s;
  padding: 10px 20px;
}
.is-shadow {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>