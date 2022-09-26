<template>
  <div class="contains">
    <div class="header">
      <i class="iconfont icon-fanhui" @click="closeEdit"></i>
      <span>添加地址</span>
    </div>
    <div class="content">
      <div class="address-content">
        <div class="name-wrapper">
          <span class="name">收件人：</span>
          <input type="text" placeholder="请输入收件人" v-model="address.receiveName">
        </div>
        <div class="phone-wrapper">
          <span class="phone">手机号：</span>
          <input type="text" placeholder="请输入收件人手机号" v-model="address.receivePhone">
        </div>
        <div class="region-wrapper">
          <span class="region">省/市/区：</span>
          <input type="text" placeholder="请输入收件人省/市/区" v-model="address.receiveRegion">
        </div>
        <div class="detail-wrapper">
          <span class="detail">详细地址：</span>
          <input type="text" placeholder="请输入收件人的详细地址" v-model="address.receiveDetail">
          <div class="footer"></div>
        </div>
      </div>
      <div class="company-name-wrapper">
        <span class="company-name">copyright © 武汉奇米网络科技有限公司</span>
      </div>
    </div>
    <div class="footer">
      <button class="save" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressEdit',
  // props:['model', 'isEdit'],
  props: {
    model: {
        type: Object,
        required: true
    },
    value: { type: Boolean }
  },
  data() {
    return {
      isEdit: false,
      address: {
        receiveName: this.model.receiveName,
        receivePhone: this.model.receivePhone,
        receiveDetail: this.model.receiveDetail,
        receiveRegion: this.model.receiveRegion
      }
    }
  },
  methods: {
    save() {
      this.$emit('endEdit',{ ...this.address });
    },
    closeEdit() {
      this.$emit('closeEdit', this.isEdit = false);
    }
  }

}
</script>

<style lang="stylus" scoped>
.contains
  position: fixed
  left: 0
  top: 0
  height: 100vh
  width: 100vw
  background-color: #ffffff
  display: flex
  flex-direction: column
  z-index: 100000
  .header
    height: 9.6vw
    line-height: 9.6vw
    flex-shrink: 0
    text-align: center
    position: relative
    font-size: 18px
    i
      position: absolute
      left: 10px
      top: 0
      font-style: normal
  .content
    flex-grow: 1
    background-color: rgb(244, 244, 248)
    .address-content
      height: 300px
      display: flex
      flex-direction: column
      justify-content: space-around
      background-color: #fff
      padding: 0 0 20px 10px
      .name-wrapper,.phone-wrapper,.region-wrapper,.detail-wrapper
        height: 45px
        line-height: 45px
        width: 100%
        display: flex
        align-items: center
        span.name,span.phone,span.region,span.detail
          display: inline-block
          width: 80px
          color: #999
          font-size: 14px
        input
          border: none
          outline: none
    .company-name-wrapper
      height: 110px
      background-color: #ffffff
      margin-top: 20px
      text-align: center
      span.company-name
        font-size: 13px
        color: #bbb
  .footer
    height: 45px
    flex-shrink: 0
    button.save
      width: 100%
      height: 100%
      background-color: #ff464e
      color: #ffffff
      font-size: 20px
      border: none
</style>
