"use strict";(self["webpackChunkjuanpi"]=self["webpackChunkjuanpi"]||[]).push([[844],{8844:function(s,t,i){i.r(t),i.d(t,{default:function(){return v}});var a=function(){var s=this,t=s._self._c;return t("div",{staticClass:"contains"},[t("div",{staticClass:"content hide-scroll"},[t("div",{ref:"scroll",staticClass:"scroll"},[t("ul",{ref:"scrollContent",staticClass:"scroll-content"},[t("li",[t("img",{attrs:{src:s.bannerImgs[s.bannerImgs.length-1],alt:""}})]),s._l(s.bannerImgs,(function(s){return t("li",[t("img",{attrs:{src:s,alt:""}})])})),t("li",[t("img",{attrs:{src:s.bannerImgs[0],alt:""}})])],2),t("div",{staticClass:"indicator"},[t("span",{domProps:{textContent:s._s(s.currentPage)}}),s._v("/"),t("span",{domProps:{textContent:s._s(this.bannerImgs.length)}})]),t("div",{staticClass:"spread-wrapper"},[t("i",{staticClass:"iconfont icon-zhankaii",on:{click:function(t){s.isShow=!s.isShow}}})]),t("ul",{directives:[{name:"show",rawName:"v-show",value:s.isShow,expression:"isShow"}],staticClass:"spread-content"},[t("li",[t("router-link",{attrs:{to:"/home"}},[t("i",{staticClass:"iconfont icon-home"}),t("span",[s._v("首页")])])],1),t("li",[t("router-link",{attrs:{to:"/cart"}},[t("i",{staticClass:"iconfont icon-cart"}),t("span",[s._v("购物车")])])],1),t("li",[t("router-link",{attrs:{to:"/totalorder"}},[t("i",{staticClass:"iconfont icon-wodedingdan"}),t("span",[s._v("我的订单")])])],1)])]),t("div",{staticClass:"goods-information"},[t("div",{staticClass:"price-sale"},[t("div",{staticClass:"price-wrapper"},[s._v(" ￥"),t("span",{staticClass:"price",domProps:{textContent:s._s(s.model.price)}}),t("span",{staticClass:"original-price"},[s._v("￥299")]),t("span",{staticClass:"baoyou"},[s._v("包邮")])]),t("div",{staticClass:"sale-wrapper"},[t("span",{staticClass:"sale",domProps:{textContent:s._s(s.model.sale)}}),s._v("人已购 ")])]),t("div",{staticClass:"brief-wrapper"},[t("span",{staticClass:"brief",domProps:{textContent:s._s(s.model.brief)}}),t("i",{staticClass:"iconfont icon-jiarushoucang"})])]),t("div",{staticClass:"service-desc",on:{click:function(t){s.serviceShow=!0}}},[s._m(0),t("i",{staticClass:"iconfont icon-zhankai"})]),t("div",{staticClass:"choose-size",on:{click:function(t){s.sizeShow=!0}}},[t("div",{staticClass:"choosed"},[s._v(" 已选择："),t("span",[s._v("蓝色（好品质）"+s._s(s.chosenProduct))])]),t("i",{staticClass:"iconfont icon-zhankai"})]),t("div",{directives:[{name:"show",rawName:"v-show",value:s.sizeShow,expression:"sizeShow"}],staticClass:"size-dialog"},[t("transition",[t("div",{directives:[{name:"show",rawName:"v-show",value:s.sizeShow,expression:"sizeShow"}],staticClass:"size-dialog-content"},[t("div",{staticClass:"size-dialog-header"},[t("img",{staticClass:"avatar",attrs:{src:s.model.avatar,alt:""}}),t("div",{staticClass:"dialog-detail"},[t("span",{staticClass:"dialog-price",domProps:{textContent:s._s("￥"+s.model.price)}}),t("div",{staticClass:"dialog-chosen"},[s._v(" 已选择 "),t("span",{staticClass:"color"},[s._v("蓝色（好品质）")]),t("span",{staticClass:"size"},[s._v(s._s(s.chosenSize))])])]),t("i",{staticClass:"iconfont icon-guanbi",on:{click:function(t){s.sizeShow=!1}}})]),t("div",{staticClass:"size-dialog-color"},[t("span",{staticClass:"color-title"},[s._v("颜色")]),t("button",{staticClass:"chosen-color"},[s._v("蓝色（好品质）")])]),t("div",{staticClass:"size-dialog-size"},[t("span",{staticClass:"size-title"},[s._v("尺码")]),t("div",{staticClass:"total-size"},[t("button",{class:{checked:s.chosenSize===s.sizes[0]},on:{click:function(t){s.chosenSize=s.sizes[0]}}},[s._v(s._s(s.sizes[0]))]),t("button",{class:{checked:s.chosenSize===s.sizes[1]},on:{click:function(t){s.chosenSize=s.sizes[1]}}},[s._v(s._s(s.sizes[1]))]),t("button",{class:{checked:s.chosenSize===s.sizes[2]},on:{click:function(t){s.chosenSize=s.sizes[2]}}},[s._v(s._s(s.sizes[2]))]),t("button",{class:{checked:s.chosenSize===s.sizes[3]},on:{click:function(t){s.chosenSize=s.sizes[3]}}},[s._v(s._s(s.sizes[3]))]),t("button",{class:{checked:s.chosenSize===s.sizes[4]},on:{click:function(t){s.chosenSize=s.sizes[4]}}},[s._v(s._s(s.sizes[4]))])])]),t("div",{staticClass:"purchase-quantity"},[t("span",{staticClass:"quantity-title"},[s._v("购买数量")]),t("div",{staticClass:"change-count"},[t("button",{staticClass:"decrease",class:{disabled:1===s.detailList.count},attrs:{disabled:1===s.detailList.count},on:{click:s.decrease}},[s._v("-")]),t("span",{staticClass:"count",domProps:{textContent:s._s(s.detailList.count)}}),t("button",{staticClass:"increase",class:{disabled:5===s.detailList.count},attrs:{disabled:5===s.detailList.count},on:{click:s.increase}},[s._v("+")])])]),t("div",{staticClass:"goods-determined"},[t("button",{staticClass:"determined",on:{click:s.determined}},[s._v("确定")])])])])],1),t("div",{staticClass:"product-graphic-details"},[t("div",{staticClass:"product-tab-wrapper"},[t("ul",{staticClass:"product-tab"},[t("li",{class:{checked:1===s.tab},on:{click:function(t){s.tab=1}}},[s._v("图文详情")]),t("li",{class:{checked:2===s.tab},on:{click:function(t){s.tab=2}}},[s._v("商品参数")]),t("li",{class:{checked:3===s.tab},on:{click:function(t){s.tab=3}}},[s._v("咨询与售后")])]),t("div",{staticClass:"graphic-details"},[t("div",{directives:[{name:"show",rawName:"v-show",value:1===s.tab,expression:"tab === 1"}],staticClass:"graphic-details-content"},[s._v(" 商家提醒："),t("span",[s._v("此商品由品牌商发货。")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:2===s.tab,expression:"tab === 2"}],staticClass:"product-parameters"},[s._m(1),s._m(2)]),t("div",{directives:[{name:"show",rawName:"v-show",value:3===s.tab,expression:"tab === 3"}],staticClass:"after-sales"},[t("span",[s._v("略")])])])]),t("div",{directives:[{name:"show",rawName:"v-show",value:1===s.tab,expression:"tab === 1"}],staticClass:"item-others-images"},[t("ul",{staticClass:"others-images"},s._l(s.otherImgs,(function(s){return t("li",{key:s.id},[t("img",{attrs:{src:s,alt:""}})])})),0)])])]),t("div",{staticClass:"footer"},[t("router-link",{staticClass:"home-wrapper",attrs:{to:"/home"}},[t("img",{staticClass:"home",attrs:{src:i(2402),alt:""}}),t("span",{staticClass:"home"},[s._v("首页")])]),t("router-link",{staticClass:"cart-wrapper",attrs:{to:"/cart"}},[t("img",{staticClass:"cart",attrs:{src:i(2082),alt:""}}),t("span",{staticClass:"cart"},[s._v("购物车")]),0!==s.cartList.length?t("div",{staticClass:"cart-list-wrapper"},[t("div",{staticClass:"cart-count-wrapper",domProps:{textContent:s._s(s.sumCount)}})]):s._e()]),t("button",{staticClass:"buy"},[s._v("立即购买")]),t("button",{staticClass:"add-cart",on:{click:s.addToShoppingCart}},[s._v("加入购物车")])],1)])},e=[function(){var s=this,t=s._self._c;return t("ul",{staticClass:"service-content"},[t("li",[s._v("·"),t("span",[s._v("24小时发货")])]),t("li",[s._v("·"),t("span",[s._v("7天包退")])]),t("li",[s._v("·"),t("span",[s._v("售后补贴")])])])},function(){var s=this,t=s._self._c;return t("div",{staticClass:"common-express"},[t("span",[s._v("常用快递")]),t("span",[s._v("运费")])])},function(){var s=this,t=s._self._c;return t("div",{staticClass:"courier-name"},[t("span",[s._v("申通快递")]),t("span",{staticStyle:{color:"#ff7700"}},[s._v("全国包邮(偏远地区除外)")])])}],c=i(7495),n=i.n(c),o=i(5710),l={name:"Detail",data(){return{isLogin:!!sessionStorage.getItem("token"),currentPage:0,model:null,isShow:!1,serviceShow:!1,sizeShow:!1,cartList:[],sizes:["M","L","S","XL","2XL"],detailList:{pid:0,count:1},tab:1}},methods:{addToShoppingCart(){this.sizeShow=!0},async determined(){this.isLogin?(await o.Wk.addToShoppingCart(this.detailList),await this.$router.go(0),this.$juanNotice("加入购物车成功！"),this.sizeShow=!1):this.$router.push("/login"),this.sizeShow=!1},decrease(){this.detailList.count--},increase(){this.detailList.count++}},watch:{deep:!0,immediate:!0,handler:function(){this.sumCount()}},computed:{bannerImgs(){return this.model?this.model.bannerImgs.split(","):[]},otherImgs(){return this.model?this.model.otherImgs.split(","):[]},sumCount(){let s=0;return this.cartList.forEach((t=>{s+=t.count})),s}},async created(){try{let s=parseInt(this.$route.params.id);this.model=await o.yF.getModel(s),this.detailList.pid=this.model.id,this.isLogin&&(this.cartList=await o.Wk.get()),this.$nextTick((()=>{this.$refs.scrollContent.style.width=`${this.bannerImgs.length+2}00vw`,this.scroll=new(n())(this.$refs.scroll,{momentum:!1,scrollY:!1,scrollX:!0,snap:!0,click:!0,bounce:!1,deceleration:.003}),this.scroll.on("scrollEnd",(()=>this.scroll.currentPage.pageX===this.bannerImgs.length+1?(this.scroll.goToPage(1,0,0),void(this.currentPage=1)):0===this.scroll.currentPage.pageX?(this.scroll.goToPage(this.bannerImgs.length,0,0),void(this.currentPage=this.bannerImgs.length)):void(this.currentPage=this.scroll.currentPage.pageX))),this.scroll.goToPage(1,0,0),this.currentPage=1}))}catch(s){}}},r=l,d=i(1001),h=(0,d.Z)(r,a,e,!1,null,"17d1fbf6",null),v=h.exports},2082:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAb1BMVEUAAABsbGxtbW1ycnJsbGxsbGxra2t1dXVra2tsbGxtbW1tbW18fHxsbGxsbGxsbGxsbGxsbGxsbGxtbW2lpaVra2tsbGxubm5sbGxra2tra2tsbGxra2tsbGxsbGxra2ttbW1xcXFsbGxtbW1ra2ui0NoQAAAAJHRSTlMAyTYS7fnyC6RbUiUG27aOgmdNOQPV0C3k4qp4vpVxYUYbGkQRZAzvAAAA+0lEQVRIx+3SyW6DQBCE4QKHzYDZvICJ4yz/+z9jJB+ZboSl5JR8x5JGM1Pd+rOqNs/z25c263gotFXPw0mbxUVRJDDErlKBE6vqixaurKuPiwMtjJErheUVezjINcLyGxeY5PmAdPmkKoFMjj28WjXFcjTQyqjpLkcEfRC20MhWJbCTttc0QB2mJYyyvUEepke/pit0Cp1hkGmCi0I5dCtjC83Q+GMz9JBGlglaGUp8sWTW5Ehmmc7QxZZgykFNG81w0zN6OFV6QpZC8mI4ZO6SOXo57jWWeidXtjPoBzVpVPpJ6B04+EmoACI/CWVnkr2R+Krh00j+/bZvRLIs0YfFc3EAAAAASUVORK5CYII="},2402:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA/pJREFUaAXtl19I01EUx91sDllQoEEIkQ+BCdWT1Eul4EM9FEQP66EgonR/ZLGR5EP+GWWERqxSN6cSBPlQL1IE0UOwIIIEgyKkl8iCVNJesi3UtvW5sp9c9bd/+ttU+F043rNzzj3ne849996fBQX6WN8KFOYqfDweN0xOTtqrqqrKR0ZGRnMVx5ALx/X19Xvx2w8dTvh/ZjQanb29vT+0jqdpAgA3GQyGJkA2swNmGSzy3/xuIokgfFzWrYXXLAHAHwLYAMD3pQH0Bn1dX1/f5zR2GanXnEBjY6NlZmbmJtFcgDcqUUlmDN7BXBKLxXzwOyTdLHw79h0kMq/IVzOvKQGbzXYcEL0E3i0FjwL6HvIWwEWEvKGhoWR+fv4O7HnJrgC7T9hdwu6dLM+GX1UCtEspwe8S/OyyYO/5LdpDzCsGCdcmEt6jKPETg+8qLCxs9vv9fxR5pnPWCQDiHCBES5RKQSIAaautrfVZrdaoJF/Bejye4nA43Ip9I362SAbfSMIRCAReSLK0bMYJ2O32clE96JjsFSAvTSaTo7u7+6ssT8c7HI4DnI1+/B2UbfE3iMzNLk7L8mR82gS8Xq9xfHz8Mg7aIYvkaIq73cO1OCjJsmKF74mJCReLxIHeKi2eJhFPMBh8JMlU2ZQJ0Ov7cSSuxiVVwtNDqn6lp6fnl6rXLIVOp3NXNBr1E+eEvFTsLmSnSGOyXOZVE3C5XObZ2dkWDK9CJmnBFxzaqMwrSaYZS5taSULcYDslp2H45rKysvvsmDjwS8aKBOjNI4nerFAsAR3DaafFYrnu8/n+KvJczG63e3skErmN74vQIj4wDNOydRzyj3LcRQPaZRuKDqheXiiMWRhgG52Cz9fgtntA0S4siycevU6z2Xyjq6tLPIYFCy8n4E/Bj0I2SElqDl4ZPxUmXzMV/y7FUq5m0c7X5ubmPpDgUaE3wogXcggqEwIxWPycqWfhxwb4A54gMN4qUNiZCihE4d1GlI+hf0LJPEm7nOGQnmQWX48bYoBrCkzi09wJv4CLeaaoqOipkd4eRtEKDRQXF1fy+8mGQL0MBIDjPG4Bru9K+CHIKR7Phaec7G4ts9+wPwE9DrjTCsDFz19FsNlmPYH13jF9B9Z7B+R/KFaNhY+wGhYLymaEuLJD2SxQs9UkARzX8AHYphYgmYyHUqhCyfSZyjf9GdBqB+SCvaa6qpVll2owrJaN18prnoAAT2971YBxVrwkoWkCm76F9ATUWiWfMn0H8llttVj6DqhVJZ+yjN4B8QCJOzwZsMQDlUytKtfKZ0YJgKBa6wdIK5+b/gyk2oFQ4otRtQVSCEOpdDnwmSKcrtIroFdAr0CuK/AfadNnUmWfUIAAAAAASUVORK5CYII="}}]);
//# sourceMappingURL=844.ce877f55.js.map