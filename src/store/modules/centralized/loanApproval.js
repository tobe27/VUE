import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
   
  },
  mutations: {
  /*  [ mutations.RESULT_PERSON ] (state, payload) {
      state.resultperson = payload.data
    },
    [ mutations.RESULT_LIST ] (state, payload) {
      state.resulttotal = payload.count
      state.resultlist = payload.data
    }*/
  },
  actions: {
    /*[ actions.get.RESULT_LIST ] ({ commit }, payload) {
      let link = `/customer/creditdetail/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      return axios.get(link).then(({ data }) => {
        commit(mutations.RESULT_LIST, data)
        return data
      })
    },
    [ actions.post.RESULT_PERSON ] (context, payload) {
      return axios.post('/customer/creditdetail',qs.stringify(payload))
    },
    [ actions.delete.RESULT_PERSON ] (context, id) {
      return axios.delete('customer/creditdetail/'+id)
    }*/
      [ actions.get.file_TEST_LIST ] ({ commit }, payload) {

          return axios.get('/file/testfile')
      },
  }
}
