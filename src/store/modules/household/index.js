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
    [mutations.RESIDENT_PERSON] (state, payload) {
      state.person = payload.data
    },
    [mutations.RESIDENTBYIDNUMBER_PERSON] (state, payload) {
      state.person = payload.data
    },
    [mutations.RESIDENT_LIST] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }
  },
  actions: {
    [actions.get.RESIDENT_LIST] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/customer/resident/list?pageNum=${payload.pageNum}&pageSize=${
        payload.pageSize
      }`
      link =
        link +
        '&roleId=' +
        user.roles[0].roleId +
        `&accountId=` +
        user.accountId +
        '&orgCode=' +
        user.orgCode
      if ('residentName' in payload) { link += '&residentName=' + payload.residentName }
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('householdId' in payload) { link += '&householdId=' + payload.householdId }
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      return axios.get(link).then(({ data }) => {
        commit(mutations.RESIDENT_LIST, data)
        return data
      })
    },
    [actions.get.RESIDENT_PERSON] ({ commit }, id) {
      return axios.get('/customer/resident/' + id).then(({ data }) => {
        commit(mutations.RESIDENT_PERSON, data)
        return data
      })
    },
    [actions.get.RESIDENTBYIDNUMBER_PERSON] ({ commit }, idNumber) {
      return axios
        .get('/customer/resident/idnumber/' + idNumber)
        .then(({ data }) => {
          commit(mutations.RESIDENT_PERSON, data)
          return data
        })
    },
    [actions.post.RESIDENT_PERSON] (context, payload) {
      return axios.post('/customer/resident', qs.stringify(payload))
    },
    [actions.put.RESIDENT_PERSON] (context, payload) {
      return axios.put(
        '/customer/resident/' + payload.residentId,
        qs.stringify(payload)
      )
    },
    [actions.delete.RESIDENT_PERSON] (context, id) {
      return axios.delete('/customer/resident/' + id)
    }
  }
}
