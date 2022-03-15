//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动接口：/api/product/getBaseCategoryList    get   无参数
//发请求：axios发请求返回结果为Promise对象
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'});

//获取banner（Home首页轮播图接口）
export const reqGetBannerList=()=>mockRequests.get('/banner');
//获取floor数据
export const reqGetFloorList=()=>mockRequests.get('/floor');
//获取搜索模块数据   地址：/api/list   请求方式：POST
//当前这个接口，给服务器传递参数params
export const reqGetSearchInfo=(params)=>requests({url:"/list",method:"post",data:params})

//获取产品详情信息的接口  URL: /api/item/{skuId} 请求方式：get
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})
//将产品添加到购物车中或者更新某一个产品的个数:/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddorUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})

//获取购物车例表的数据接口
export const reqCartList=()=>requests({url:"/cart/cartList",method:'get'})

//删除购物车产品的接口
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})

//修改商品选中的状态/api/cart/checkCart/{skuId}/{isChecked}  method:get
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码接口：/api/user/passport/sendCode/{phone}  get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册接口 ：/api/user/passport/register
export const reqUserRegister=(data)=>requests({url:"/user/passport/register",data,method:"post"})

//登录接口 ：/api/user/passport/login   post
export const reqUserLogin=(data)=>requests({url:"/user/passport/login",data,method:'post'})

//token请求获取用户信息接口：api/user/passport/auth/getUserInfo  get
export const reqUserInfo=()=>requests({url:"/user/passport/auth/getUserInfo",method:'get'})
//退出登录 /user/passport/logout
export const reqLogOut=()=>requests({url:'user/passport/logout',method:'get'})

//获取用户地址信息：/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo=()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:'get'})

//获取商品订单信息接口：/payment/weixin/createNative/{orderId}  get
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单接口  ：/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息：/api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付成功与否信息：/payment/weixin/createNative/{orderId}  get
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取个人中心信息  order/auth/{page}/{limit}  get
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})