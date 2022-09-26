<template>
  <div class="contains">
    <div class="header">
      <div class="search-wrapper">
        <img src="../assets/images/search.png" alt="">
        <input type="text" placeholder="搜索商品">
      </div>
    </div>
    <div class="content">
        <div class="left hide-scroll">
            <ul class="main-list">
              <li v-for="item in mainList"
                  :key="item.id"
                  @click="activeId = item.id"
                  >
                <span v-text="item.name"
                      :class="{active: activeId === item.id}"
                ></span>
              </li>
            </ul>
        </div>

        <div class="right hide-scroll">
          <img :src="avatar" alt="">
          <ul class="sub-list" v-if="subList.length > 0">
              <li v-for="item in subList">
                <router-link :to="`/list/${item.id}`">
                  <img :src="item.avatar" alt="">
                  <span v-text="item.name"></span>
                </router-link>
              </li>
          </ul>
          <p v-else>敬请期待！</p>
        </div>
    </div>
    <div class="footer">
      <JuanTabBar></JuanTabBar>
    </div>
  </div>
</template>

<script>
import JuanTabBar from "@/components/JuanTabBar/JuanTabBar";
import {CategoryApi} from "@/api";
  export default {
    name: 'Category',
    components: {
      JuanTabBar,
    },
    data() {
      return {
        mainList: [],
        activeId: 0,
        subList: [],
      }
    },
    created() {
        CategoryApi.get(0)
          .then( data => {
              this.mainList = data;
              this.activeId =data[0].id
          } );
    },
    beforeDestroy() {

    },
    // methods: {
    //   goToList() {
    //     this.$evenBus.$emit('subList', {
    //       subList: this.subList
    //     })
    //   }
    // },
    computed: {
        avatar: {
            get() {
              return this.activeId !== 0 ? this.mainList.find(item => item.id === this.activeId).avatar : "";
            }
        }
    },
    watch:{
      activeId(newValue) {
        CategoryApi.get(newValue)
          .then(data => {
            this.subList = data;
            // console.log(this.subList[0]);
          })
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
    background-color: rgb(241, 243, 245)
    .header
      height: 14vw
      flex-shrink: 0
      display: flex
      justify-content: center
      align-items: center
      .search-wrapper
        height: 9.7vw
        border-radius: 9.7vw
        display: flex
        width: 90vw
        border: 1px solid #fff
        align-items: center
        background-color: #ffffff
        justify-content: center
        img
          width: 16px
          height: 16px
          margin-right: 5px
        input
          height: 100%
          width: 61.5vw
          border: none
          outline: none
          border-radius: 9.7vw

    .content
      flex-grow: 1
      overflow: hidden
      display: flex
      .left
        width: 26.7vw
        flex-shrink: 0
        overflow: auto
        ul.main-list
          display: flex
          flex-direction: column
          box-sizing: border-box
          li
            height: 11.5vw
            display: flex
            align-items: center
            justify-content: center
            span
              font-size: 3.7vw
              color: #000
              width: 100%
              text-align: center
              box-sizing: border-box
            span.active
              color: #cf0a2c
              border-left: 2px solid #cf0a2c
      .right
        flex-grow: 1
        overflow: auto
        padding: 0 4vw
        img
          width: 100%
          border-radius: 5.3vw
          margin: 5.3vw 0
        ul.sub-list
          background-color: #fff
          border-radius: 20px
          padding: 0 2.6vw 5.3vw 2.6vw
          li
            width: 33.333333%
            display: inline-block
            a
              display: flex
              flex-direction: column
              justify-content: center
              align-items: center
              padding: 0 2.6vw
              img
                100%
              span
                font-size: 3.2vw
                text-align: center
                color: #000
        p
          padding: 2.6vw 0
          text-align: center
          background-color: #ffffff
          border-radius: 5.3vw
          color: #ff464e
    .footer
      flex-shrink: 0
</style>
