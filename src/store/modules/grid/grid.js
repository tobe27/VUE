import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

export default {
  state: {
    gridtotal: 0,
    gridlist: [],
    gridperson: {},
    gridNameList: []
  },
  mutations: {
    [mutations.GRID_PERSON] (state, payload) {
      if (payload.data) {
        state.gridperson = payload.data
      } else {
        state.gridperson = {}
      }
    },
    [mutations.GRID_LIST] (state, payload) {
      state.gridtotal = payload.count
      state.gridlist = payload.data
    },
    [mutations.GRIDNAME_LIST] (state, payload) {
      state.gridNameList = payload.data
    }
  },
  actions: {
    [actions.get.GRID_LIST] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/grid/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&userId=` + user.id
      link = link + '&roleId=' + user.roles[0].id + '&orgCode=' + user.orgCode
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      if ('gridName' in payload) link += '&gridName=' + payload.gridName
      return axios.get(link).then(({ data }) => {
        commit(mutations.GRID_LIST, data)
        return data
      })
    },
    [actions.get.GRID_PERSON] ({ commit }, idNumber) {
      return axios.get('/grid/' + idNumber).then(({ data }) => {
        commit(mutations.GRID_PERSON, data)
        return data
      })
    },
    [actions.delete.GRID_PERSON] (context, id) {
      return axios.delete('/grid/' + id)
    },
    [actions.put.GRID_PERSON] (context, payload) {
      return axios.put('/grid/' + payload.gridCode, payload)
    },
    [actions.post.GRID_PERSON] (context, payload) {
      return axios.post('/grid', payload)
    },
    [actions.get.GRID_MAP] ({ commit }, gridCode) {
      return axios.get('/gridmap/' + gridCode).then(({ data }) => {
        return data
      })
    },
    [actions.get.GRIDNAME_LIST] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = user.roles[0].id
      let link ='/grid/list?userId=' +user.id +'&roleId=' +roleId +'&orgCode=' +user.orgCode+'&pageNum='+payload.pageNum+'&pageSize='+payload.pageSize
      return axios.get(link).then(({ data }) => {
        commit(mutations.GRIDNAME_LIST, data)
        return data
      })
    }
  }
}
