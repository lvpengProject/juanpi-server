<template>
  <div class="contains hide-scroll">
    <div class="header">
      <router-link to="/cart">
        <i class="iconfont icon-fanhui"></i>
      </router-link>
      <span>订单确认</span>
    </div>
    <div class="content hide-scroll">
      <div class="choose-address">
        <div class="default-address"
             v-if="$store.getters['defaultAddress']"
             v-show="!changeAddress"
        >
            <i class="iconfont icon-dizhi"></i>
            <div class="address-content">
              <div class="name-phone">
                <span class="name" v-text="$store.getters['defaultAddress'].receiveName"></span>
                <span class="phone" v-text="$store.getters['defaultAddress'].receivePhone"></span>

              </div>
              <div class="region-detail">
                <span class="region" v-text="$store.getters['defaultAddress'].receiveRegion"></span>
                <span class="detail" v-text="$store.getters['defaultAddress'].receiveDetail"></span>
              </div>
            </div>
<!--          展开地址选择页面-->
          <i class="iconfont icon-xuanzeqizhankai spread"
             @click="changeAddress = true"></i>
        </div>
          <div class="change-address" v-show="changeAddress">
            <ul class="address-list">
              <!--            选择地址-->
              <li v-for="item in $store.state.address.list"
                  :key="item.id"
              >
                <i class="checkbox"
                   :class="{ checked: item.isDefault === 1 }"
                   @click="changeDefault(item.id)"
                ></i>
                <div class="item-detail">
                  <div class="name-phone" @click="changeDefault(item.id)">
                    <span class="name" v-text="item.receiveName"></span>
                    <span class="phone" v-text="item.receivePhone"></span>
                    <span class="default" v-show="item.isDefault === 1"></span>
                  </div>
                  <div class="region-detail" @click="changeDefault(item.id)">
                    <span class="region" v-text="item.receiveRegion"></span>
                    <span class="detail" v-text="item.receiveDetail"></span>
                  </div>
<!--                  地址编辑-->
                  <i class="iconfont icon-bianji edit" @click="beginEdit(item)"></i>
                </div>
              </li>
            </ul>
            <div class="add-address-wrapper">
              <button class="add-address" @click="beginAdd">添加地址</button>
              <!--            收起地址选择页面的按钮-->
              <div class="put-away-wrapper" @click="changeAddress = !changeAddress">
                <span class="put-away">收起</span>
                <i class="iconfont icon-shouqi"></i>
              </div>
            </div>
            <OrderConformEdit :model="model"
                              v-if="isEdit"
                              :is-edit="isEdit"
                              v-model="isEdit"
                              @endEdit="save"
                              @closeEdit="closeEdit"
            ></OrderConformEdit>
          </div>
      </div>
      <div class="product-wrapper">
        <ul class="product-list hide-scroll">
          <li v-for="item in buyList" :key="item.id">
            <img :src="item.avatar" alt="">
          </li>
        </ul>
        <div class="product-count" @click="expandList = true">
          共<span v-text="itemCount"></span>件
          <i class="iconfont icon-zhankai"></i>
        </div>
      </div>
     <div class="product-dialog" v-show="expandList">
       <transition>
         <div class="product-list-details" v-show="expandList">
           <div class="detail-top">
             <span class="title">商品</span>
             <i class="iconfont icon-guanbi" @click="expandList = !expandList"></i>
           </div>
           <ul class="detail-list  hide-scroll">
             <li v-for="item in buyList" :key="item.id">
               <div class="business-information">
                 <div class="merchant-ships-wrapper">
                   <span class="merchant-ships">商家发货</span>
                   <span class="free-shipping">运费：包邮</span>
                 </div>
                 <div class="merchant-center">
                   <i class="iconfont icon-dianpu"></i>
                   <p>从<span>tiiek女装官方旗舰店</span>发货</p>
                 </div>
               </div>
                <div class="wrapper">
                  <img :src="item.avatar" alt="">
                  <div class="item-detail">
                    <div class="name-price-wrapper">
                      <span class="name" v-text="item.name"></span>
                      <span class="price" v-text="'￥' + item.price + '.00'"></span>
                    </div>
                    <div class="brief-count-wrapper">
                      <span class="brief" v-text="item.brief"></span>
                      <span class="count" v-text="'X' + item.count"></span>
                    </div>
                  </div>
                </div>
             </li>
             <li class="store-message-wrapper">
                 <input type="text" placeholder="给卖家留言(50字以内)">
             </li>
           </ul>

         </div>
       </transition>
     </div>
      <div class="total-amount-wrapper">
        <span class="total-amount">商品总额</span>
        <span class="count" v-text="'￥' + totalCount + '.00'"></span>
      </div>
      <div class="total-discount-wrapper">
        <span class="total-discount">优惠总额</span>
        <div>
          <span class="discount">-¥221.70</span>
