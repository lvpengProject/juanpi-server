<template>
  <ul class="juan-tab-bar">
    <li>
      <router-link to="/home">
        <i class="iconfont icon-home"></i>
        <span>首页</span>
      </router-link>
    </li>
    <li>
      <router-link to="/category">
        <i class="iconfont icon-category"></i>
        <span>分类</span>
      </router-link>
    </li>
    <li>
      <router-link to="/cart">
        <i class="iconfont icon-cart"></i>
        <span>购物车</span>
      </router-link>
    </li>
    <li>
      <router-link to="/profile">
        <i class="iconfont icon-profile"></i>
        <span>我的</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'MiTabBar',
  }
</script>

<style lang="stylus">
    ul.juan-tab-bar
      display: flex
      height: 13.5vw
      li
        width: 25%
        display: flex
        a
          display: flex
          flex-grow: 1
          flex-direction: column
          justify-content: center
          align-items: center
          i
            font-size: 6.7vw
            color: rgb(187, 187, 187)
          span
            font-size: 3.2vw
            color: #333
          &.router-link-active
            i
              color: #ff464f
            span
              color: #ff464f
</style>
