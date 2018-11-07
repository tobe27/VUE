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
    [ mutations.BLACK_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.BLACK_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }

  },
  actions: {
    [ actions.get.BLACK_LIST ] ({ commit }, payload) {
      let link = `/customer/blacklist/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      return axios.get(link).then(({ data }) => {
        commit(mutations.BLACK_LIST, data)
        return data
      })
    },
    [ actions.get.BLACK_PERSON ] ({ commit }, id) {
      return axios.get('/customer/blacklist/' + id).then(({ data }) => {
        commit(mutations.BLACK_PERSON, data)
        return data
      })
    },
    [ actions.post.BLACK_PERSON ] (context, payload) {
      return axios.post('/customer/blacklist', qs.stringify(payload))
    },
    [ actions.put.BLACK_PERSON ] (context, payload) {
      return axios.put('/customer/blacklist/' + payload.id, qs.stringify(payload))
    },
    [ actions.delete.BLACK_PERSON ] (context, id) {
      return axios.delete('/customer/blacklist/' + id)
    }
  }
}
