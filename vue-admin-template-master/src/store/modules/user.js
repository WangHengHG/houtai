//引入登录| 退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user';
//获取token|设置token|移除删除token
import { getToken, setToken, removeToken } from '@/utils/auth';
//路由模块当中重置路由的方法
import {anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router';
console.log(asyncRoutes);
import router from '@/router';
import Router from 'vue-router';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    //服务器返回的菜单信息[根据不同的角色返回的标记信息, 数组里面的元素是字符串]
    routes: [],
    //角色信息
    rules: [],
    //按钮权限的信息
    buttons: [],
    //对比之后[项目中已有的异步路由, 与服务器返回的标记的信息进行对比, 最终需要展示的路由]
    resultAsyncRoutes: [],
    //用户最终需要展示的全部路由
    resultAllRoutes: [],
  }
}

const state = getDefaultState()

//定义一个函数, 两个数组进行对比, 对比出当前的用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  //过滤出当前用户[超级管理员| 普通员工] 需要展示的异步路由
  return asyncRoutes.filter(item=> {
    //数组当中没有这个元素返回索引值-1, 如果有这个元素返回的索引值一定不是-1
    if(routes.indexOf(item.name) != -1) {
      //递归, 还有多级路由
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true
    }
  })
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    state.rules = userInfo.rules;
    state.buttons = userInfo.buttons;
    state.routes = userInfo.routes;
  },
  //最终计算出来的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes)=> {
    //vuex保存当前用户的异步路由 注意: 一个用户需要展示完成路由: 常量, 异步, 任意路由
    state.resultAsyncRoutes = asyncRoutes;
    //计算出当前用户需要展示所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    //给路由添加新的路由
    // console.log(state.resultAllRoutes, '传送路由');
    router.matcher = new Router().matcher;
    router.addRoutes(state.resultAllRoutes)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // 解构出用户名和密码
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    // 注意: 当前登录的请求使用的是mock的数据, 他的code是20000
     if(result.code == 20000) {
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token);
      return 'ok';
     } else{
       return Promise.reject(new Error('faild'))
     }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        //avatar : 不同用户应该展示哪些菜单的标记
        //vuex存储用户的全部信息
        commit('SET_USERINFO', data);
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes));
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

