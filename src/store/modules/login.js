import axios from '../axios'
import actions from '../action-types'
import mutations from '../mutation-types'
import qs from 'qs'

export default {
  state: {
      gridLogin: {}
  },
  mutations: {
    [mutations.GRID_LOGIN] (state, payload) {
      state.gridLogin = payload.data
    }
  },
  actions: {
    [actions.post.GRID_LOGIN] ({commit}, payload) {
      return axios.post('/login', qs.stringify(payload)).then(({data}) => {
        commit(mutations.GRID_LOGIN, data)
        return data
      })
    }
  }
}
