<template>
  <div class="contains">
    <div class="header">
      <router-link to="/profile">
        <i class="iconfont icon-fanhui"></i>
      </router-link>
      <span class="register">注册</span>
    </div>
    <div class="content">
      <div class="register-remark">
        <span>请确保你的手机畅通，用于接收验证码短信</span>
      </div>
      <div class="input-content">
        <div class="account-verification">
          <input type="text"
                 class="name"
                 placeholder="请输入账号"
                 @keyup="getInputValue"
                 v-model.trim.lazy="model.name"
          />
          <i class="iconfont icon-chenggong"
             v-show="active"
             ref="nameSuccess"
          ></i>
          <i class="iconfont icon-shibai"
             v-show="active"
             ref="nameFail"
          ></i>
          <span class="fail" ref="nameRemark" v-show="active">此账号已存在</span>
        </div>
        <input type="password"
               class="password"
               placeholder="请输入密码"
               @keyup="getInputValue"
               v-model="model.pwd"
        />
        <div class="phone-verification">
          <input type="number"
                 class="phone"
                 placeholder="请输入手机号"
                 @keyup="getInputValue"
                 v-model.trim.lazy="model.phone"
          />
          <i class="iconfont icon-chenggong"
             v-show="active"
             ref="phoneSuccess"
          ></i>
          <i class="iconfont icon-shibai"
             v-show="active"
             ref="phoneFail"
          ></i>
          <span class="fail" ref="phoneRemark" v-show="active">此手机号已存在</span>
        </div>
        <div class="verification-code-wrapper">
          <input type="text"
                 class="verification-code"
                 placeholder="请输入验证码"
                 @keyup="getInputValue"
                 v-model="code"
          />
          <button class="gray" v-if="btnInputShow">获取验证码</button>
          <button class="red" v-else>获取验证码</button>
        </div>
        <button class="register-gray" v-if="btnInputShow">注册</button>
        <button class="register-red" v-else @click="registerAccount">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import {UserApi} from "@/api";

export default {
    name: 'Register',
    data() {
      return {
        btnInputShow: true,
        // btnRegisterShow: true,
        model: {
          name: '',
          pwd: '',
          phone: ''
        },
        code: '',
        active: false
      };
    },
  watch: {
      async 'model.name'(n){
         let nameChange = await UserApi.checkName(n)
        if(nameChange === '') return;
        nameChange === 1 ? this.$refs.nameFail.style.display = 'block' :  this.$refs.nameSuccess.style.display = 'block';
        nameChange === 1 ? this.$refs.nameRemark.style.display = 'block' :  this.$refs.nameSuccess.style.display = 'block';
      },
      async 'model.phone'(n) {
        let phoneChange = await UserApi.checkPhone(n);
        if(phoneChange === '') return;
        phoneChange === 1 ? this.$refs.phoneFail.style.display = 'block' :  this.$refs.phoneSuccess.style.display = 'block';
        phoneChange === 1 ? this.$refs.phoneRemark.style.display = 'block' :  this.$refs.phoneSuccess.style.display = 'block';
      }
  },
    methods: {
      getInputValue() {
        this.btnInputShow = !(this.code.length >= 1 && this.model.name.length >= 1 && this.model.pwd.length >= 1 && this.model.phone.length >= 1);
      },
      async registerAccount() {
        await UserApi.register(this.model)
        await this.$juanConfirm('注册成功！');
        await this.$router.replace('/login');
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .contains
    display: flex
    height: 100vh
    width: 100vw
    flex-direction: column
    .header
      height: 40px
      flex-shrink: 0
      position: relative
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      i
        position: absolute
        top: 50%
        left: 15px
        transform: translateY(-50%)
        font-size: 20px
      span.register
        font-size: 18px
    .content
      background-color: #ffffff
      padding: 0 15px
      flex-grow: 1
      .register-remark
        margin-top: 20px
        text-align: center
        span
          font-size: 12px
          color: #999999
      .input-content
        display: flex
        flex-direction: column
        padding: 10px 0
        .account-verification,.phone-verification
          wdith: 100%
          position: relative
          input.name,input.phone
            width: 100%
          i.icon-chenggong
            position: absolute
            top: 50%
            right: 20px
            transform: translateY(-50%)
            color: green
            font-size: 20px
          i.icon-shibai
            position: absolute
            top: 50%
            right: 20px
            transform: translateY(-50%)
            color: #ff464e
            font-size: 20px
          span.fail
            position: absolute
            top: 50%
            right: 50px
            transform: translateY(-50%)
            color: #ff464e
            font-size: 12px
        input
          height: 45px
          border: none
          outline: none
          margin: 10px 0
        .verification-code-wrapper
          display: flex
          align-items: center
          input.verification-code
            width: 70%
            flex-shrink: 0
          button.gray
            flex-grow: 1
            border: none
            height: 50px
            background-color: rgb(219, 219, 219)
            color: #ffffff
          button.red
            flex-grow: 1
            height: 50px
            border: none
            background-color: #ff464e
            color: #ffffff
      button.register-gray
        height: 50px
        margin-top: 30px
        background-color: rgb(219, 219, 219)
        border: none
        color: #ffffff
      button.register-red
        height: 50px
        margin-top: 30px
        background-color: #ff464e
        border: none
        color: #ffffff
</style>
