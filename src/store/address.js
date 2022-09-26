import { AddressApi } from "@/api";

export default {
    state: {
        list:[],
        _isInit: false
    },
    mutations: {
        _init(state, payload) {
        state.list = payload;
        state._isInit = true;
        },
        _setDefault(state,payload) {
            state.list.find(item => item.isDefault === 1).isDefault = 0;
            state.list.find(item => item.id === payload).isDefault = 1;
        },
        remove(state, payload) {
            let i = state.list.findIndex(item => item.id === payload);
            state.list.splice(i, 1);
        },
        add(state, payload) {
            state.list.push(payload);
        },
        update(state, payload) {
            let i = state.list.findIndex( item => item.id === payload.id );
            state.list.splice(i, 1, payload);
        },
    },
    actions: {
        async init(context) {
            if(context.state._isInit) return;
            const list = await AddressApi.get();
            context.commit('_init', list);
        },
        async setDefault(context, payload) {
            await AddressApi.setDefault(payload);
            context.commit('_setDefault', payload);
        },
        async remove(context, payload) {
            await AddressApi.remove(payload);
            context.commit('remove', payload);
        },
        async add(context, payload) {
            await AddressApi.add(payload);
            context.commit('add', payload);
        },
        async update(context, payload) {
            await AddressApi.update(payload);
            context.commit('update', payload);
        },
    },
    getters: {
        defaultAddress(state) {
            // console.log(state)
            return state.list.find(item => item.isDefault ===1);
        }
    },
    modules: {}
}
