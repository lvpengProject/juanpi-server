import Vue from 'vue'
import App from './App'
import router from "./router/index";
import store from "@/store";
import './assets/css/reset.css'
import './assets/iconfont/iconfont-1/iconfont.css'
import './assets/iconfont/iconfont-2/iconfont.css'
import './assets/iconfont/iconfont-3/iconfont.css'
import {JuanNotice, JuanConfirm, JuanLoading, JuanLoginAlert, JuanAlert} from './components'

Vue.prototype.$juanNotice = JuanNotice;
Vue.prototype.$juanConfirm = JuanConfirm;
Vue.prototype.$juanLoading= JuanLoading;
Vue.prototype.$juanLoginAlert = JuanLoginAlert
Vue.prototype.$juanAlert = JuanAlert

Vue.prototype.$evenBus = new Vue();

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App),
});
