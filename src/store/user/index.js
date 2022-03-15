import { reqGetCode } from '@/api'
import { reqUserRegister } from '@/api'
import { reqUserLogin } from '@/api'
import {reqUserInfo} from '@/api'
import{reqLogOut} from '@/api'

const state = {
    code: '',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async UserLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            localStorage.setItem('TOKEN',result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        } else{
            Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogOut({commit}){
        let result=await reqLogOut();
        if(result.code==200){
            localStorage.removeItem('TOKEN')
           commit('CLEAR');
           return 'ok';
        }else{
             return Promise.reject(new Error('failee'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    CLEAR(state){
        state.token='';
        state.userInfo={};
        
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters,
}

