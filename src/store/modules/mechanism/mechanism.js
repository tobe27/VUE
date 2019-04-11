import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'
// 机构管理
export default {
  state: {
    mechanismtotal: 0,
    mechanismlist: [],
    mechanismperson: {}
  },
  mutations: {
    [ mutations.MECHANISM_PERSON ] (state, payload) {
      state.mechanismperson = payload.data
    },
    [ mutations.MECHANISM_LIST ] (state, payload) {
      state.mechanismtotal = payload.count
      state.mechanismlist = payload.data
    }
  },
  actions: {
    [ actions.get.MECHANISM_PERSON ] ({ commit }, id) {
      console.log(id)
      let orgCode = JSON.parse(sessionStorage.getItem('userObj')).orgCode
      return axios.get('/admin/org/list/?orgCode=' + (!id? orgCode : id)).then(({ data }) => {
        commit(mutations.MECHANISM_PERSON, data)
        return data
      })
    },
    [ actions.post.MECHANISM_PERSON ] (context, payload) {
      return axios.post('/admin/org', payload)
    },
    [ actions.put.MECHANISM_PERSON ] (context, payload) {
      console.log(payload)
      return axios.put('/admin/org/' + payload.orgId, payload)
    },
    [ actions.delete.MECHANISM_PERSON ] (context, id) {
      return axios.delete('/admin/org/' + id,id)
    }
  }
}
