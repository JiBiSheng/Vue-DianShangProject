import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
    address: [],
    orderInfo:{}
}
const actions = {
    //获取用户地址信息
    async getUserAdress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETUSERADRESS', result.data)
        }
    },
    //获取商品清单的函数
   async orderInfor({commit}){
      let result= await reqOrderInfo();
      if(result.code==200){
          commit('ORDERINFOR',result.data)
      }
    }

}
const mutations = {
    GETUSERADRESS(state, address) {
        state.address = address
    },
    ORDERINFOR(state,orderInfo){
        state.orderInfo=orderInfo;
    }

}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}