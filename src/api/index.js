import http from '../util/http'

export var UserApi = {
    login: data => http({ url: '/user/login_pwd', method: 'post', data}, false),
    checkName: name => http({ url: '/user/check_name/' + name, }),
    checkPhone: phone => http({ url: '/user/check_phone/' + phone, }),
    register: data => http({ url: '/user/register', method: 'post', data })
};
export let CategoryApi = {
    get: fid =>  http({ url: '/category/list/' + fid, method: 'get',})
};
export let AddressApi = {
    get: () => http({ url: '/address/list/', method: 'get', }),
    setDefault: id => http({ url: '/address/set_default/' + id, method: 'get', }),
    remove: id => http({ url: '/address/remove/' + id, method: 'get', }),
    add: data => http({ url: '/address/add/', method: 'post', data }),
    update: data => http({ url: '/address/update/', method: 'post', data }),
}
export let CartApi = {
    get: () => http({ url: '/cart/list/', method: 'post' }),
    decrease: id => http({ url: '/cart/decrease/' + id, method: 'post' }),
    increase: id => http({ url: '/cart/increase/' + id, method: 'post' }),
    remove: ids => http({ url: '/cart/remove/', method: 'post', data: {ids} }),
    getBuyIds: ids => http({ url: '/cart/list_ids', method: 'post', data: {ids} }),
    addToShoppingCart: data => http({ url: '/cart/add', method: 'post', data })

}
export let OrderApi = {
    orderConfirm: data => http({ url: '/order/confirm', method: 'post', data }), // 订单确认
    getAllOrder: () => http({ url: '/order/list_all', method: 'get' }),// 全部订单
    payOrder: id => http({ url: '/order/pay/' + id, method: 'get', }), // 给某个订单付钱
    getPayOrder: () => http({ url: '/order/list_pay', method: 'get' }), // 支付的订单
    getUnpayOrder: () => http({ url: '/order/list_unpay', method: 'get', }), // 待支付
    removeOrder: id => http({ url: '/order/remove/' + id, method: 'get'})
}
export let ProductApi = {
    get: data => http({ url: '/product/list', method: 'post', data }, false),
    getModel: id => http({ url: '/product/model/' + id, method: 'get' })
}
