<template>
  <div class="contains">
    <div class="header" style="background-color: #ffffff">
      <span class="header-title">购物车</span>
      <input type="button" :value="isEdit ? '完成' : '编辑'" @click="isEdit = !isEdit">
    </div>
    <div class="content hide-scroll">
        <ul class="list">
          <li v-for="(item, i) in list" :key="i">
              <i class="checkbox"
                 :class="{ checked: status[i][isEdit? 'checked2' : 'checked1'] }"
                 @click="status[i][isEdit? 'checked2' : 'checked1'] = !status[i][isEdit? 'checked2' : 'checked1']"
              ></i>
              <div class="item-avatar">
                <img :src="item.avatar" alt="">
              </div>
              <div class="item-detail">
                <div class="name-wrapper">
                  <span class="name" v-text="item.name"></span>
                </div>
                <div class="price-wrapper">
                  <span class="price" v-text="'￥' + item.price + '.00'"></span>
                </div>
                <JuanCount :count="item.count"
                           @decrease="decrease(item.id)"
                           @increase="increase(item.id)"
                ></JuanCount>
              </div>
          </li>
        </ul>
    </div>
    <div class="bottom" v-show="!isEdit">
      <div class="checkbox-wrapper">
        <i class="checkbox"
           :class="{ checked: isAllChecked }"
           @click="isAllChecked = !isAllChecked"
           style="margin-right: 5px"
        ></i>全选
      </div>
      <div class="total-wrapper">
        总金额：￥
        <span class="total" v-text="total"></span>.00
      </div>
      <button class="remove"
              style="margin-left: 10px"
              @click="goOrderConfirm"
              :disabled="buyId.length === 0"
      >去结算({{buyCount}})</button>
    </div>
    <div class="bottom" v-show="isEdit">
      <div class="checkbox-wrapper">
        <i class="checkbox"
           :class="{ checked: isAllChecked }"
           @click="isAllChecked = !isAllChecked"
        ></i>
      </div>
      <button class="transfer">移入收藏夹</button>
      <button class="remove" @click="removeHandler" :disabled="buyId.length === 0">删除</button>
    </div>
    <div class="footer">
      <JuanTabBar></JuanTabBar>
    </div>
  </div>
</template>

<script>
import {JuanTabBar, JuanCount} from "../components";
import {CartApi,OrderApi} from "@/api";
  export default {
    name: 'Cart',
    components: {
      JuanTabBar,
      JuanCount
    },
    data() {
      return {
        isEdit: false,
        status: [],
        list: [],
        isLogin: !!sessionStorage.getItem('token'),
        addressId: 0,
      }
    },
    async created() {
      if(!this.isLogin) return;
          try {
            this.list = await CartApi.get();
            this.status = this.list.map(() => ({checked1: true, checked2: false}))
          }catch(e){}
    },
    methods: {
        goOrderConfirm() {
          this.$router.replace(`/orderconfirm?ids=${JSON.stringify(this.buyId)}`);
      },
      async removeHandler() {
        try {
          if(this.removeIds.length === 0) return this.$juanNotice('请选择要删除的商品!')
          await this.$juanConfirm('确认删除？')
              .then(() => {
                CartApi.remove(this.removeIds);
                for(let i = 0; i < this.status.length;) {
                  if(this.status[i].checked2) {
                    this.list.splice(i, 1);
                    this.status.splice(i, 1);
                  } else {
                    i++;
                  }
                }
                this.$juanNotice('删除成功！');
              })
              .catch(() => {});

        }catch(e){}
      },
      async decrease(id) {
        await CartApi.decrease(id)
        this.list.find(item => item.id === id).count--;
      },
      async increase(id) {
        try {
          await CartApi.increase(id)
          this.list.find(item => item.id === id).count++;
        }catch(e) {}
      }
    },
    computed: {
      removeIds: {
        get() {
          let ids = [];
          this.status.forEach((item, i) => {
            if(item.checked2) ids.push(this.list[i].id);
          })
          return ids
        }
      },
      buyId() {
        let ids = [];
        this.status.forEach((item, i) => {
          if(item.checked1) ids.push(this.list[i].id);
        })
        return ids
      },
      isAllChecked: {
        get() {
          return this.status.every(item => item[this.isEdit? 'checked2' : 'checked1'])
        },
        set(value) {
          this.status.forEach(item => {
            item[this.isEdit ? 'checked2' : 'checked1'] = value;
          })
        }
      },
      total: {
        get() {
          let total = 0;
          this.status.forEach((item,i) => {
            if(item.checked1) {
              total += this.list[i].price * this.list[i].count;
            }
          })
          return total
        }
      },
      buyCount: {
        get() {
          let buyCount = 0;
          this.status.forEach((item, i) => {
            if(item.checked1)
              buyCount += this.list[i].count;
          })
          return buyCount;
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  i.checkbox
    display: inline-block
    height: 5.3vw
    width: 5.3vw
    background-size: 100% 100%
    background-image: url("../assets/images/icon_checkbox_uncheck.png")
    &.checked
      background-image: url("../assets/images/icon_checkbox_check.png")
  .contains
    width: 100vw
    height: 100vh
    display: flex
    flex-direction: column
    .header
      height: 40px
      flex-shrink: 0
      line-height: 40px
      text-align: center
      position: relative
      padding: 0 10px
      z-index: 1000
      span.header-title
        font-size: 18px
      input
        border: none
        outline: none
        font-size: 15px
        position: absolute
        top: 50%
        right: 15px
        transform: translateY(-50%)
        background-color: #ffffff
    .content
      flex-grow: 1
      border-top: 1px solid #b0b0b0
      background-color: rgb(244, 244, 248)
      overflow: auto
      padding: 0!important
      ul.list
        li
          display: flex
          align-items: center
          padding: 10px 20px
          background-color: #ffffff
          margin: 10px 0
          .item-avatar
            height: 100px
            width: 100px
            margin: 0 20px
            img
              height: 100%
              width: 100%
          .item-detail
            display: flex
            flex-direction: column
            .name-wrapper
              span.name
                font-size: 14px
                color: #333333
            .price-wrapper
              margin: 5px 0
              span.price
                color: #ff464e
    .bottom
      display: flex
      height: 45px
      padding-left: 15px
      align-items: center
      justify-content: flex-end
      position: relative
      flex-shrink: 0
      .checkbox-wrapper
        position: absolute
        top: 50%
        left: 15px
        transform: translateY(-50%)
        display: flex
        align-items: center
      .total-wrapper
        //display: flex
        align-items: flex-end
        color: #666666
        font-size: 14px
        span.total
          color: #ff464e
          font-size: 18px
      button.transfer
        width: 115px
        height: 100%
        background-color: #f6a623
        border: none
        color: #ffffff
        font-size: 18px
      button.remove
        width: 115px
        height: 100%
        background-color: #ff464e
        color: #ffffff
        border: none
        font-size: 14px
    .footer
      flex-shrink: 0
</style>
