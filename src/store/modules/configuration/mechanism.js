import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'
//机构管理
export default {
  state: {
    mechanismtotal: 0,
    mechanismlist: [],
    mechanismperson: {},
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
      return axios.get('/super/org/' + (id==''?1:id)).then(({ data }) => {
        commit(mutations.MECHANISM_PERSON, data)
        return data
      })
    },
    [ actions.post.MECHANISM_PERSON ] (context, payload) {
      return axios.post('/super/org', qs.stringify(payload))
    },
    [ actions.put.MECHANISM_PERSON ] (context, payload) {
      return axios.put('/super/org/' + payload.residentId, qs.stringify(payload))
    },
    [ actions.delete.MECHANISM_PERSON ] (context, id) {
      return axios.delete('/super/org/' + id)
    }
  }
}
