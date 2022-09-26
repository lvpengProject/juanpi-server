<template>
  <div class="contains">
    <div class="top-wrapper">
      <div class="header">
        <i class="iconfont icon-fanhui"></i>
        <span class="title">个人中心</span>
        <span class="quit"
              v-if="isLogin"
              @click="quitAccount"
        >退出</span>
      </div>
<!--      个人中心登录状态-->
      <div class="personal-center" v-if="isLogin">
        <img src="../assets/images/default-images.jpg" alt="">
        <div class="personal-center-detail">
          <span class="name">{{name}}</span>
          <div class="my-account">
            <span>我的账户</span>
            <i class="iconfont icon-zhankai"></i>
          </div>
        </div>
      </div>
<!--      未登录状态-->
      <div class="register-login" v-else>
        <router-link to="/register">
          <span class="register">注册</span>
        </router-link>
        <span class="separation">|</span>
        <router-link to="/login">
          <span class="login">登录</span>
        </router-link>
      </div>
    </div>
    <div class="content hide-scroll">
      <router-link to="/totalorder" class="my-order-wrapper">
          <span class="my-order">我的订单</span>
          <span class="total-order">全部订单</span>
      </router-link>
      <ul class="order-list">
        <li>
          <a @click.prevent="toUnPay">
            <i class="iconfont icon-daifukuan"></i>
            <span>待付款</span>
          </a>
        </li>
        <li>
          <router-link to="/totalorder">
            <i class="iconfont icon-daichengtuan"></i>
            <span>待成团</span>
          </router-link>
        </li>
        <li>
          <router-link to="/totalorder">
            <i class="iconfont icon-daishouhuo"></i>
            <span>待收货</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order">
            <i class="iconfont icon-tuikuan"></i>
            <span>退款/售后</span>
          </router-link>
        </li>
      </ul>
      <ul class="various-coupons">
        <li><span>我的优惠券</span></li>
        <li><span>我的免单券</span></li>
        <li><span>我的拼团</span></li>
        <li><router-link to="/address"><span>地址管理</span></router-link></li>
        <li><span>借钱</span></li>
      </ul>
      <ul class="sub-bottom">
        <li><span>客服中心</span></li>
        <li><span>关于卷皮</span></li>
      </ul>
      <ul class="bottom">
        <li><router-link to="/home">返回首页</router-link></li>
        <li><router-link to="">客户端</router-link></li>
        <li><router-link to="">电脑版</router-link></li>
      </ul>
    </div>
    <div class="footer">
      <JuanTabBar></JuanTabBar>
    </div>

  </div>
</template>

<script>
import JuanTabBar from "@/components/JuanTabBar/JuanTabBar";
  export default {
    name: 'Profile',
    components: {
      JuanTabBar,
    },
    data() {
      return {
          isLogin: !!(sessionStorage.getItem('token')),
          name: sessionStorage.getItem('name')
      };
    },
    methods: {
      async quitAccount() {
        await window.sessionStorage.clear();
        await this.$juanConfirm('确认退出？')
        await this.$juanNotice('退出成功！');
        return this.isLogin = false;
      },
      // goTotalOrder() {
      //   console.log(111)
      //   this.$router.push('/totalorder');
      // },
      toUnPay() {
        this.$router.push('/totalorder?id=2');
      }
    },

  }
</script>
<style lang="stylus" scoped>
  .contains
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    .top-wrapper
      background-color: rgb(254, 63, 57)
      .header
          height: 45px
          flex-shrink: 0
          position: relative
          text-align: center
          line-height: 45px
          i
            position: absolute
            top: 50%
            left: 20px
            transform: translateY(-50%)
            font-size: 25px
            color: #ffffff
          span.title
            color: #ffffff
            font-size: 18px
          span.quit
            font-size: 14px
            color: #ffffff
            position: absolute
            top: 50%
            right: 15px
            transform: translateY(-50%)
        .register-login
          height: 100px
          flex-shrink: 0
          display: flex
          align-items: center
          justify-content: space-evenly
          padding: 0 70px
          span.register,span.login
            font-size: 20px
            color: #ffffff
          span.separation
            font-size: 20px
            color: rgb(255, 179,163)
        .personal-center
          height: 100px
          display: flex
          align-items: center
          padding-left: 20px
          img
            height: 60px
            border-radius: 50%
          .personal-center-detail
            display: flex
            flex-direction: column
            justify-content: space-around
            height: 60px
            margin-left: 15px
            span.name
              color: #ffffff
              font-size: 18px
            .my-account
              background-color: rgba(0, 0, 0, 0.1)
              border-radius: 10px
              display: flex
              align-items: center
              color: #ffffff
              span
                font-size: 12px
                margin-right: 5px
              i
                font-size: 8px
    .content
      flex-grow: 1
      overflow: auto
      background-color: rgb(244, 244, 248)
      a.my-order-wrapper
        display: flex
        justify-content: space-between
        align-items: center
        height: 50px
        padding: 0 20px
        box-sizing: border-box
        background-color: #ffffff
        span.my-order
          color: #333
          font-size: 15px
        span.total-order
          color: #999999
          font-size: 15px
      ul.order-list
        height: 80px
        display: flex
        align-items: center
        justify-content: space-evenly
        background-color: #fff
        li
          a
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            i
              color: #666
              font-size: 28px
            span
              color: #666
              font-size: 14px
      ul.various-coupons
        height: 230px
        display: flex
        flex-direction: column
        justify-content: space-evenly
        padding: 0 15px
        background-color: #ffffff
        margin-top: 10px
        li
          color: #333
          font-size: 14px
          a
            color: #333
      ul.sub-bottom
        height: 100px
        display: flex
        flex-direction: column
        justify-content: space-evenly
        padding: 0 15px
        background-color: #ffffff
        margin-top: 10px
        li
          color: #333
          font-size: 14px

      ul.bottom
        height: 45px
        display: flex
        justify-content: space-around
        margin-top: 10px
        align-items: center
        background-color: #ffffff
        li
          a
            font-size: 12px
            color: #666
    .footer
      flex-shrink: 0
</style>
