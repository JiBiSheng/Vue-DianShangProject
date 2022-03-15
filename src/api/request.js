//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from "nprogress";
//引入进度条样式(可以修改)
import "nprogress/nprogress.css"
//start:进度条开始  done:进度条结束
//在当前模块中引入store
import store from '@/store';
//1.利用axios对象的方法：create去创建一个axios实例
//2.requests就是axios，只不过稍微配置一下
const requests=axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    timeout:5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //进度条开始动
    if(store.state.detail.uuid_token){
        //给请求头添加字段
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start();
    return config;
});
//响应拦截器：
requests.interceptors.response.use((res)=>{    
    //成功的回调函数：服务器相应的数据回来以后，响应拦截器可以检测到，可以做一些事情
    //成功返回数据,进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
    
});

export default requests;
