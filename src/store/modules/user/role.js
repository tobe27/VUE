import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
    roletotal: 0,
    rolelist: [],
    roleperson: {}
  },
  mutations: {
    [ mutations.ROLE_PERSON ] (state, payload) {
      state.roleperson = payload.data
    },
    [ mutations.ROLE_LIST ] (state, payload) {
      state.roletotal = payload.count
      state.rolelist = payload.data
    }
  },
  actions: {
    [ actions.get.ROLE_LIST ] ({ commit }, payload) {
      let link = `/super/role/list?pageNo=${payload.pageNo}&pageSize=${payload.pageSize}`
      if ('roleName' in payload) link += '&roleName=' + payload.roleName
      if ('roleScope' in payload) link += '&roleScope=' + payload.roleScope
      return axios.get(link).then(({ data }) => {
        commit(mutations.ROLE_LIST, data)
        return data
      })
    },
    [ actions.get.ROLE_PERSON ] ({ commit }, id) {
      return axios.get('/super/role/' + id).then(({ data }) => {
        commit(mutations.ROLE_PERSON, data)
        return data
      })
    },
    [ actions.post.ROLE_PERSON ] (context, payload) {
      return axios.post('/super/role', qs.stringify(payload))
    },
    [ actions.put.ROLE_PERSON ] (context, payload) {
      return axios.put('/super/role/' + payload.roleId, qs.stringify(payload))
    },
    [ actions.delete.ROLE_PERSON ] (context, id) {
      return axios.delete('/super/role/' + id)
    }
  }
}
