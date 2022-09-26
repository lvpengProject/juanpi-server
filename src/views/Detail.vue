<template>
  <div class="contains">
    <div class="content hide-scroll">
      <div class="scroll" ref="scroll">
        <ul ref="scrollContent" class="scroll-content">
          <li><img :src="bannerImgs[bannerImgs.length - 1]" alt=""></li>
          <li v-for="item in bannerImgs">
            <img :src="item" alt="">
          </li>
          <li><img :src="bannerImgs[0]" alt=""></li>
        </ul>
        <div class="indicator">
          <span v-text="currentPage"></span>/<span v-text="this.bannerImgs.length"></span>
        </div>
        <div class="spread-wrapper">
          <i class="iconfont icon-zhankaii" @click="isShow = !isShow"></i>
        </div>
        <ul class="spread-content" v-show="isShow">
          <li>
            <router-link to="/home">
              <i class="iconfont icon-home"></i>
              <span>首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/cart">
              <i class="iconfont icon-cart"></i>
              <span>购物车</span>
            </router-link>
          </li>
          <li>
            <router-link to="/totalorder">
              <i class="iconfont icon-wodedingdan"></i>
              <span>我的订单</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="goods-information">
        <div class="price-sale">
          <div class="price-wrapper">
            ￥<span class="price" v-text="model.price"></span>
            <span class="original-price">￥299</span>
            <span class="baoyou">包邮</span>
          </div>
          <div class="sale-wrapper">
            <span class="sale" v-text="model.sale"></span>人已购
          </div>
        </div>
        <div class="brief-wrapper">
          <span class="brief" v-text="model.brief"></span>
          <i class="iconfont icon-jiarushoucang"></i>
        </div>
      </div>
      <div class="service-desc" @click="serviceShow = true">
        <ul class="service-content">
          <li>·<span>24小时发货</span></li>
          <li>·<span>7天包退</span></li>
          <li>·<span>售后补贴</span></li>
        </ul>
        <i class="iconfont icon-zhankai"></i>
      </div>
<!--      <div class="service-dialog" v-show="serviceShow">-->
<!--        <transition>-->
<!--          <div class="service-dialog-content" v-show="serviceShow">-->
<!--            <div class="service-top">-->
<!--              <span>服务说明</span>-->
<!--              <i class="iconfont icon-guanbi" @click="serviceShow = false"></i>-->
<!--            </div>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </div>-->
      <div class="choose-size" @click="sizeShow = true">
        <div class="choosed">
          已选择：<span>蓝色（好品质）{{chosenProduct}}</span>
        </div>
        <i class="iconfont icon-zhankai"></i>
      </div>
      <div class="size-dialog" v-show="sizeShow">
        <transition>
          <div class="size-dialog-content" v-show="sizeShow">
            <div class="size-dialog-header">
              <img :src="model.avatar" alt="" class="avatar">
              <div class="dialog-detail">
                <span class="dialog-price" v-text="'￥' + model.price"></span>
                <div class="dialog-chosen">
                  已选择
                  <span class="color">蓝色（好品质）</span>
                  <span class="size">{{ chosenSize }}</span>
                </div>
              </div>
              <i class="iconfont icon-guanbi" @click="sizeShow = false"></i>
            </div>
            <div class="size-dialog-color">
              <span class="color-title">颜色</span>
              <button class="chosen-color">蓝色（好品质）</button>
            </div>
            <div class="size-dialog-size">
              <span class="size-title">尺码</span>
              <div class="total-size">
                <button @click="chosenSize = sizes[0]" :class="{checked: chosenSize === sizes[0]}">{{sizes[0]}}</button>
                <button @click="chosenSize = sizes[1]" :class="{checked: chosenSize === sizes[1]}">{{sizes[1]}}</button>
                <button @click="chosenSize = sizes[2]" :class="{checked: chosenSize === sizes[2]}">{{sizes[2]}}</button>
                <button @click="chosenSize = sizes[3]" :class="{checked: chosenSize === sizes[3]}">{{sizes[3]}}</button>
                <button @click="chosenSize = sizes[4]" :class="{checked: chosenSize === sizes[4]}">{{sizes[4]}}</button>
              </div>
            </div>
            <div class="purchase-quantity">
              <span class="quantity-title">购买数量</span>
              <div class="change-count">
                <button class="decrease"
                        :disabled="detailList.count === 1"
                        :class="{disabled: detailList.count === 1}"
                        @click="decrease"
                >-</button>
                <span v-text="detailList.count" class="count"></span>
                <button class="increase"
                        @click="increase"
                        :disabled="detailList.count === 5"
                        :class="{disabled: detailList.count === 5}"
                >+</button>
              </div>
            </div>
            <div class="goods-determined">
              <button class="determined" @click="determined">确定</button>
            </div>
          </div>
        </transition>
      </div>
      <div class="product-graphic-details">
        <div class="product-tab-wrapper">
          <ul class="product-tab">
            <li :class="{checked: tab === 1}" @click="tab = 1">图文详情</li>
            <li :class="{checked: tab === 2}" @click="tab = 2">商品参数</li>
            <li :class="{checked: tab === 3}" @click="tab = 3">咨询与售后</li>
          </ul>
          <div class="graphic-details">
            <div class="graphic-details-content" v-show="tab === 1">
              商家提醒：<span>此商品由品牌商发货。</span>
            </div>
            <div class="product-parameters" v-show="tab === 2">
              <div class="common-express">
                <span>常用快递</span>
                <span>运费</span>
              </div>
              <div class="courier-name">
                <span>申通快递</span>
                <span style="color: #ff7700">全国包邮(偏远地区除外)</span>
              </div>
            </div>
            <div class="after-sales" v-show="tab === 3">
              <span>略</span>
            </div>
          </div>
        </div>
        <div class="item-others-images" v-show="tab === 1">
          <ul class="others-images">
            <li v-for="item in otherImgs" :key="item.id">
              <img :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link to="/home" class="home-wrapper">
        <img src="../assets/images/home.png" alt="" class="home">
        <span class="home">首页</span>
      </router-link>
      <router-link to="/cart" class="cart-wrapper">
        <img src="../assets/images/cart.png" alt="" class="cart">
        <span class="cart">购物车</span>
        <div class="cart-list-wrapper" v-if="cartList.length!==0">
          <div class="cart-count-wrapper" v-text="sumCount"></div>
        </div>
      </router-link>
      <button class="buy">立即购买</button>
      <button class="add-cart"
              @click="addToShoppingCart"
      >加入购物车</button>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll'
