<template>
  <div class="contains hide-scroll">
    <div class="header">
        <router-link to="/profile">
          <i class="iconfont icon-fanhui"></i>
        </router-link>
        <span>全部订单</span>
    </div>
    <div class="tab-wrapper">
        <ul class="tab-content">
          <li :class="{checked: tab === 1}" @click="totalChange">
            <span class=" total-order">全部订单</span>
          </li>
          <li :class="{checked: tab === 2}" @click="unPayChange">
            <span class="pending-payment">待支付</span>
          </li>
          <li :class="{checked: tab === 3}" @click="payChange">
            <span class="paid">已支付</span>
          </li>
        </ul>
    </div>
    <div class="content">
<!--      全部订单-->
      <div class="total-order-wrapper " v-show="tab === 1">
        <ul class="total-order-content">
          <li class="total-order" v-for="(item,i) in totalOrder">
            <div class="item-header">
              <div class="time">
                <span class="title">下单时间：</span>
                <span v-text="item.orderTime.slice(0,16)"></span>
              </div>
              <span class="is-close" v-if="item.pay === 1">已关闭</span>
              <span class="go-order" v-else>去下单</span>
            </div>
            <ul class="item-body">
              <li v-for="item2 in  totalOrder[i].details">
                <img :src="item2.avatar" alt="">
                <div class="item-detail">
                  <div class="name-price">
                    <span v-text="item2.name"></span>
                    <span class="price" v-text="'￥' + item2.price + '.00'"></span>
                  </div>
                  <div class="brief-count">
                    <span class="brief">略</span>
                    <span class="count" v-text="'X' + item2.count"></span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="bottom">
              <button class="remove" @click="removeOrder(item.orderId)">删除订单</button>
              <button class="repurchase">重新购买</button>
            </div>
          </li>
        </ul>
      </div>
<!--      待支付订单-->
      <div class="waiting-paid-wrapper" v-show="tab === 2">
        <ul class="total-order-content">
          <li class="total-order" v-for="(item,i) in unPayOrder">
            <div class="item-header">
              <div class="time">
                <span class="title">下单时间：</span>
                <span v-text="item.orderTime.slice(0,16)"></span>
              </div>
              <span class="is-close" v-if="item.pay === 1">已关闭</span>
              <span class="go-order" v-else>去下单</span>
            </div>
            <ul class="item-body">
              <li v-for="item2 in unPayOrder[i].details">
                <img :src="item2.avatar" alt="">
                <div class="item-detail">
                  <div class="name-price">
                    <span v-text="item2.name"></span>
                    <span class="price" v-text="'￥' + item2.price + '.00'"></span>
                  </div>
                  <div class="brief-count">
                    <span class="brief">略</span>
                    <span class="count" v-text="'X' + item2.count"></span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="bottom">
              <button class="remove" @click="removeOrder(item.orderId)">删除订单</button>
              <button class="repurchase">重新购买</button>
            </div>
          </li>
        </ul>
      </div>
<!--      已支付订单-->
      <div class="unpaid-wrapper" v-show="tab === 3">
        <ul class="total-order-content">
          <li class="total-order" v-for="(item,i) in payOrder">
            <div class="item-header">
              <div class="time">
                <span class="title">下单时间：</span>
                <span v-text="item.orderTime.slice(0,16)"></span>
              </div>
              <span class="is-close" v-if="item.pay === 1">已关闭</span>
              <span class="go-order" v-else>去下单</span>
            </div>
            <ul class="item-body">
              <li v-for="item2 in payOrder[i].details">
                <img :src="item2.avatar" alt="">
                <div class="item-detail">
                  <div class="name-price">
                    <span v-text="item2.name"></span>
                    <span class="price" v-text="'￥' + item2.price + '.00'"></span>
                  </div>
                  <div class="brief-count">
                    <span class="brief">略</span>
                    <span class="count" v-text="'X' + item2.count"></span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="bottom">
              <button class="remove" @click="removeOrder(item.orderId)">删除订单</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { OrderApi } from '@/api'

