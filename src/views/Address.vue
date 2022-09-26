<template>
  <div class="contains">
    <div class="header">
      <router-link to="/profile">
        <i class="iconfont icon-fanhui"></i>
      </router-link>
      <span>收货地址</span>
    </div>
    <div class="content hide-scroll">
      <transition-group tag="ul" class="list">
        <li v-for="item in $store.state.address.list" :key="item.id">
          <div class="address-wrapper">
            <span class="name" v-text="item.receiveName"></span>
            <span class="phone" v-text="item.receivePhone"></span>
            <div class="region-wrapper">
              <span class="region" v-text="item.receiveRegion"></span>
              <span class="detail" v-text="item.receiveDetail"></span>
            </div>
          </div>
          <div class="is-default-wrapper">
            <div class="left" @click="setDefault(item.id)">
              <img src="../assets/images/CheckBox-1.png" :class="{active: item.isDefault === 1}" alt="">
              <span class="is-default">默认地址</span>
            </div>
            <div class="right">
              <i class="iconfont icon-bianji edit" @click="beginUpdate(item)"></i>
              <span class="edit" @click="beginUpdate(item)">编辑</span>
              <i class="iconfont icon-shanchu remove" @click="remove(item.id)"></i>
              <span class="remove" @click="remove(item.id)">删除</span>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
    <AddressEdit v-if="isEdit"
                 :model="model"
                 @endEdit="save" v-model="isEdit"
                 @closeEdit="closeEdit"/>
    <div class="footer">
      <button @click="beginAdd" class="add-new">
        添加新地址
      </button>
    </div>

  </div>
</template>

<script>
import AddressEdit from "@/views/AddressEdit";
  export default {
    name: 'Address',
    components: {
      AddressEdit
    },
    data() {
        return {
          isEdit: false,
          isShow: true,
          model: null,
        }
    },
    created() {
      this.$store.dispatch('init');
    },
    methods: {
      closeEdit(value) {
        this.isEdit = value;
      },
      async setDefault(id) {
        try {
          await this.$store.dispatch('setDefault', id)
        }catch(e) {}
      },
      async remove(id) {
          await this.$juanConfirm('确定要删除此地址吗？')
          await this.$store.dispatch('remove',id)
          this.$juanNotice('删除成功！');
      },
      beginAdd() {
        this.model = {
          id: 0,
          isDefault: 0,
          name: sessionStorage.getItem('token'),
          receiveName: '',
          receivePhone: '',
          receiveRegion: '',
          receiveDetail: ''
        }
        // this.isShow = false;
        this.isEdit = true;
      },
      beginUpdate(item) {
        this.model = Object.assign({}, item);
        // this.isShow = true;
        this.isEdit = true;
        // this.isShow = false
      },
      save(address) {
        address.id = this.model.id;
            this.$store.dispatch(
                `${this.model.id === 0 ? 'add' : 'update'}`,
                { ...this.model, ...address }
            )
        this.model.id === 0 ? this.$juanNotice('添加收货地址成功！') : this.$juanNotice('编辑收货地址成功！');
        this.isEdit = false;
      }
    },

  }
</script>

<style lang="stylus" scoped>
  .contains
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    .header
      height: 9.6vw
      flex-shrink: 0
      line-height: 9.6vw
      text-align: center
      position: relative
      background-color: #fff
      i
        font-style: normal
        color: #b0b0bb0
        position: absolute
        top: 0
        left: 2.6vw
        font-size: 5.3vw
      span
          font-size: 4.8vw
    .content
      flex-grow: 1

      overflow: auto
      background-color: rgb(244, 244, 248)

      ul.list
        margin: 2.6vw 0
        li
          background-color: #fff
          margin-bottom: 2.6vw
          padding: 0 5.3vw
          height: 29vw
          &.v-enter,&.v-leave-to
            opacity: 0
          &.v-enter-active,&.v-leave-active
            transition: all 0.5s
          &.v-enter-to,&.v-leave
            opacity: 1
          .address-wrapper
            height: 17vw
            padding: 4vw 0
            box-sizing: border-box
            span.name,span.phone
              font-size: 4.2vw
              color: #333
            span.name
              margin-right: 4.8vw
            .region-wrapper
              margin-top: 1.3vw
              span
                font-size: 3.7vw
                color: #666
          .is-default-wrapper
            height: 9.6vw
            display: flex
            justify-content: space-between
            align-items: center
            .left
              display: flex
              align-items: center
              img
                height: 3.2vw
                width: 3.2vw
                border: 1px solid #666
                border-radius: 50%
                margin-right: 2.6vw
                &.active
                  background-color: #ff464e
                  border: none
              span.is-default
                font-size: 3.7vw
                color: #666
            .right
              i.edit
                font-size: 3.7vw
                font-weight: bold
              span.edit
                font-size: 3.7vw
                color: #666
                margin-left: 1.3vw
              i.remove
                font-size: 3.7vw
                font-weight: bold
                margin-left: 5.3vw
              span.remove
                font-size: 3.7vw
                color: #666
                margin-left: 1.3vw


    .footer
      height: 45px
      flex-shrink: 0
      button.add-new
          width: 100%
          height: 100%
          background-color: #ff464e
          color: #ffffff
          font-size: 20px
          border: none
</style>
