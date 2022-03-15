import {reqGoodsInfo} from '@/api'
import {reqAddorUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token.js'

const state = {
    goodInfo: {},
    //游客的临时身份
    uuid_token:getUUID()
}
const actions = {
    async getGoodInfo({ commit }, skuId) {        
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);       
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddorUpdateShopCart(skuId,skuNum);     
        if(result.code==200)   {
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
}
const getters = {
    categoryView(){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
 
export default {
    state,
    actions,
    mutations,
    getters,
}
