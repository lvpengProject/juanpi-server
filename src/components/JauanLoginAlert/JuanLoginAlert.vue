<template>
  <div class="juan-confirm">
    <div class="juan-confirm-content">
      <p class="word">此功能需要登录后才能查看，您是否去登录？</p>
      <div class="juan-confirm-button">
        <button class="cancel" @click="cancel">取消</button>
        <button class="determine" @click="determine">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JuanLoginAlert',
  data() {
    return {
      reject: null,
      resolve: null,
    }
  },
  methods: {
    cancel() {
      this.reject()
      this.$destroy(true);
      document.body.removeChild(this.$el);
    },
    determine() {
      this.resolve();
      this.$destroy(true);
      document.body.removeChild(this.$el);
    }
  }
}
</script>

<style lang="stylus" scoped>
.juan-confirm
  position: fixed
  top: 0
  left: 0
  height: 100vh
  width: 100vw
  background-color: rgba(0, 0, 0, 0.5)
  .juan-confirm-content
    height: 26.7vw
    width: 90.7vw
    background-color: #ffffff
    position: absolute
    top: 30%
    left: 50%
    transform: translateX(-50%)
    display: flex
    flex-direction: column
    z-index: 100
    p.word
      height: 14.7vw
      width: 100%
      flex-shrink: 0
      line-height: 14.7vw
      text-align: center
      color: #666
    .juan-confirm-button
      flex-grow: 1
      display: flex
      justify-content: space-between
      button
        flex-grow: 1
        border: none
        background-color: #ffffff
      button.determine
        color: #ff464e

</style>
