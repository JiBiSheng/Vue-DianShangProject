//引入路由组件
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: "/home",
        //路由动态引入
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        name: 'search',

        //面试题：路由组件能不能传递props数据？ 可以 ，有三种写法
        //1.布尔值写法：只适用于params参数
        //props:true,
        //2.对象写法：
        //props:{a:1,b:2}
        //3.函数写法：可以将params参数、query参数通过props传递给路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: false }
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: AddCartSuccess,
        //是否展示底部footer组件
        meta: { show: true }
    },
    {
        path: "/shopcart",
        name: 'shopcart',
        component: ShopCart,
        //是否展示底部footer组件
        meta: { show: true }
    },
    {
        path: "/trade",
        name: 'trade',
        component: Trade,
        //是否展示底部footer组件
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') next();
            else {
                next(false)
            }
        }
    },
    {
        path: "/pay",
        name: 'pay',
        component: Pay,
        //是否展示底部footer组件
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') next();
            else {
                next(false)
            }
        }
    },
    {
        path: "/paysuccess",
        name: 'paysuccess',
        component: PaySuccess,
        //是否展示底部footer组件
        meta: { show: false },
        // beforeEnter: (to, from, next) => {
        //     if (from.path == '/pay') next();
        //     else {
        //         next(false)
        //     }
        // }
    },
    {
        path: "/center",
        name: 'center',
        component: Center,
        //是否展示底部footer组件
        meta: { show: false },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            },

        ],

    },
 
    //重定向：在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }

]