import {ProductApi, CartApi} from "@/api";

export default {
  name: "Detail",
  data() {
    return {
        isLogin: !!(sessionStorage.getItem('token')),
        currentPage: 0,
        model: null,
        // 控制右上角展开
        isShow: false,
        // 控制服务说明展开
        serviceShow: false,
        // 控制选择尺寸
        sizeShow: false,
        // 购物车数据
        cartList: [],
        // 商品尺寸
        sizes: ['M','L','S','XL','2XL'],
        // 选择的尺寸
        detailList: {
          pid: 0,
          count: 1
        },
        tab: 1
    };
  },
  methods: {
    // 加入购物车

     addToShoppingCart() {
      this.sizeShow = true;
    },
    async determined() {
      if(this.isLogin) {
        await CartApi.addToShoppingCart(this.detailList)
        await this.$router.go(0);
        this.$juanNotice('加入购物车成功！');
        this.sizeShow = false
      }else {
        this.$router.push('/login')
      }
      this.sizeShow = false;
    },
    decrease() {
      this.detailList.count --;
    },
    increase() {
      this.detailList.count ++;
    },
  },
  watch:{
    deep: true,
    immediate:true,
    handler: function() {
      this.sumCount()
    }
  },
  computed: {
    bannerImgs() {
      return this.model ? this.model.bannerImgs.split(',') : [];
    },
    otherImgs() {
      return this.model ? this.model.otherImgs.split(',') : [];
    },
    sumCount(){
      let sumCount = 0
      this.cartList.forEach(item => {
        sumCount += item.count
      })
      return sumCount;
    }
  },
  async created() {
      try {
        let id = parseInt(this.$route.params.id);
        this.model = await ProductApi.getModel(id);
        this.detailList.pid  = this.model.id;
        if(this.isLogin) this.cartList = await CartApi.get();
        this.$nextTick(() => {
          // this.$refs.scroll.addEventListener('touchmove', (e) => {
          //   e.preventDefault();
          // })
          this.$refs.scrollContent.style.width = `${this.bannerImgs.length + 2}00vw`
          this.scroll = new IScroll(this.$refs.scroll, {
            momentum: false,
            scrollY: false,
            scrollX: true,
            snap: true,
            click: true,
            bounce: false,
            deceleration: 0.003,
          });

          this.scroll.on('scrollEnd', () => {
            if(this.scroll.currentPage.pageX === this.bannerImgs.length + 1){
              this.scroll.goToPage(1, 0, 0);
              this.currentPage = 1;
              return;
            }
            if(this.scroll.currentPage.pageX === 0) {
              this.scroll.goToPage(this.bannerImgs.length, 0, 0);
              this.currentPage = this.bannerImgs.length;
              return;
            }
            this.currentPage = this.scroll.currentPage.pageX;
          })
          this.scroll.goToPage(1, 0, 0);
          this.currentPage = 1;
        })
      }catch(e) {}
  }
}
</script>

