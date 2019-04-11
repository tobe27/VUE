import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
    total: 0,
    list: [],
    person: {}
  },
  mutations: {
    [ mutations.AUTHORITY_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.AUTHORITY_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }
  },
  actions: {
    [ actions.get.AUTHORITY_LIST ] ({ commit }, payload) {
      let link = `/super/permission/list?pageNo=${payload.pageNo}&pageSize=${payload.pageSize}`
      if ('permissionName' in payload) link += '&permissionName=' + payload.permissionName
      return axios.get(link).then(({ data }) => {
        commit(mutations.AUTHORITY_LIST, data)
        return data
      })
    },
    [ actions.get.AUTHORITY_PERSON ] ({ commit }, id) {
      return axios.get('/super/permission/' + id).then(({ data }) => {
        commit(mutations.AUTHORITY_PERSON, data)
        return data
      })
    },
    [ actions.post.AUTHORITY_PERSON ] (context, payload) {
      return axios.post('/super/permission', qs.stringify(payload))
    },
    [ actions.put.AUTHORITY_PERSON ] (context, payload) {
      return axios.put('/super/permission/' + payload.permissionId, qs.stringify(payload))
    },
    [ actions.delete.AUTHORITY_PERSON ] (context, id) {
      return axios.delete('/super/permission/' + id)
    }
  }
}
