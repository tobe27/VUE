import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
    total: 0,
    list: [],
    person: {},
  },
  mutations: {
    [ mutations.WHITE_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.WHITE_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }

  },
  actions: {
    [ actions.get.WHITE_LIST ] ({ commit }, payload) {
      let link = `/customer/whitelist/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      return axios.get(link).then(({ data }) => {
        commit(mutations.WHITE_LIST, data)
        return data
      })
    },
    [ actions.get.WHITE_PERSON ] ({ commit }, id) {
      return axios.get('/customer/whitelist/' + id).then(({ data }) => {
        commit(mutations.WHITE_PERSON, data)
        return data
      })
    },
    [ actions.post.WHITE_PERSON ] (context, payload) {
      return axios.post('/customer/whitelist',qs.stringify(payload))
    },
    [ actions.put.WHITE_PERSON ] (context, payload) {
      return axios.put('/customer/whitelist/' + payload.id, qs.stringify(payload))
    },
    [ actions.delete.WHITE_PERSON ] (context, id) {
      return axios.delete('/customer/whitelist/' + id)
    },
    [ actions.post.WHITEGREY_PERSON ] (context, payload) {
      return axios.post('/customer/whitelist/movecustomer',payload)
    },
  }
}