<style lang="stylus" scoped>
.contains
  width: 100vw
  height: 100vh
  //position: relative
  display: flex
  flex-direction: column
  .content
    background-color: rgb(244, 244, 248)
    display: flex
    flex-direction: column
    flex-grow: 1
    overflow: auto
    .scroll
      //touch-action: pan-x
      touch-action: none
      overflow: hidden
      position: relative
      flex-shrink: 0
      ul.scroll-content
        display: flex
        li
          width: 100vw
          height: 100vw
          flex-shrink: 0
          img
            width: 100%
      .indicator
        position: absolute
        bottom: 5.3vw
        right: 2.6vw
        width: 10.6vw
        height: 5.3vw
        display: flex
        justify-content: center
        align-items: center
        background-color: rgba(0, 0, 0, 0.5)
        font-size: 3.2vw
        color: #ffffff
      .spread-wrapper
        height: 8vw
        width: 8vw
        background-color: rgba(0, 0, 0, 0.5)
        border-radius: 50%
        text-align: center
        line-height: 8vw
        position: absolute
        top: 5.3vw
        right: 5.3vw
        i
          font-size: 8vw
          color: #ffffff
      ul.spread-content
        height: 32vw
        width: 30.6vw
        background-color: rgba(0,0,0,0.5)
        position: absolute
        top: 16vw
        right: 1.3vw
        z-index: 100000
        display: flex
        flex-direction: column
        justify-content: space-evenly
        align-items: flex-start
        padding-left: 4vw
        box-sizing: border-box
        li
          a
            color: #ffffff
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 6.7vw
              margin-right: 2.1vw
            span
              font-size: 3.7vw
    .goods-information
      height: 32vw
      width: 100%
      background-color: #ffffff
      display: flex
      flex-direction: column
      justify-content: space-evenly
      padding: 0 2.6vw
      box-sizing: border-box
      flex-shrink: 0
      .price-sale
        display: flex
        justify-content: space-between
        align-items: center
        color: #ff464e
        .price-wrapper
          font-size: 4.2vw
          position: relative
          span.price
            color: #ff464e
            font-size: 6.7vw
          span.original-price
            font-size: 3.7vw
            color: #b0b0b0
            text-decoration: line-through
            margin: 0 1.3vw
          span.baoyou
            color: #ffffff
            background-color: #ff464e
            font-size: 3.2vw

        .sale-wrapper
          color: #b0b0b0
          font-size: 3.7vw
      .brief-wrapper
        display: flex
        justify-content: space-between
        position: relative
        span.brief
          font-size: 4.8vw
        i.icon-jiarushoucang
          font-size: 7.4vw
    .service-desc
      height: 13.3vw
      width: 100%
      background-color: #ffffff
      margin: 3.2vw 0
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 2.6vw
      box-sizing: border-box
      flex-shrink: 0
      ul.service-content
        display: flex
        justify-content: space-evenly
        align-items: center
        width: 80vw
        li
          display: flex
          align-items: center
          color: #ff464e
          font-size: 6.7vw
          span
            color: #b0b0b0
            font-size: 3.2vw
      i.icon-zhankai
        font-size: 6.7vw
        color: #b0b0b0
    .service-dialog
      height: 100vh
      width: 100vw
      position: fixed
      top: 0
      left: 0
      background-color:rgba(0, 0, 0, 0.5)
      z-index: 1000
      .service-dialog-content
        height: 96vw
        width: 100%
        background-color: #ffffff
        position: absolute
        bottom: 0
        left: 0
        &.v-enter,&.v-leave-to
          transform: translateY(100%)
        &.v-enter-active,&.v-leave-active
          transition: all 0.5s
        &.v-enter-leave,&.v-leave
          transform: translateY(0)
        .service-top
          height: 13.3vw
          border-bottom: 1px solid #b0b0b0
          text-align: center
          line-height: 13.3vw
          font-size: 4.8vw
          color: #333
          position: relative
          i.icon-guanbi
            position: absolute
            top: 50%
            right: 4vw
            transform: translateY(-50%)
            font-size:5.3vw
            font-weight: bold
    .choose-size
      height: 13.3vw
      width: 100%
      background-color: #ffffff
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 2.6vw
      box-sizing: border-box
      flex-shrink: 0
      .choosed
        font-size: 4.8vw
        color: #333333
      i
        font-size: 6.7vw
        color: #b0b0b0
    .size-dialog
      height: 100vh
      width: 100vw
      background-color: rgba(0,0,0,0.5)
      position: fixed
      top: 0
      left: 0
      z-index: 10000
      .size-dialog-content
        height: 112vw
        width: 100%
        background-color: #ffffff
        position: absolute
        bottom: 0
        left: 0
        display: flex
        flex-direction: column
        justify-content: space-between
        &.v-enter
          transform: translateY(100%)
        &.v-enter-active
          transition: all 0.5s
        &.v-enter-to
          transform: translateY(0)
        .size-dialog-header
          height: 23.4vw
          display: flex
          padding: 1.3vw 0 0 4vw
          flex-shrink: 0
          img.avatar
            height: 29.3vw
            transform: translateY(-40%)
            margin-right: 4vw
          .dialog-detail
            display: flex
            flex-direction: column
            span.dialog-price
              font-size: 4.8vw
              color: #ff464e
            .dialog-chosen
              font-size: 3.7vw
              color: #666
          i
            position: absolute
            top: 4vw
            right: 4vw
            font-size: 4.8vw
            font-weight: bold
            color: #b0b0b0
        .size-dialog-color
          display: flex
          flex-direction: column
          padding: 0 2.6vw
          .color-title
            padding: 1.3vw 0
          button.chosen-color
            width: 30.6vw
            height: 9.3vw
            background-color: #ff464e
            color: #fff
            border: none
        .size-dialog-size
          padding: 0 2.6vw
          display: flex
          flex-direction: column
          span.size-title
            padding: 1.3vw 0
          .total-size
            width: 104vw
            button
              width: 26.7vw
              height: 10.6vw
              border: none
              margin: 1.3vw 2.6vw
              &.checked
                background-color: #ff464e
                color: #ffffff
        .purchase-quantity
          display: flex
          padding: 0 2.6vw
          justify-content: space-between
          align-items: center
          span.quantity-title
            padding: 1.3vw 0
          .change-count
            display: flex
            align-items: center
            button
              height: 9.3vw
              width: 9.3vw
              color: #ff464e
              border: none
              background-color: rgb(247, 247, 247)
              &.disabled
                color: #dbdbdb
            span.count
              margin: 0 2.6vw

        .goods-determined
          display: flex
          button.determined
            width: 100%
            height: 13.3vw
            background-color: #ff464e
            color: #fff
            font-size: 4.8vw
            border: none
    .product-graphic-details
      margin-top: 3.2vw
      .product-tab-wrapper
        background-color: #ffffff
        ul.product-tab
          display: flex
          padding: 2.6vw
          align-items: center
          li
            width: 33.333333%
            text-align: center
            padding: 2.1vw 0
            color: #666
            border: 1px solid #b0b0b0
            &.checked
              background-color: #666
              color: #ffffff

        .graphic-details
          .graphic-details-content
            padding: 2.6vw
            margin-top: 4vw
            color: #ff7700
            span
              color: #9b9b9b
          .product-parameters
            padding: 2.6vw
            margin-top: 1.3vw
            display: flex
            .common-express,.courier-name
              display: flex
              flex-direction: column
              color: #bbb
              span
                padding: 1.3vw 0
            .common-express
              margin-right: 10.6vw
          .after-sales
            padding: 5.3vw 2.6vw
      .item-others-images
        background-color: #ffffff
        margin-top: 2.6vw
        ul.others-images
          font-size: 0
          li
            img
              width: 100%
  .footer
    height: 17.3vw
    width: 100%
    background-color: #ffffff
    flex-shrink: 0
    display: flex
    position: relative
    border-top: 1px solid #b0b0b0
    a.home-wrapper
      width: 20vw
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      border-right: 1px solid #b0b0b0
      img.home
        height: 8vw
        color: #b0b0b0
      span.home
        font-size: 3.2vw
        color: #666
    a.cart-wrapper
      width: 20vw
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      border-right: 1px solid #b0b0b0
      position: relative
      img.cart
        height: 8vw
        color: #b0b0b0
      span.cart
        font-size: 3.2vw
        color: #666
      .cart-list-wrapper
        position: absolute
        top: 2.1vw
        right: 4.8vw
        height: 4.2vw
        width: 4.2vw
        border-radius: 50%
        background-color: #ff464e
        display: flex
        align-items: center
        justify-content: center
        font-size: 1px
        color: #ffffff
    button.buy
      width: 25.3vw
      border: none
      background-color: #ffffff
    button.add-cart
      flex-grow: 1
      border: none
      background-color: #ff464e
      color: #fff
</style>
