import Vue from 'vue'

import App from './App.vue'
//引入路由
import router from '@/router'
//三级联动组件--注册为全局组件
import TypeNav from '@/components/TypeNav'
//注册轮播图也为一个全局组件
import Carsousel from '@/components/Carousel'
//分页器全局组件
import Pagination from '@/components/Pagination'
//饿了吗ui
import { Button, MessageBox } from 'element-ui';

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/tianxianbaobao.gif'
//注册图片懒加载插件
Vue.use(VueLazyload,{
  loading:atm
});
//第一个参数为组件的名字，第二个参数为组件
Vue.component(Button.name, Button);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
//element-ui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServer.js--mock数据
import '@/mock/mockServe'
//统一接口api文件夹里面全部请求函数
import * as API from '@/api'

//引入swiper样式
import "swiper/css/swiper.css"


Vue.config.productionTip = false
import store from '@/store'

//引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;

  },
  //注册路由：当这里书写router的时候，组件身上都拥有$route和$router属性
  router,
  //注册仓库(vuex)：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
