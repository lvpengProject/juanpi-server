<template>
  <div class="contains">
    <div class="top">
      <img src="../assets/images/login-header.png" alt="">
    </div>
    <div class="header">
      <router-link to="/profile" class="to-profile">
        <img src="../assets/images/to-profile.png" alt="">
      </router-link>
      <span>登录</span>
      <router-link to="/register" class="to-register">
        <span>注册</span>
      </router-link>
    </div>
<!--  卷皮账号登录  -->
    <div class="content" style="padding: 0 10px">
      <ul class="login-way">
        <li :class="{active: index === 1}" @click="index = 1">卷皮账号登录</li>
        <li :class="{active: index === 2}" @click="index = 2">手机快捷登录</li>
      </ul>
      <div class="login-content" v-show="index === 1">
        <div class="account-wrapper">
          <input
              type="text"
              placeholder="手机号/邮箱/用户名"
              v-model.lazy="model.name"
              @keyup="getLoginValue"
          >
        </div>
        <div class="pwd-wrapper">
          <input
              type="password"
              placeholder="密码"
              v-model="model.pwd"
              @keyup="getLoginValue"
          >
        </div>
        <div class="login">
          <input
              type="button"
              value="登 录"
              @click="login"
              v-show="btnLoginShow"
              class="login-gray"
          >
          <input
              type="button"
              value="登 录"
              @click="login"
              v-show="!btnLoginShow"
              class="login-red"
          >
        </div>
        <div class="login-content-bottom">
          <div class="left">
            <i
                :class="{active: active}"
                @click="active = !active"
            ></i>
            <span>两周内免登陆</span>
          </div>
          <div class="right">忘记密码？</div>
        </div>
      </div>

<!--   手机快捷登录   -->
      <div class="login-content" v-show="index === 2">
        <div class="account-wrapper">
          <input type="text" placeholder="请输入手机号码">
        </div>
        <div class="pwd-wrapper">
          <input style="width: 75%" type="password" placeholder="请输入手机验证码">
          <input style="width:25%;background-color: #fff;color: #999" type="button" value="获取验证码"/>
        </div>
        <div class="login">
          <input
              :disabled="index === 1"
              type="button"
              value="登 录"
              style="background-color: rgb(219, 219, 219)"
          >
        </div>
        <div class="login-content-bottom">
          <div class="left">
            <i></i>
            <span>两周内免登陆</span>
          </div>
          <div class="right">忘记密码？</div>
        </div>
      </div>
      <div class="other-login-way">
          <span>第三方账号快速登录</span>
        <div class="login-way-content">
          <div class="qq">
            <i class="iconfont icon-Q icon-QQ"></i>
          </div>
          <div class="taobao">
            <i class="iconfont icon-taobao"></i>
          </div>
          <div class="weibo">
            <i class="iconfont icon-weibo"></i>
          </div>
        </div>
        <ul class="login-way-footer">
          <li>
            <i class="iconfont icon-baoyou"></i>
            <span>全场包邮</span>
          </li>
          <li>
            <i class="iconfont icon-zhijian"></i>
            <span>100%人工质检</span>
          </li>
          <li>
            <i class="iconfont icon-zhijian"></i>
            <span>7天放心退</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import {UserApi} from "@/api";

export default {
    name: 'Login',
  components: {

  },
    data() {
      return {
        index: 1, // 控制登录方式
        active: false, // 控制复选框
        model:{
          name: '',
          pwd: '',
        },
        btnLoginShow: true
      }
    },
  methods:{
      async login() {
        try {
          let token = await UserApi.login(this.model);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('name', this.model.name);
          await this.$router.replace(this.$route.query.target || '/home');
          await this.$router.go(-1)
          await this.$juanNotice('登录成功！');
        }catch(e) {  }

      },
    getLoginValue() {
        this.btnLoginShow = !(this.model.name.length >= 1 && this.model.pwd.length >= 1);
    }
  }
  }
</script>
<style lang="stylus" scoped>
  .contains
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    .top
      height: 16vw
      flex-shrink: 0
      img
        width:100%
    .header
      height: 10.6vw
      background-color: rgb(255, 90, 97)
      flex-shrink: 0
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 2.6vw
      a.to-profile
        img
          width: 50%
      span
        color: #fff
        font-size: 4.8vw
      a.to-register
        span
          font-size: 3.7vw !important
    .content
      flex-grow: 1
      overflow: auto
      ul.login-way
        display: flex
        height: 10.6vw
        justify-content: space-around
        line-height: 10.6vw
        margin-bottom: 2px
        li
          height: 100%
          color: #999
          font-size: 3.7vw
          padding: 0 4vw
          border-bottom: 2px solid #fff
          &.active
            color: #ff464e
            border-bottom: 3px solid #ff464e !important
      .login-content
        height: 52vw
        input
          height: 12vw
          width: 100%
          border: none
          outline: none
      .login
        text-align: center
        padding-top: 5.3vw
        input.login-gray
          width: 100%
          height: 12vw
          background-color: #dbdbdb
          color: #fff
          font-size: 4.8vw
        input.login-red
          width: 100%
          height: 12vw
          background-color: #ff464e
          color: #fff
          font-size: 4.8vw
      .login-content-bottom
        display: flex
        justify-content: space-between
        margin-top: 2.6vw
        .left
          display: flex
          align-items: center
          i
            background-image: url("../assets/images/CheckBox-1.png")
            background-size: 100% 100%
            width: 4.2vw
            height: 4.2vw
            border: 1px solid #b0b0b0
            box-sizing: border-box
            margin-right: 2.6vw
          i.active
              background-color: #ff464e
              border: none
          span
            font-size: 3.7vw
            color: #999
        .right
          color: #999
          font-size: 3.7vw
    .other-login-way
        height: 38.6vw
        margin-top: 10.6vw
        text-align: center
        display: flex
        flex-direction: column
        justify-content: space-between
        span
          color: #999999
          font-size: 3.7vw
        .login-way-content
          .qq
            height: 12vw
            width: 12vw
            border: 1px solid #b0b0b0
            border-radius: 50%
            line-height: 12vw
            text-align: center
            display: inline-block
            i.icon-QQ
              color: rgb(81, 205, 250)
              font-size: 6.7vw
          .taobao
            margin: 0 10.6vw
            height: 12vw
            width: 12vw
            border: 1px solid #b0b0b0
            border-radius: 50%
            line-height: 12vw
            text-align: center
            display: inline-block
            i.icon-taobao
              color: rgb(255, 124, 76)
              font-size: 6.7vw
          .weibo
            height: 12vw
            width: 12vw
            border: 1px solid #b0b0b0
            border-radius: 50%
            line-height: 12vw
            text-align: center
            display: inline-block
            i.icon-weibo
              color: rgb(254, 118, 20)
              font-size: 6.7vw
        ul.login-way-footer
          display: flex
          justify-content: space-between
          li
            display: flex
            align-items: center
            i
              color: #c2c2c2
              margin-right: 1.3vw
            span
              font-size: 3.2vw
              color: #c2c2c2

</style>


