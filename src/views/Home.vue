<template>
  <div class="contains">
<!-- -->
    <div class="header">
      <div class="header-top">
        <img src="../assets/images/login-header.png" alt="">
      </div>
      <div class="header-search">
        <i  class="iconfont icon-fangdajing"></i>
        <img src="../assets/images/juanpi.png" alt="">
        <input type="text">
        <router-link to="/category">
          <i class="iconfont icon-fenlei"></i>
        </router-link>
      </div>
    </div>
    <div class="content hide-scroll" ref="scroll">
<!--      <div class="banner-wrapper" ref="scroll">-->
<!--        <Rotation></Rotation>-->
<!--      </div>-->
      <ul class="product-categories">
        <li><i class="last"></i></li>
        <li><i class="limited"></i></li>
        <li><i class="brand"></i></li>
        <li><i class="life"></i></li>
      </ul>
      <div class="festival">
        <img src="../assets/images/festival.gif" alt="">
      </div>
      <div class="grouping-wrapper">
        <img src="../assets/images/clearance.png" alt="" class="clearance">
        <div class="limit-shop">
          <img src="../assets/images/snapUppng.png" alt="" class="snap-up">
          <img src="../assets/images/supermarket.png" alt="" class="shop">
        </div>
      </div>
      <div class="middle-title">
        <img src="../assets/images/title.png" alt="" class="title">
      </div>
      <div class="product-content-wrapper">
        <ul class="tab-wrapper">
          <li :class="{checked: tab === 1}" @click="tab = 1"><span>精选专场</span></li>
          <li :class="{checked: tab === 2}" @click="tab = 2"><span>精选单品</span></li>
        </ul>
        <div class="featured-show" v-show="tab === 1">
          <ul class="featured-show-list">
            <li v-for="item in featuredShow" :key="item.id">
              <img :src="item.avatar" alt="">
              <div class="item-detail">
                <div class="price-wrapper">
                  <span class="price" v-text="'￥' + item.price"></span>
                  <span class="original-price" v-text="'￥' + item.originalPrice"></span>
                </div>
                <span class="name" v-text="item.name"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="featured-items" v-show="tab === 2">
          <ul class="featured-show-list">
            <li v-for="item in featuredItems" :key="item.id">
              <img :src="item.avatar" alt="">
              <div class="item-detail">
                <div class="price-wrapper">
                  <span class="price" v-text="'￥' + item.price"></span>
                  <span class="original-price" v-text="'￥' + item.originalPrice"></span>
                </div>
                <span class="name" v-text="item.name"></span>
              </div>
            </li>
          </ul>
          <ul class="featured-items-list">
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <JuanTabBar></JuanTabBar>
    </div>
  </div>
</template>

<script>
import { JuanTabBar } from "../components";
import IScroll from "iscroll";
import Rotation from '../components/Rotation/Rotation'
import shoes from '../assets/images/shoes.jpg'
import clothes from '../assets/images/T-shirt.jpg'
  export default {
    name: 'Home',
    components: {
      JuanTabBar,
      // Rotation
    },
    data() {
      return {
        tab: 1,
        featuredShow:[
          { id: 1, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 2, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 3, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 4, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 5, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 6, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 7, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 8, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
          { id: 9, name: '镂空牛剖层小白鞋', avatar: shoes, price: 78, originalPrice: 699, },
        ],
        featuredItems: [
          { id: 1, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 3, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 4, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 5, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 7, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 8, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 9, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 11, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 12, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
          { id: 13, name: '爱帝夏季薄款男士背心短裤家居服套装简约百搭睡衣男', avatar: clothes, price: 128, originalPrice: 399  },
        ]
      };
    },
    methods: {
      backToTop() {
        console.log(123)

      }
    },

  }
</script>

<style lang="stylus" scoped>
  .contains
    width: 100vw
    height: 100vh
    display: flex
    flex-direction: column
    .back-top
      position: fixed
      right: 4vw
      bottom: 16vw
      width: 12vw
      height: 12vw
      border-radius: 50%
      flex-direction: column
      img
        height: 100%
    .header
      flex-shrink: 0
      .header-top
        img
          width: 100%
          height: 100%
      .header-search
        height: 14.7vw
        display: flex
        justify-content: flex-end
        align-items: center
        position: relative
        input
          height:70%
          width: 85%
          text-indent 16vw
          border: none
          outline: none
          background-color: #f2f2f2
        i.icon-fangdajing
          font-size: 4.8vw
          position: absolute
          top: 50%
          left: 4.5vw
          transform: translateY(-50%)
          color: #b0b0b0
        img
          height: 4.8vw
          position: absolute
          top: 50%
          left: 10.6vw
          transform:translateY(-50%)
        i.icon-fenlei
          font-size: 8vw
          padding: 0 2.6vw
          font-weight: bold

    .content
      background-color: rgb(244,244,248)
      width: 100vw
      flex-grow: 1
      overflow: auto
      .banner-wrapper
        overflow: hidden
        width: 100%
        touch-action: pan-x
        ul.banner
            display: flex
            li
              width: 100vw
              img
                height: 46.6vw
      ul.product-categories
        display: flex
        justify-content: space-evenly
        align-items: center
        background-color: #ffffff
        width: 100%
        li
          display: flex
          height: 100px
          i.last
            background-size: 100% 100%
            height: 100%
            width: 100px
            background-image: url("../assets/images/last.png")
          i.limited
            display: inline-block
            background-size: 100% 100%
            height: 100%
            width: 26.7vw
            background-image: url("../assets/images/limited.png")
          i.brand
            display: inline-block
            background-size: 100% 100%
            height: 100%
            width: 26.7vw
            background-image: url("../assets/images/brand.png")
            padding-top: 1px
            box-sizing: border-box
          i.life
            display: inline-block
            background-size: 100% 100%
            height: 100%
            width: 26.7vw
            background-image: url("../assets/images/life.png")
      .festival
        height: 29.3vw
        width: 100%
        img
          width: 100%
      .grouping-wrapper
        height: 73.3vw
        display: flex
        img.clearance
          height: 100%
          width: 50%
        .limit-shop
          display: flex
          flex-direction: column
          height: 73.3vw
          width: 50%
          img
            height: 50%
            width: 73.3vw
      .middle-title
        margin: 2.6vw 0
        img.title
          width: 100%
      .product-content-wrapper
        background-color: #ffffff
        ul.tab-wrapper
          height: 13.3vw
          display: flex
          align-items: center
          padding: 0 4vw
          li
            padding: 10px
            color: #333333
            font-size: 4.8vw
            margin-right: 4vw
            &.checked
              border-bottom: 1px solid #ff464e
              color: #ff464e
        .featured-show,.featured-items
          width: 100vw
          ul.featured-show-list
            width: 100%
            li
              width: 50%
              display: inline-block
              img
                width: 100%
              .item-detail
                display: flex
                flex-direction: column
                padding: 2.6vw 2.6vw
                .price-wrapper
                  padding: 2px 0
                  span.price
                    color: #ff464e
                  span.original-price
                    font-size: 3.2vw
                    color: #bbb
                    text-decoration: line-through

                span.name
                    font-size: 3.7vw
                    color: #3b3b3b
                    padding: 1.3vw 0
        .featured-items
          span.name
            white-space nowrap
            text-overflow: ellipsis
            overflow: hidden
    .footer
      flex-shrink 0
</style>