<!--          <i class="iconfont icon-xuanzeqizhankai"></i>-->
        </div>
      </div>
      <div class="use-coupons-wrapper">
        <span class="use-coupons">使用优惠券</span>
        <div>
          <span class="coupons">暂无可用券</span>
<!--          <i class="iconfont icon-zhankai"></i>-->
        </div>
      </div>
      <div class="payment-method">
        <div class="method-top">
          <span class="title">支付方式</span>
        </div>
        <div class="weixin-method">
          <div class="weixin">
            <i class="iconfont icon-weixin"></i>
            <span class="name">微信支付</span>
            <span class="remark">(仅支持微信6.0.2及以上版本)</span>
          </div>
          <i class="checkbox"
             :class="{ checked: checked }"
             @click="checked = !checked"
          ></i>
        </div>
        <div class="zhifubao-method">
          <div class="zhifubao">
            <i class="iconfont icon-zhifubaozhifu"></i>
            <span class="name">支付宝支付</span>
            <span class="remark">推荐</span>
          </div>
          <i class="checkbox"
             :class="{ checked: !checked }"
             @click="checked = !checked"
          ></i>
        </div>
      </div>
    </div>
    <div class="footer">
      <i class="iconfont icon-tanhao" @click="remindCustomers = !remindCustomers"></i>
      <div class="amounts-payable-wrapper" @click="remindCustomers = !remindCustomers">
        <span class="title">应付金额:</span>
        ￥<span v-text="totalCount" class="total-count"></span>.00
      </div>
      <button @click="toOrder">去付款</button>
      <div class="remind" v-show="remindCustomers">
        <span class="overage">余额支付：￥0.00</span>
        <span class="separate">|</span>
        <span class="need-pay">还需支付：￥{{totalCount}}.00</span>
        <img src="../assets/images/close.png"
             alt="" class="close"
             @click="remindCustomers = false"
        >
        <img src="../assets/images/arrow_down.png" alt="" class="down">
      </div>
    </div>
  </div>
</template>

<script>
import {CartApi, OrderApi} from "@/api";
import OrderConformEdit from "@/views/OrderConformEdit";