export default {
  name: "TotalOrder",
  data() {
    return {
      // 全部订单拆分
      totalOrder: [],
      // 待支付拆分
      unPayOrder: [],
      payOrder:[],
      tab:  1
    };
  },
  async created() {
    try {
      if (this.getId === 2) {
        this.tab = null;
        this.tab = 2;
      }
      else this.tab = 1
      // 全部订单拆分
      this.totalOrder = await OrderApi.getAllOrder();
      // 待支付订单
      this.unPayOrder = await OrderApi.getUnpayOrder();
      // 已支付订单
      this.payOrder = await OrderApi.getPayOrder();
    }catch(e) {}
  },
  methods: {
    async removeOrder(id) {
        await this.$juanConfirm('确认删除订单？')
        await OrderApi.removeOrder(id);
        let totalId = this.totalOrder.findIndex(item => item.orderId === id);
        this.totalOrder.splice(totalId, 1);
      // try {
      //   // 全部订单拆分
      //   this.totalOrder = await OrderApi.getAllOrder();
      //   // 待支付订单
      //   this.unPayOrder = await OrderApi.getUnpayOrder();
      //   // 已支付订单
      //   this.payOrder = await OrderApi.getPayOrder();
      //   if (this.getId === 2) this.tab = 2
      //   else this.tab = 0
      // }catch(e) {}
      this.$juanNotice('删除成功！');
    },
    async totalChange() {
      this.tab = 1;
      this.totalOrder = await OrderApi.getAllOrder();
    },
    async unPayChange() {
      this.tab = 2;
      this.unPayOrder = await OrderApi.getUnpayOrder();
    },
    async payChange() {
      this.tab = 3;
      this.payOrder = await OrderApi.getPayOrder();
    },
  },
  computed: {
    getId() {
      let i = parseInt(this.$route.query.id)
      return i
    }
  }
}
</script>

<style scoped lang="stylus">
  .contains
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    overflow: auto
    .header
      height: 40px
      line-height: 40px
      text-align: center
      position: relative
      flex-shrink: 0
      i
        position: absolute
        top: 50%
        left: 20px
        transform: translateY(-50%)
        font-size: 18px
      span
        font-size: 18px
    .tab-wrapper
      height: 40px
      //display: flex
      flex-shrink: 0
      ul.tab-content
        display: flex
        justify-content: space-evenly
        li
          padding: 8px 20px
          height: 100%
          &.checked
            border-bottom: 2px solid #ff464e
            color: #ff464e
          span.total-order,span.pending-payment,span.paid
            //padding: 0 10px
            font-size: 14px
            height: 100%

    .content
      flex-grow: 1
      background-color: rgb(244,244,248)
      .total-order-wrapper,.waiting-paid-wrapper,.unpaid-wrapper
        margin-top: 20px
        background-color: #ffffff
        box-sizing: border-box
        ul.total-order-content
          li.total-order
            .item-header
              height: 40px
              display: flex
              align-items: center
              font-size: 14px
              color: #999999
              padding: 0 10px
              justify-content: space-between
              span.go-order
                color: #ff464e
                border: 1px solid #ff464e
                padding: 2px
            ul.item-body
              padding: 15px 10px
              background-color: rgb(250,250,250)
              li
                display: flex
                margin: 15px 0
                img
                  height: 80px
                  margin-right: 20px
                .item-detail
                  display: flex
                  flex-direction :column
                  width: 100%
                  height: 80px
                  align-items: center
                  justify-content: space-around
                  .name-price,.brief-count
                    display: flex
                    justify-content: space-between
                    width: 100%
                    font-size: 14px
            .bottom
              display: flex
              height: 55px
              align-items: center
              justify-content: flex-end
              padding: 0 10px
              button
                padding: 3px
                border: 1px solid #ff464e
                background-color: #ffffff
                color: #ff464e
              button.repurchase
                margin-left: 10px
</style>
