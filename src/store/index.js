import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import { asyncRouterMap, constantRouterMap } from '@/router/index.js'
Vue.use(Vuex)
function hasPermission (roles, route) {
  if (route.meta && route.meta.roleId) {
    let a = route.meta.roleId.indexOf(roles)
    return a >= 0
  } else {
    return true
  }
}
export default new Vuex.Store({
  modules,
  state: {
    routers: constantRouterMap,
    addRouters: [],
    first: true
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_FIRST: (state, data) => {
      state.first = data
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = asyncRouterMap.filter(v => {
          // if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(data, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(data, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    ChangeFirst ({ commit }, data) {
      commit('SET_FIRST', data)
    }
  }
})
