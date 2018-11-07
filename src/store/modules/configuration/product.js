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
    [ mutations.PRODUCT_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.PRODUCT_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }

  },
  actions: {
    [ actions.get.PRODUCT_LIST ] ({ commit }, payload) {
      let link = `/super/product/dict/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if (payload.state==0 || payload.state==1) link += '&state=' + payload.state
      return axios.get(link).then(({ data }) => {
        commit(mutations.PRODUCT_LIST, data)
        return data
      })
    },
    [ actions.get.PRODUCT_PERSON ] ({ commit }, id) {
      return axios.get('/super/product/dict/' + id).then(({ data }) => {
        commit(mutations.PRODUCT_PERSON, data)
        return data
      })
    },
    [ actions.post.PRODUCT_PERSON ] (context, payload) {
      return axios.post('/super/product/dict', qs.stringify(payload))
    },
    [ actions.put.PRODUCT_PERSON ] (context, payload) {
      return axios.put('/super/product/dict/' + payload.id, qs.stringify(payload))
    },
    //  [ actions.delete.PRODUCT_PERSON ] (context, id) {
    //   return axios.delete('/product/' + id)
    // }
  }
}
