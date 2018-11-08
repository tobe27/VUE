import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'
import qs from 'qs'

// import qs from 'qs'
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
    [actions.get.GRID_LIST] ({commit}, payload) {
      let user=JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/gridinfo/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&accountId=`+user.accountId+'&roleId='+user.roles[0].roleId
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      if ('gridName' in payload) link += '&gridName=' + payload.gridName
      if ('orgCode' in payload) link += '&orgCode=' + payload.orgCode
      return axios.get(link).then(({data}) => {
        commit(mutations.GRID_LIST, data)
        return data
      })
    },
    [actions.get.GRID_PERSON] ({commit}, idNumber) {
      return axios.get('/gridinfo/' + idNumber).then(({data}) => {
        commit(mutations.GRID_PERSON, data)
        return data
      })
    },
      [actions.get.GRID_HOME] ({commit}, payload) {
          let link='/gridmap/list/'+payload.roleId+'/'+payload.orgCode
          return axios.get(link).then(({data}) => {
              return data
          })
      },
    [actions.delete.GRID_PERSON] (context, id) {
      return axios.delete('/gridinfo/' + id)
    },
    [ actions.put.GRID_PERSON ] (context, payload) {
      return axios.put('/gridinfo/' + payload.gridCode, payload)
    },
    [ actions.post.GRID_PERSON ] (context, payload) {
      return axios.post('/gridinfo', payload)
    },
    [actions.get.GRID_MAP] ({commit}, gridCode) {
      return axios.get('/gridmap/' + gridCode).then(({data}) => {
        return data
      })
    },
    [actions.get.GRIDNAME_LIST] ({commit}, payload) {
      let user=JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/gridinfo/list?pageNum=1&pageSize=1000&accountId=`+user.accountId+'&roleId='+user.roles[0].roleId
      return axios.get(link).then(({data}) => {
        // commit(mutations.GRIDNAME_LIST, data)
        return data
      })
    }
  }
}
