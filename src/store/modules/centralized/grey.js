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
    [ mutations.GREY_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.GREY_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }

  },
  actions: {
    [ actions.get.GREY_LIST ] ({ commit }, payload) {
      let link = `/customer/greylist/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      return axios.get(link).then(({ data }) => {
        commit(mutations.GREY_LIST, data)
        return data
      })
    },
    [ actions.get.GREY_PERSON ] ({ commit }, id) {
      return axios.get('/customer/greylist/' + id).then(({ data }) => {
        commit(mutations.GREY_PERSON, data)
        return data
      })
    },
    [ actions.post.GREY_PERSON ] (context, payload) {
      return axios.post('/customer/greylist', qs.stringify(payload))
    },
    [ actions.put.GREY_PERSON ] (context, payload) {
      return axios.put('/customer/greylist/' + payload.id, qs.stringify(payload))
    },
    [ actions.delete.GREY_PERSON ] (context, id) {
      return axios.delete('/customer/greylist/' + id)
    }
  }
}
