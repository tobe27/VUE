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
    [ mutations.ADVISORY_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.ADVISORY_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }

  },
  actions: {
    [ actions.get.ADVISORY_LIST ] ({ commit }, payload) {
      let link = `/customer/creditadviser/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      if ('adviserName' in payload) link += '&adviserName=' + payload.adviserName
      return axios.get(link).then(({ data }) => {
        commit(mutations.ADVISORY_LIST, data)
        return data
      })
    },
    [ actions.get.ADVISORY_PERSON ] ({ commit }, id) {
      return axios.get('/customer/creditadviser/' + id).then(({ data }) => {
        commit(mutations.ADVISORY_PERSON, data)
        return data
      })
    },
    [ actions.post.ADVISORY_PERSON ] (context, payload) {
      return axios.post('/customer/creditadviser', payload)
    },
    [ actions.put.ADVISORY_PERSON ] (context, payload) {
      return axios.put('/customer/creditadviser/' + payload.id, payload)
    },
    [ actions.delete.ADVISORY_PERSON ] (context, id) {
      return axios.delete('/customer/creditadviser/' + id)
    }
  }
}
