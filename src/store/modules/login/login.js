import axios from '@/store/axios'
import actions from '@/store/action-types'
import mutations from '@/store/mutation-types'
import qs from 'qs'

export default {
  state: {
    gridLogin: {},
    user: {},
    userObj: {},
    newrouter: [],
    first: true
  },
  mutations: {
    [mutations.GRID_LOGIN] (state, payload) {
      state.gridLogin = payload.data
    },
    [mutations.USER_LOGIN] (state, payload) {
      state.user = payload
    },
    [mutations.USER_INFO] (state, payload) {
      state.userObj = { ...payload }
    }
  },
  actions: {
    [actions.post.GRID_LOGIN] ({ commit }, payload) {
      console.log(qs.stringify(payload))
      return axios.post('/login', payload).then(({ data }) => {
        console.log(data)
        commit(mutations.GRID_LOGIN, data)
        return data
      })
    },
    [actions.post.USER_LOGIN] ({ commit }, payload) {
      commit(mutations.USER_LOGIN, payload)
    },
    [actions.post.USER_INFO] ({ commit }, payload) {
      commit(mutations.USER_LOGIN, payload)
    }
  }
}
