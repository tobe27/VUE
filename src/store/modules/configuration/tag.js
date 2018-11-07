import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
    tagtotal: 0,
    taglist: [],
    tagperson: {}
  },
  mutations: {
    [ mutations.TAG_PERSON ] (state, payload) {
      state.tagperson = payload.data
    },
    [ mutations.TAG_LIST ] (state, payload) {
      state.tagtotal = payload.count
      state.taglist = payload.data
    }
  },
  actions: {
    [ actions.get.TAG_LIST ] ({ commit }, payload) {
      let link = `/super/tag/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      return axios.get(link).then(({ data }) => {
        commit(mutations.TAG_LIST, data)
        return data
      })
    },
    [ actions.get.TAG_PERSON ] ({ commit }, id) {
      return axios.get('/super/tag/' + id).then(({ data }) => {
        commit(mutations.TAG_PERSON, data)
        return data
      })
    },
    [ actions.post.TAG_PERSON ] (context, payload) {
      return axios.post('/super/tag', qs.stringify(payload))
    },
    [ actions.put.TAG_PERSON ] (context, payload) {
      return axios.put('/super/tag/' + payload.tagId, qs.stringify(payload))
    },
    [ actions.delete.TAG_PERSON ] (context, id) {
      return axios.delete('/super/tag/' + id)
    }
  }
}
