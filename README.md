# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

本项目主要使用Vue+vuex+vue-router实现的尚品汇电商前台项目

1.实现了注册，登录，商品信息获取，加入购物车，下订单，结算，个人中心等模块

2.对axios进行了二次封装，向服务器发送请求，大部分模块使用Vuex存储服务器返回的数据并进行组件间数据的传递，部分模块直接再组件内向服务器发送请求；

3.使用Vue-router进行路由跳转，采用了声明式路由和编程式路由，无参跳转以及params参数、query参数跳转，以及动态路由

4.向服务器发送请求，使用async-await等待返回结果

5.支付页面简单的使用了Element-UI库实现付款二维码的展示

6.商品展示使用了图片懒加载技术，修改商品数量使用了节流进行优化；

7.采用nginx将该项目部署再云服务器上，访问IP地址：http:\\101.35.195.105
