  <template>
  <div class="contains">
    <div class="header">
      <router-link to="/category">
        <i class=" return iconfont icon-fanhui"></i>
      </router-link>
      <input type="text" placeholder="搜索商品" v-model.lazy.trim="search.name">
      <span v-text=""></span>
      <i class="iconfont icon-zhankaii spread" @click="isShow = !isShow"></i>
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
    <div class="order">
      <span class="price"
            :class="{active: search.orderCol === 'price'}"
            @click="changeOrder('price')"
      >
        价格
        <i :class="`iconfont icon-${search.orderDir}`"></i>
      </span>
      <span class="sale"
            :class="{active: search.orderCol === 'sale'}"
            @click="changeOrder('sale')"
      >
        销量
        <i :class="`iconfont icon-${search.orderDir}`"></i>
      </span>
      <span class="rate"
            :class="{active: search.orderCol === 'rate'}"
            @click="changeOrder('rate')"
      >
        好评
        <i :class="`iconfont icon-${search.orderDir}`"></i>
      </span>
    </div>
    <div class="category-wrapper">
      <span class="total checked">全部</span>
      <span class="dress">连衣裙</span>
    </div>
    <div class="content hide-scroll" ref="scroll">
        <div>
            <ul class="list">
                <li v-for="item in list">
                  <router-link :to="`/detail/${item.id}`">
                    <img :src="item.avatar" alt="">
                    <div class="item-detail">
                      <div class="price-wrapper">
                        <span class="price" v-text="'￥' + item.price"></span>
                        <span class="original-price">￥499</span>
                      </div>
                      <div class="name-wrapper">
                        <span class="name" v-text="item.name"></span>
                      </div>
                    </div>
                  </router-link>
                </li>
            </ul>
          <p>————<span v-text="tip"></span>————</p>
        </div>
    </div>
    <div class="back-top">
      <i class="iconfont icon-huidaodingbu" @click="backTop"></i>
    </div>
  </div>
</template>

<script>
import {ProductApi} from "@/api";
import IScroll from "iscroll";
import imagesloaded from 'imagesloaded'

export default {
    name: 'List',
    data() {
      return {
          search: {
            name: '',
            cid: parseInt(this.$route.params.cid),
            orderCol: 'price', // price | rate | sale
            orderDir: 'asc', // asc | desc
            pageSize: 6
          },
          list: [],
          hasMore: true,
          isLoading: false,
          title: '',
          isShow: false
      };
    },
    // 开启深度监听
    watch: {
      search: {
        handler() { this.getList() },
        deep: true,
        immediate: true,
      },
      list() {
        this.$nextTick(() => {
          imagesloaded(this.$refs.scroll, () => {
            if(this.scroll) this.scroll.refresh();
            else {
              this.scroll = new IScroll(this.$refs.scroll, {
                click: true,
                bounce: false,
                momentum: true
              });
              this.scroll.on('  ', () => {
                if(this.isLoading) return;
                if(!this.hasMore) return;
                if(this.scroll.maxScrollY !== this.scroll.y) return;
                this.getList(true);
              });
            }
          })
        })
      }
    },

  beforeDestroy() {
    if(this.scroll) {
      this.scroll.destroy();
      this.scroll = null;
    }
  },
  activated() {
      console.log(1211)
    this.search.cid = parseInt(this.$route.params.cid);
  },
  computed: {
    tip() {
      if(this.isLoading) return '加载中';
      else if(this.hasMore) return '上拉加载更多';
      else if(this.list.length === 0) return '暂无更多商品';
      else return '已到底部';
    }
  },
  methods: {
      async getList(isLoadMore = false) {
          try {
              if(!isLoadMore) this.list = [];
              this.isLoading = true;
              let list = await ProductApi.get({...this.search, begin: isLoadMore? this.list.length : 0});
            // console.log(this.list);
              this.hasMore = this.search.pageSize === list.length;
              if(isLoadMore) this.list = [...this.list, ...list];
              else this.list = list
            this.isLoading = false;
          }catch(e) {}
      },
      changeOrder(col) {
        if(this.isLoading) {
          return this.$juanNotice('您的操作太频繁了！');
        }
          if( col !== this.search.orderCol) {
            this.search.orderCol = col;
          } else {
            this.search.orderDir = this.search.orderDir === "asc"? 'desc' : 'asc';
          }
      },
    backTop() {
        if(this.scroll) this.scroll.scrollTo(0, 0, 500);
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
    .header
      height: 10.6vw
      flex-shrink: 0
      text-align: center
      line-height: 10.6vw
      position: relative
      color: #333
      display: flex
      justify-content: center
      align-items: center
      i
        font-size: 6.7vw
      i.return
        position: absolute
        top: 0
        left: 5.3vw
      input
        height: 8vw
        width: 66.7vw
        border-radius: 8vw
        border: 1px solid #b0b0b0
        outline: none
        text-indent: 2.6vw
      span
          font-size: 4.8vw
      i.spread
        position: absolute
        top: 0
        right: 5.3vw
      ul.spread-content
        height: 32vw
        width: 30.6vw
        background-color: rgba(0, 0, 0, 0.7)
        position: absolute
        top: 100%
        right: 0
        z-index: 100
        display: flex
        flex-direction: column
        justify-content: center
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
    .order
      height: 10.6vw
      flex-shrink: 0
      align-items: center
      display: flex
      justify-content: space-evenly
      color: #666666
      span
        //font-size: 14px
        position: relative
        i
          font-size: 2.6vw
          position: absolute
          left: 100%
          top: 50%
          transform: translateY(-50%)
        &.active
          color: #ff464e
    .category-wrapper
      height: 10.6vw
      background-color: rgb(244, 244, 248)
      flex-shrink: 0
      display: flex
      align-items: center
      padding: 0 5.3vw
      span.total, span.dress
        border: 1px solid #b0b0b0
        padding: 2px 2.6vw
        color: #333
      span.total
        margin-right: 4vw
        &.checked
          border: 1px solid #ff464e
          color: #ff464e
    .content
      flex-grow: 1
      background-color: rgb(244, 244, 248)
      overflow: hidden
      touch-action: none
      ul.list
        //padding: 0 2px
        //box-sizing: border-box
        li
          width: 50%
          display: inline-block
          a
            display: flex
            flex-direction: column
            img
              height: 50%
              flex-shrink: 0
            .item-detail
              flex-grow: 1
              height: 30%
              display: flex
              flex-direction: column
              padding-left: 2.6vw
              .price-wrapper
                font-size: 3.2vw
                color: #bbbbbb
                padding: 1.3vw 0
                span.price
                  color: #ff464e
                  font-size: 4.2vw
                  margin-right: 1.3vw
                span.original-price
                  text-decoration: line-through
              .name-wrapper
                font-size: 3.7vw
                color: #111
                padding-bottom: 1.3vw
      p
        height: 8vw
        display: flex
        justify-content: center
        align-items: center
        color: #b0b0b0
        span
          color: #b0b0b0
          font-size: 3.7vw
    .back-top
      position: fixed
      bottom: 5.3vw
      right: 5.3vw
      height: 10.6vw
      width: 10.6vw
      border-radius: 50%
      background-color: #ffffff
      text-align: center
      line-height: 10.6vw
      i
        font-size: 6.7vw
        color: #b0b0b0
</style>
