import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)
let router = new VueRouter({
    routes: [
        { path: '/', redirect: '/exercise' },
        { path: '/home', component: () => import('../views/Home') },
        { path: '/category', component: () => import('../views/Category') },
        { path: '/exercise', component: () => import('../views/Exercise') },
        { path: '/cart', component: () => import('../views/Cart'), meta: { auth: true } },
        { path: '/profile', component: () => import('../views/Profile')},
        { path: '/login', component: () => import('../views/Login') },
        { path: '/register', component: () => import('../views/Register') },
        { path: '/list/:cid', component: () => import('../views/List') },
        { path: '/address', component: () => import('../views/Address'), meta: { auth: true } },
        { path: '/detail/:id', component: () => import('../views/Detail'),},
        { path: '/order', component: () => import('../views/Order'), meta: { auth: true }  },
        { path: '/orderconfirm', component: () => import('../views/OrderConfirm') },
        { path: '/totalorder', component: () => import('../views/TotalOrder'), meta: { auth: true }  },
    ]
})
router.beforeEach(function(to, from, next) {
    if(to.meta.auth && !sessionStorage.getItem('token')) {
        Vue.prototype.$juanLoginAlert()
            .then(() => {
                next(`/login?target=${to.fullPath}`);
            })
            .catch(() => {})
    } else {
        next();
    }
})
export default router
