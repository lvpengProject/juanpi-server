<template>
  <p class="juan-notice" v-text="message"></p>
</template>

<script>
export default {
  name: "JuanNotice",
  data() {
      return {
        message: '',
      }
  },
  mounted() {
    setTimeout(() =>{
      this.$destroy(true);
      document.body.removeChild(this.$el);
    }, 1000)
  }
}
</script>

<style lang="stylus">
  .juan-notice
    position: fixed
    top: 30%
    left: 50%
    transform: translateX(-50%)
    width: 66.7vw
    padding: 5px 0
    color: #ffffff
    background-color: rgb(32, 32, 32)
    text-align: center
    z-index: 0
</style>
