<template>
  <div>
    这是parent测试组件
    <button @click="tanChu">点击出现juanLoginAlert弹窗</button>
  </div>
</template>

<script>

export default {
  name: "Parent",
  components: {

  },
  methods: {
    tanChu() {
      this.$juanLoginAlert('你好');
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
