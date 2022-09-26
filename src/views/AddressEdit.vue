<template>
  <div class="contains">
      <div class="header">
          <i class="iconfont icon-fanhui" @click="closeEdit"></i>
          <span>添加地址</span>
        </div>
      <div class="content hide-scroll">
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
            <input type="text"
                   placeholder="请输入收件人省/市/区"
                   v-model="address.receiveRegion"
                   @click="addRegionShow = !addRegionShow"
            >
            <div class="distpicker-wrapper" @click.self="addRegionShow = false" v-show="addRegionShow">
              <v-distpicker type="mobile"
                            @province="provinceChange"
                            @city="cityChange"
                            @area="areaChange"
              ></v-distpicker>
            </div>
          </div>
          <div class="detail-wrapper">
            <span class="detail">详细地址：</span>
            <input type="text" placeholder="请输入收件人的详细地址" v-model="address.receiveDetail">
            <div class="footer"></div>
          </div>
        </div>
        <div class="perfect-information">
          <div class="information-header">
            ————<span class="information-header-content">继续完成收件人身份信息</span>————
          </div>
          <div class="information-request">
            <span>
              据海关要求，为了确保您的商品能顺利清关，
              请填写真实有效的身份证信息，
              商家将帮您办理个人物品清关手续。
            </span>
          </div>
          <div class="perfect-body">
            <div class="name-wrapper">
              <span class="name">真实姓名：</span>
              <input type="text">
            </div>
            <div class="id-number">
              <span class="number">身份证号：</span>
              <input type="text">
            </div>
          </div>
          <div class="perfect-bottom">
            <i>卷皮承诺：</i>
            <span>我们将严格保证您的身份证信息安全，使用加密、限权、水印等多种方式避免被用于其他用途。</span>
          </div>
        </div>
      </div>
    <div class="footer">
      <button class="save" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

  export default {
    name: 'AddressEdit',
    components: { VDistpicker },
    // props:['model', 'isEdit'],
    props: {
      model: {
        type: Object,
        required: true,
      },
    },
    value: {
        type: Boolean,
        required: true,
    },
    data() {
        return {
          address: {
            receiveName: this.model.receiveName,
            receivePhone: this.model.receivePhone,
            receiveDetail: this.model.receiveDetail,
            receiveRegion: this.model.receiveRegion
          },
          addRegionShow: false,
        }
    },
    methods: {
      save() {
        this.$emit('endEdit', Object.assign({}, this.address))
      },
      closeEdit() {
        // this.isEdit = false;
        this.$emit('closeEdit', this.isEdit = false);
      },
      provinceChange({value}) {
        this.address.receiveRegion = value;
      },
      cityChange({value}) {
        if(value === '') return;
        this.address.receiveRegion = this.address.receiveRegion + ' ' + value;
      },
      areaChange({value}) {
        if(value === '') return;
        this.address.receiveRegion = this.address.receiveRegion + ' ' + value;
        // console.log(value);
      }
    },

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
      .header
        height: 9.6vw
        line-height: 9.6vw
        flex-shrink: 0
        text-align: center
        position: relative
        font-size: 4.8vw
        i
          position: absolute
          left: 2.6vw
          top: 0
          font-style: normal
      .content
        flex-grow: 1
        background-color: rgb(244, 244, 248)
        padding-bottom: 50px
        overflow: auto
        .address-content
          height: 80vw
          display: flex
          flex-direction: column
          justify-content: space-around
          background-color: #fff
          padding: 0 0 5.3vw 2.6vw
          .name-wrapper,.phone-wrapper,.region-wrapper,.detail-wrapper
            height: 12vw
            line-height: 12vw
            width: 100%
            display: flex
            align-items: center
            .distpicker-wrapper
              position: fixed
              top: 0
              left: 0
              width: 100vw
              height: 100vh
              background-color: rgba(0,0,0,0.2)

              .distpicker-address-wrapper
                position: absolute
                top: 40%
                left: 0
                width: 100%
                height: 100%
                overflow: auto
            span.name,span.phone,span.region,span.detail
              display: inline-block
              width: 21.3vw
              color: #999
              font-size: 3.7vw
            input
              border: none
              outline: none
        .perfect-information
          width: 100%
          margin-top: 13.3vw
          background-color: #fff
          padding: 0 2.6vw
          box-sizing: border-box
          .information-header
            text-align: center
            height: 9.3vw
            line-height: 9.3vw
            font-size: 3.7vw
            color: #b0b0b0
            margin-bottom: 2.6vw
            span.information-header-content
              color: #333
          .information-request
            width: 100%
            background-color: #f4f4f8
            padding: 1.3vw 4vw
            box-sizing: border-box
            font-size: 3.7vw
            margin: 1.3vw 0
          .perfect-body
            .name-wrapper,.id-number
              height: 12vw
              line-height: 12vw
              color: #999999
              font-size: 3.2vw
              input
                border: none
                outline: none
          .perfect-bottom
            padding: 1.3vw
            i
              font-style: normal
              font-size: 1.3vw
            span
              font-size: 1.3vw
              color: #999999
      .footer
        height: 12vw
        flex-shrink: 0
        button.save
          width: 100%
          height: 100%
          background-color: #ff464e
          color: #ffffff
          font-size: 5.3vw
          border: none
</style>
