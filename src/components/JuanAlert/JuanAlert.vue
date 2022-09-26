<template>
    <div class="juan-alert">
      <div class="juan-alert-content">
<!--        <img slot="title" class="avatar" :src="avatar" alt="">-->
        <p class="message" v-text="message"></p>
        <input slot="foot" type="button" @click="aaa" value="确定"/>
      </div>
    </div>
</template>

<script>
import avatar from './msg.png'
  export default {
    name: 'MiAlert',
    data() {
      return {
        message:'',
        avatar
      }
    },
    methods:{
      aaa() {
        setTimeout(() =>{
          this.$destroy(true);
          document.body.removeChild(this.$el);
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .juan-alert
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    background-color: rgba(0, 0, 0, 0.5)
    .juan-alert-content
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
      justify-content center
      align-items center
</style>
