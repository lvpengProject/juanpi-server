<template>
  <div class="contains">
    <div class="header">
      <router-link to="/totalorder"><i class="iconfont icon-fanhui"></i></router-link>
      <span class="pending-payment">待付款</span>
      <span class="cancel-order">取消订单</span>
    </div>
    <div class="content hide-scroll">
      <div class="countdown-to-payment">
        <span class="pending-payment-title">待付款</span>
        <p>订单为你保留<vueTimerCountdown class="countdown" style="color:#333"
                                        :deadline="1800" v-slot="time">
          {{time.minute}} : <span class="countdown">{{time.second}}秒  </span>
        </vueTimerCountdown>,超时后将自动关闭</p>
      </div>
      <div class="default-address">
        <i class="navigation iconfont icon-dizhi"></i>
        <div class="address-detail">
          <div class="name-phone">
            <span class="name" v-text="orderAddress.receiveName"></span>
            <span class="phone" v-text="orderAddress.receivePhone"></span>
          </div>
          <div class="region-detail">
            <span class="region" v-text="orderAddress.receiveRegion"></span>
            <span class="detail" v-text="orderAddress.receiveDetail"></span>
          </div>
        </div>
      </div>
      <div class="payment-method">
        <span class="method-title">支付方式</span>
        <div class="wechat-pay">
            <div class="wechat-detail">
              <i class="iconfont icon-weixin"></i>
              <span class="wechat">微信支付</span>
              <span class="remark">(仅支持微信6.0.2及以上版本) </span>
            </div>
          <i class="checkbox"
             :class="{ checked: checked }"
             @click="checked = !checked"
          ></i>
        </div>
        <div class="zhifubao-pay">
          <div class="zhifubao-detail">
            <i class="iconfont icon-zhifubaozhifu"></i>
            <span class="wechat">支付宝支付</span>
            <span class="remark">推荐</span>
          </div>
          <i class="checkbox"
             :class="{ checked: !checked }"
             @click="checked = !checked"
          ></i>
        </div>
      </div>
      <div class="purchased-product">
        <ul class="product-list">
          <li v-for="item in orderProduct" :key="item.id">
            <div class="shop-name-wrapper">
              <i class="iconfont icon-dianpu"></i>
              <span class="shop-name">tiiek女装官方旗舰店</span>
              <div class="customer-service-wrapper">
                <i class="iconfont icon-kefu"></i>
                <span class="customer-service">客服</span>
              </div>
            </div>
            <div class="product-detail">
              <img :src="item.avatar" alt="" class="avatar">
              <div class="item-detail">
                <div class="name-price">
                  <span class="product-name" v-text="item.name"></span>
                  <span class="product-price" v-text="'￥' + item.price + '.00'"></span>
                </div>
                <div class="brief-count">
                  <span class="product-brief" v-text="item.brief"></span>
                  <span class="product-count" v-text="'X' + item.count"></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="various-fees">
        <ul class="fee-list">
          <li>
            <span>商品总额</span><span>￥{{fullAmount}}.00</span>
          </li>
          <li>
            <span>合计运费</span><span>包邮</span>
          </li>
          <li>
            <span>活动优惠</span><span>-￥111.20</span>
          </li>
          <li>
            <span>优惠券抵扣</span><span>-￥0.00</span>
          </li>
          <li>
            <span>总金额</span><span style="color: #ff464e">￥{{fullAmount}}.00</span>
          </li>
        </ul>
      </div>
      <div class="order-time">
        暂无更多
      </div>
    </div>
    <div class="footer">
      <div class="payment-amount">
        <p>待付总金额 <span>￥{{fullAmount}}.00</span>(已省￥00.00)</p>
      </div>
      <button @click="toPay">去付款</button>
    </div>
  </div>
</template>

<script>
import vueTimerCountdown from 'vue-timer-countdown'
import { OrderApi } from "@/api";

export default {
  name: "Order",
  components: {vueTimerCountdown},
  data() {
    return {
        orderAddress: [],
        orderProduct: [],
        checked: true,
        allOrder: []
    } ;
  },
  methods: {
   async toPay() {
     await OrderApi.payOrder(this.allOrder[this.allOrder.length - 1].orderId)
     await this.$juanConfirm('支付成功！');
     this.$router.replace('/totalorder');
    }
  },
  computed: {
    fullAmount() {
      let fullAmount = 0;
      this.orderProduct.forEach(item => {
        fullAmount += item.price * item.count
      })
      return fullAmount
    }
  },
 async mounted() {
    this.allOrder = await OrderApi.getAllOrder();
    console.log(this.allOrder[this.allOrder.length - 1].orderId);
    const orderList = JSON.parse(this.$route.query.orderList);
    this.orderAddress = orderList.defaultAddress;
    this.orderProduct = orderList.buyList;
    // console.log(this.orderAddress)
  },
}
</script>

