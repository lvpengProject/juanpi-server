<template>
    <div class="juan-loading">
      <img :src="JuanLoading" alt="">
    </div>
</template>

<script>
import JuanLoading from './loading.gif'
  export default {
    name: 'JuanLoading',
    data() {
      return {
        JuanLoading
      }
    }
  }
</script>

<style lang="stylus">
  .juan-loading
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 10000000
    img
      height: 21.3vw
      //background-color: #ffffff
      position: absolute
      top: 30%
      left: 50%
      transform: translateX(-50%)

</style>
