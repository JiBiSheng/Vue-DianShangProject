//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter)
import store from '@/store'
import routes from './routes'
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数：告诉原来的Push方法，你往哪里跳转(传哪些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 };
    }
});

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //如果用户登录，就不能放行去登录页面了
        if (to.path == '/login') {
            next('/home')
        } else {
            if (name) {
                next();
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next();
                }
                catch (error) {
                    //token失效了，请求不到用户信息，要将本地过期的token清楚
                    store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }
    else {
        //未登录，不能去交易相关页面、不能去支付相关(pay ,paysuccess)不能去个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1||toPath.indexOf('/center')!=-1) {
            next('/login?redirect='+toPath)
        } else {
            next()
        }

    }
})

export default router;