<style scoped lang="stylus">
  .contains
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    .header
      height: 11.2vw
      position: relative
      text-align: center
      line-height: 11.2vw
      i.icon-fanhui
        position: absolute
        top: 50%
        left: 5.3vw
        transform: translateY(-50%)
        font-size: 5.3vw
      span.pending-payment
       font-size: 4.8vw
      span.cancel-order
        position: absolute
        top: 50%
        right: 5.3vw
        transform: translateY(-50%)
        font-size: 3.7vw
        color: #333
    .content
      flex-grow: 1
      overflow: auto
      background-color: #eff6f9
      .countdown-to-payment
        display: flex
        flex-direction: column
        align-items: center
        padding: 5.3vw 0
        .pending-payment-title
          color: #ff464e
          font-size: 4.8vw
        p
          font-size: 3.7vw
          color: #999
      .default-address
        height: 21.3vw
        width: 100%
        background-color: #ffffff
        display: flex
        align-items: center
        padding: 0 4vw
        box-sizing: border-box
        i.navigation
          font-size: 6.7vw
          margin-right: 4vw
        .address-detail
          display: flex
          flex-direction: column
          .name-phone,.region-detail
            display: flex
            align-items: center
            font-size: 3.7vw
            padding: 1.3vw 0
            span.name,span.region
              margin-right: 1.3vw
      .payment-method
        height: 36vw
        width: 100%
        background-color: #ffffff
        margin-top: 2.6vw
        display: flex
        flex-direction: column
        justify-content: space-around
        padding: 0 4vw
        box-sizing: border-box
        span.method-title
          font-size: 4.2vw
          color: #333
        .wechat-pay,.zhifubao-pay
          display: flex
          justify-content: space-between
          i.checkbox
            height: 4.8vw
            width: 4.8vw
            border: 1px solid #b0b0b0
            background-color: #ffffff
            background-size: 100% 100%
            border-radius: 50%
            background-image: url("../assets/images/icon_checkbox_uncheck.png")
            &.checked
              background-image: url("../assets/images/icon_checkbox_check.png")
              border: none
          .wechat-detail, .zhifubao-detail
            display: flex
            align-items: center
            width: 66.7vw
            i.icon-weixin
              font-size: 6.7vw
              background-color: rgb(15, 207, 50)
              color: #ffffff
              border-radius: 1.3vw
              margin-right: 1.3vw
            i.icon-zhifubaozhifu
              font-size: 6.7vw
              background-color: #ffffff
              color: rgb(0, 187, 238)
              border-radius: 1.3vw
              margin-right: 1.3vw
            span.wechat
              font-size: 3.2vw
              color: #333
              margin-right: 1.3vw
            span.remark
              font-size: 2.1vw
              color: #ff464e
              border: 1px solid #ff464e
              padding: 0 3px
      .purchased-product
        margin-top: 2.6vw
        ul.product-list
          li
            .shop-name-wrapper
              height: 13.3vw
              background-color: #ffffff
              display: flex
              padding: 0 5.3vw
              box-sizing: border-box
              align-items: center
              position: relative
              i.icon-dianpu
                font-size: 5.3vw
                margin-right: 2.6vw
              span.shop-name
                color: #333
                font-size: 3.7vw
              .customer-service-wrapper
                position: absolute
                top: 50%
                right: 4vw
                transform: translateY(-50%)
                display: flex
                align-items: center
                i
                  font-size: 4.8vw
                  color: #4a90e2
                span.customer-service
                  font-size: 3.7vw
                  color: #4a90e2
                  margin-left: 1.3vw
            .product-detail
              background-color: #fafafa
              display: flex
              align-items: center
              padding: 4vw 2.6vw
              box-sizing: border-box
              img.avatar
                height: 18.6vw
                margin-right: 2.6vw
              .item-detail
                display: flex
                flex-direction: column
                width: 100%
                .name-phone,.brief-count
                  padding: 2.1vw 0
                .name-price
                  display: flex
                  justify-content: space-between
                  span.product-name,span.product-price
                    font-size: 3.7vw
                    color: #333
                .brief-count
                  display: flex
                  justify-content: space-between
                  span.product-brief
                    font-size: 2.6vw
                    width: 53.3vw
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
                    color: #bbb
                  span.product-count
                    font-size: 2.6vw
                    color: #bbb

      .various-fees
        padding: 4vw 2.6vw
        background-color: #ffffff
        ul.fee-list
          display: flex
          flex-direction: column
          height: 36vw
          justify-content: space-evenly
          li
            display: flex
            justify-content: space-between
            font-size: 3.7vw
            color: #333
      .order-time
        height: 29.3vw
        background-color: #ffffff
        margin-top: 2.6vw
        margin-bottom: 18.6vw
        text-align: center
        line-height: 29.3vw
        color: #ff464e
    .footer
      height: 22.6vw
      flex-shrink: 0
      display: flex
      flex-direction: column
      .payment-amount
        display: flex
        align-items: center
        height: 10.6vw
        justify-content: center
        p
          font-size: 4vw
          color: #666
          span
            color: #ff464e

      button
        height: 100%
        border: none
        background-color: #ff464e
        color: #fff
        font-size: 4.8vw

</style>
