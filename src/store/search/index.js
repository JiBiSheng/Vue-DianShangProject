import { reqGetSearchInfo } from "@/api";
//search模块的小仓库
const state={
    SearchList:{}    
};
const mutations={
    GETSEARCHLIST(state,SearchList){
        state.SearchList=SearchList
    }

};
const actions={
    async getSearchList({commit},params={}){

        let result=await reqGetSearchInfo(params);
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }

    }
};
const getters={
    goodsList(state){
       return state.SearchList.goodsList||[];
    },
    attrsList(state){
        return state.SearchList.attrsList||[];
    },
    trademarkList(state){
        return state.SearchList.trademarkList||[] ;
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}