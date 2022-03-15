<template>
  <div>
    <Header/>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <!-- 在Home和Search显示，在登录和注册下隐藏 -->
    <!-- 但是通过route.path不是最好的办法 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"/>    -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    //通知Vuex发请求，获取商品分类的三级列表数据，存储在仓库当中,当typeNav组件重复加载时，数据只需要请求一次
    this.$store.dispatch("categoryList");
  }

}
</script>

<style>

</style>