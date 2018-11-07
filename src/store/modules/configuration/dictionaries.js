import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
    total: 0,
    list: [],
    person: []
  },
  mutations: {
    [mutations.DICTIONARIES_LIST] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    },
    [mutations.DICTIONARIES_SHOW] (state, payload) {
      state.person = payload.data
      state.person1 =payload.data[0]
    }
  },
  actions: {
    [ actions.get.DICTIONARIES_LIST ] ({ commit }, payload) {

      return axios.get('/super/dictionary/list?pageNo=' + payload.pageNo + '&pageSize=' + payload.pageSize).then(({ data }) => {
        commit(mutations.DICTIONARIES_LIST, data)
        return data
      })
    },
    [ actions.get.DICTIONARIES_SHOW ] ({ commit }, code) {
      return axios.get('/super/dictionary/' + code).then(({ data }) => {
        commit(mutations.DICTIONARIES_SHOW, data)
        return data
      })
    },
    [ actions.post.DICTIONARIES_LIST ] (context, payload) {
        let list1=[payload]
      return axios.post('/super/dictionary', list1)
    },
    [ actions.put.DICTIONARIES_LIST ] (context, payload) {
      let list = [payload]
      return axios.put('super/dictionary', list)
    },
    [ actions.delete.DICTIONARIES_LIST ] (context, id) {
      return axios.delete('/super/dictionary/' + id)
    }
  }
}
