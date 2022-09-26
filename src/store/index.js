import Vuex from 'vuex'
import Vue from 'vue'
import address from "@/store/address";
// import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
// const VueSession = new VuexPersistence({
//     session: window.sessionStorage
// })
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: { address },
    // plugins: [VueSession.plugin]
})

export default store;