export default {
  name: "OrderConfirm",
  components: { OrderConformEdit },
  data() {
      return {
          addressList:[],
          buyList: [],
          changeAddress: false,
          isEdit: false,
          model: null,
          expandList: false,
          checked: true,
          remindCustomers: false,
          orderList: null,
          confirm: null
      };
  },
  async created() {

    let ids = JSON.parse(this.$route.query.ids); // 购物车所选商品的id
    const [list] = await Promise.all([
        CartApi.getBuyIds(ids),
        this.$store.dispatch('init')
    ]);
        this.buyList = list;
        let addressId = this.$store.getters['defaultAddress'].id;
    this.confirm = {
      ids: ids,
      account: this.totalCount,
      addressId: addressId
    }
  },
  computed: {
    itemCount() {
      let itemCount = 0
      this.buyList.forEach(item => {
        itemCount += item.count;
      })
      return itemCount
    },
    totalCount() { // 计算的总金额
      let totalCount = 0;
      this.buyList.forEach(item => {
        totalCount += item.price * item.count
      })
      return totalCount;
    },
  },
  methods: {
    async toOrder() {
      if(this.$store.getters['defaultAddress'] === undefined) {
        this.$juanNotice('请去地址管理添加您的默认地址！')
        return;
      }
      await OrderApi.orderConfirm(this.confirm)
      this.orderList = {
        buyList: this.buyList,
        defaultAddress: this.$store.getters['defaultAddress']
      }
      this.$router.replace(`/order?orderList=${JSON.stringify(this.orderList)}`);
    },
    changeDefault(id) {
      this.$store.state.address.list.find(item => item.isDefault === 1).isDefault = 0;
      this.$store.state.address.list.find(item => item.id === id).isDefault = 1;
      this.changeAddress = !this.changeAddress;
    },
    beginAdd() {
      this.model = {
          id: 0,
          name: sessionStorage.getItem('name'),
          receiveName: '',
          receivePhone: '',
          receiveDetail: '',
          receiveRegion: ''
      };
      this.isEdit = true;
    },
    beginEdit(item) {
      this.model = { ...item };
      this.isEdit = true;
    },
    save(address) {
      address.id = this.model.id;
      this.$store.dispatch(
          `${this.model.id ===0 ?  'add' : 'update'}`,
          { ...this.model, ...address }
      );
      this.model.id === 0 ? this.$juanNotice('添加收货地址成功！') : this.$juanNotice('修改地址成功！');
      this.isEdit = false;
    },
    closeEdit(value) {
      this.isEdit = value;
    },

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
      height: 12vw
      flex-shrink: 0
      position: relative
      text-align: center
      line-height: 10.6vw
      i.icon-fanhui
        font-size: 5.3vw
        position: absolute
        top: 50%
        left: 5.3vw
        transform: translateY(-50%)
      span
        font-size: 4.8vw
    .content
      flex-grow: 1
      border-top: 1px solid #b0b0b0
      border-bottom: 1px solid #b0b0b0
      background-color: rgb(244, 244, 248)
      overflow: auto
      .choose-address
        display: flex
        flex-direction: column
        .default-address
          height: 18.6vw
          background-color: #48505a
          color: #ffffff
          position: relative
          display: flex
          align-items: center
          i.icon-dizhi
            position: absolute
            top:40%
            left: 2.6vw
            font-size: 6.7vw
          .address-content
            display: flex
            flex-direction: column
            justify-content: space-between
            .name-phone,.region-detail
              margin-left: 12vw
              font-size: 3.7vw
            .name-phone
              margin-bottom: 1.3vw
              span.name,span.region
                margin-right: 2.6vw
          i.spread
            position: absolute
            top: 50%
            right:4vw
            transform: translateY(-50%)
            font-size: 4.8vw
        .change-address
          padding: 0 0 4vw 0
          background-color: #ffffff
          display: flex
          flex-direction: column
          ul.address-list
            border: none
            li
              position: relative
              display: flex
              margin: 5.3vw 0
              i.checkbox
                position: absolute
                top: 50%
                left: 2.6vw
                height: 4.8vw
                width: 4.8vw
                border: 1px solid #b0b0b0
                border-radius: 50%
                transform: translateY(-50%)
                background-size: 100% 100%
                background-image: url("../assets/images/icon_checkbox_uncheck.png")
                &.checked
                  background-image: url("../assets/images/icon_checkbox_check.png")
                  border: 1px solid #b0b0b0
                  background-color: #ff464e
              .item-detail
                margin-left: 13.3vw
                .name-phone,.region-detail
                  font-size: 3.7vw
                .name-phone
                  margin-bottom: 1.3vw
                  span.name,span.region
                    margin-right: 2.6vw
                  span.phone
                    margin-right: 2.6vw
                  span.default
                    color: #ff464e
                    font-size: 3.2vw
                    padding: 2px
              i.edit
                position: absolute
                top: 50%
                right: 2.6vw
                transform: translateY(-50%)
                color: #666
                font-size: 5.3vw
          .add-address-wrapper
            display: flex
            justify-content: center
            position: relative
            button.add-address
              width: 26.7vw
              height: 9.3vw
              background-color: #ffffff
              color: #333
              border: 1px solid #b0b0b0
            .put-away-wrapper
              position: absolute
              top: 50%
              right: 2.6vw
              transform: translateY(-50%)
              color: #999999
              display: flex
              align-items: center
              span.put-away
                font-size: 3.2vw
              i.icon-shouqi
                font-size: 5.3vw
                margin-left: 1.3vw

      .product-wrapper
        width: 100vw
        background-color: #ffffff
        margin-top: 2.6vw
        padding: 2.6vw
        box-sizing: border-box
        display: flex
        position: relative
        ul.product-list
          display: flex
          overflow: auto
          height: 21.3vw
          margin-right: 8vw
          li
            display: flex
            justify-content: flex-start
            img
              height: 21.3vw
              width: 21.3vw
              flex-shrink: 0
        .product-count
          position: absolute
          top: 50%
          right: 4vw
          transform: translateY(-50%)
          font-size: 2.6vw
          display: flex
          flex-direction: column
          justify-content: space-evenly
          align-items: center
          color: #999999
          i
            font-size: 1.3vw
            margin-top: 1.3vw
      .product-dialog
        position: fixed
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, 0.5)
        z-index: 1000
        .product-list-details
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          height: 510px
          display: flex
          flex-direction: column
          background-color: #ffffff

          &.v-enter,&.v-leave-to
            transform: translateY(100%)
          &.v-enter-active,&.v-leave-active
            transition: all 0.5s
          &.v-enter-leave,&.v-leave
            transform: translateY(0)
          .detail-top
            height: 13.3vw
            line-height: 13.3vw
            text-align: center
            position: relative
            flex-shrink: 0
            span.title
              color: #333
            i
              position: absolute
              top: 50%
              right: 2.6vw
              transform: translateY(-50%)
              font-weight: bold
              font-size: 3.7vw
          ul.detail-list
            flex-grow: 1
            overflow: auto
            padding: 0 5.3vw 5.3vw 4vw
            display: flex
            flex-direction: column
            li
              display: flex
              margin: 2.6vw 0
              flex-direction: column
              .business-information
                .merchant-ships-wrapper
                  display: flex
                  justify-content: space-between
                  height: 10.6vw
                  align-items: center
                  span
                    font-size: 3.7vw
                    color: #333
                .merchant-center
                  display: flex
                  height: 10.6vw
                  align-items: center
                  i.icon-dianpu
                    font-size: 5.3vw
                    margin-right: 2.6vw
                  p
                    font-size: 3.7vw
                    color: #666
                    span
                      color: #4a4a4a
              .wrapper
                display: flex
                padding: 2.6vw 0
                img
                  height: 18.6vw
                  width: 18.6vw
                .item-detail
                  flex-grow: 1
                  margin-left: 2.6vw
                  .name-price-wrapper
                    display: flex
                    justify-content: space-between
                    color: #333
                    font-size: 3.2vw
                    margin-bottom: 2.6vw
                  .brief-count-wrapper
                    display: flex
                    justify-content: space-between
                    align-items: center
                    font-size: 3.7vw
                    color: #bbb
                    span.brief
                      width: 40vw
                      white-space: nowrap
                      text-overflow: ellipsis
                      overflow: hidden

            li.store-message-wrapper
              width: 100%
              input
                width: 100%
                height: 10.6vw
                border: none
                outline: none
                background-color: #fafafa
                text-indent: 5.3vw
      .total-amount-wrapper,.total-discount-wrapper,.use-coupons-wrapper
        display: flex
        padding: 4vw 5.3vw 1.3vw 2.6vw
        box-sizing: border-box
        background-color: #ffffff
        width: 100%
        justify-content: space-between
        span.total-amount,span.count,span.use-coupons,span.coupons,span.total-discount,span.discount
          color: #333
          font-size: 3.4vw
      .payment-method
        height: 40vw
        width: 100%
        display: flex
        flex-direction: column
        background-color: #ffffff
        margin-top: 4vw
        justify-content: space-evenly
        padding: 0 2.6vw 0 2.6vw
        box-sizing: border-box
        margin-bottom: 10.6vw
        .method-top
          display: flex
          align-items: center
        .weixin-method
          display: flex
          justify-content: space-between
          .weixin
            display: flex
            align-items: center
            i.icon-weixin
              font-size: 6.7vw
              background-color: rgb(15, 207, 50)
              color: #ffffff
              border-radius: 1.3vw
              margin-right: 1.3vw
            span.name
              font-size: 3.2vw
              color: #333
              margin-right: 1.3vw
            span.remark
              font-size: 2.1vw
              color: #bbb
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
        .zhifubao-method
          display: flex
          justify-content: space-between
          .zhifubao
            display: flex
            align-items: center
            i.icon-zhifubaozhifu
              font-size: 6.7vw
              background-color: #ffffff
              color: rgb(0, 187, 238)
              border-radius: 1.3vw
              margin-right: 1.3vw
            span.name
              font-size: 3.2vw
              color: #333
              margin-right: 1.3vw
            span.remark
              font-size: 2.1vw
              color: #bbb
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
              background-color: #ff464e
    .footer
      height: 13.3vw
      line-height: 13.3vw
      flex-shrink: 0
      display: flex
      justify-content: flex-end
      align-items: center
      position: relative
      i.icon-tanhao
        color: #bbb
        font-size: 3.7vw
      .amounts-payable-wrapper
        font-size: 3.2vw
        color: #ff464e
        margin-left: 1.3vw
        span.title
          color: #333
        span.total-count
          color: #ff464e
          font-size: 4.8vw
          margin-left: 1.3vw
      button
        width: 36vw
        height: 100%
        margin-left: 2.6vw
        border: none
        background-color: #ff464e
        color: #ffffff
        a
          color: #ffffff
      .remind
        width: 97.3vw
        height: 10.6vw
        position: absolute
        bottom: 140%
        left: 50%
        transform: translateX(-50%)
        border-radius: 1.3vw
        background-color: #000000b3
        display: flex
        align-items: center
        padding-left: 5.3vw
        span.overage, span.need-pay
          color: #ffffff
          font-size: 3.4vw
        span.separate
          margin: 0 2.6vw
          font-size: 2.1vw
          color: #b0b0b0
        img.close
          position: absolute
          top: 50%
          right: 2.6vw
          transform: translateY(-50%)
          height: 5.3vw
        img.down
          position: absolute
          top: 100%
          left: 25%
          height: 1.3vw
</style>
