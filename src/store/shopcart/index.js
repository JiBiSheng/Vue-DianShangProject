import { reqCartList } from '@/api'
import { reqDeleteCartById } from '@/api'
import { reqUpdateCheckedByid } from '@/api'
const state = {
    cartList: []
}
const actions = {
    //获得购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一产品
    async deletCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        }
        else {
            return Promise.reject(new error('faile'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return 'ok删除';
        }
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的产品
    deleteAllcheckedCart({ dispatch, getters }) {
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? dispatch('deletCartListBySkuId', element.skuId) : '';
            promiseAll.push(promise);
        });
        //只要全部的promise都成功，则返回成功，如果有一个失败，返回则为失败的记录
        return Promise.all(promiseAll);
    },
    //修改所有产品的状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked: isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    }

}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}