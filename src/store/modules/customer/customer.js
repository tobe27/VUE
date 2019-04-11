import axios from '@/store/axios'
import actions from '@/store/action-types'
import mutations from '@/store/mutation-types'

import qs from 'qs'

export default {
  state: {
    total: 0,
    list: [],
    person: {},
    familysperson: {},
    propertyperson: {},
    dishonestperson: [{}],
    creditperson: {},
    Memberlist: []
  },
  mutations: {
    [ mutations.CUSTOMER_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.CUSTOMER_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    },
    [ mutations.FAMILYS_PERSON ] (state, payload) {
      if (payload.data) {
        state.familysperson = payload.data
      } else {
        state.familysperson = {}
      }
    },
    [ mutations.PROPERTY_PERSON ] (state, payload) {
      if (payload.data) {
        state.propertyperson = payload.data
      } else {
        state.propertyperson = {}
      }
    },
    [ mutations.DISHONEST_PERSON ] (state, payload) {
      state.dishonestperson = payload.data
    },
    [ mutations.CREDIT_PERSON ] (state, payload) {
      if (payload.data) {
        state.creditperson = payload.data
      } else {
        state.creditperson = {}
      }
    },
    [ mutations.MEMBER_LIST ] (state, payload) {
      state.total = payload.count
      state.Memberlist = payload.data
    }
  },
  actions: {
    [ actions.get.CUSTOMER_LIST ] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/customer/info/list/?pageNum=${payload.pageNum}&userId=${user.id}&pageSize=${payload.pageSize}&roleId=` + user.roles[0].id + '&orgCode=' + user.orgCode
      if ('username' in payload) link += '&customerName=' + payload.customerName
      if ('nativeAddress' in payload) link += '&nativeAddress=' + payload.nativeAddress
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      if ('status' in payload) link += '&status=' + payload.status
      console.log(link)
      console.log(payload)
      return axios.get(link).then(({ data }) => {
        commit(mutations.CUSTOMER_LIST, data)
        return data
      })
    },

    // 基本信息
    [ actions.get.CUSTOMER_PERSON ] ({ commit }, id) {
      return axios.get('/customer/info/' + id).then(({ data }) => {
        commit(mutations.CUSTOMER_PERSON, data)
        return data
      })
    },
    [ actions.get.CUSTOMERS_PERSON ] ({ commit }, id) {
      return axios.get('/customer/info/idnumber/' + id).then(({ data }) => {
        return data
      })
    },
    [ actions.post.CUSTOMER_PERSON ] (context, payload) {
      return axios.post('/customer/info', qs.stringify(payload))
    },
    [ actions.put.CUSTOMER_PERSON ] (context, payload) {
      return axios.put('/customer/info/' + payload.customerId, qs.stringify(payload))
    },
    [ actions.put.CUSTOMERS_PERSON ] (context, payload) {
      return axios.put('/customer/info/' + payload.id + '/status/' + payload.status, qs.stringify(payload))
    },
    // 基本信息暂存
    [ actions.post.TEMPORARY_PERSON ] (context, payload) {
      return axios.post('/customer/info/draft', qs.stringify(payload))
    },
    [ actions.put.TEMPORARY_PERSON ] (context, payload) {
      return axios.put('/customer/info/draft/' + payload.customerId, qs.stringify(payload))
    },
    [ actions.delete.TEMPORARY_PERSON ] (context, payload) {
      return axios.delete('/customer/info/' + payload)
    },
    // 申请表
    [ actions.get.PREVIEWS_PERSON ] ({ commit }, customerId) {
      return axios.get('/customer/info/form/' + customerId).then(({ data }) => {
        return data
      })
    },
    // 家庭成员信息列表
    [ actions.get.FAMILY_LIST ] ({ commit }, payload) {
      let link = '/customer/resident/list?pageNum=1&pageSize=20&householdId=' + payload
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    // 客户家庭详情
    [ actions.get.FAMILYS_PERSON ] ({ commit }, householdId) {
      return axios.get('/customer/family/' + householdId).then(({ data }) => {
        commit(mutations.FAMILYS_PERSON, data)
        return data
      })
    },
    [ actions.post.FAMILYS_PERSON ] (context, payload) {
      return axios.post('/customer/family', qs.stringify(payload))
    },
    [ actions.put.FAMILYS_PERSON ] (context, payload) {
      return axios.put('/customer/family/' + payload.householdId, qs.stringify(payload))
    },
    // 客户家庭成员
    [ actions.get.MEMBER_LIST ] ({ commit }, payload) {
      let link = `/customer/family/member/list?customerId=${payload}`
      return axios.get(link).then(({ data }) => {
        commit(mutations.MEMBER_LIST, data)
        return data
      })
    },
    [ actions.get.MEMBER_PERSON ] ({ commit }, memberId) {
      return axios.get('/customer/family/member/' + memberId).then(({ data }) => {
        // commit(mutations.MEMBER_PERSON, data)
        return data
      })
    },
    [ actions.post.MEMBER_PERSON ] (context, payload) {
      return axios.post('/customer/family/member', qs.stringify(payload))
    },
    [ actions.put.MEMBER_PERSON ] (context, payload) {
      return axios.put('/customer/family/member/' + payload.memberId, qs.stringify(payload))
    },
    [ actions.delete.MEMBER_PERSON ] (context, memberId) {
      return axios.delete('customer/family/member/' + memberId)
    },
    // 财务信息
    [ actions.get.PROPERTY_PERSON ] ({ commit }, idNumber) {
      return axios.get('/customer/finance/' + idNumber).then(({ data }) => {
        commit(mutations.PROPERTY_PERSON, data)
        return data
      })
    },
    [ actions.post.PROPERTY_PERSON ] (context, payload) {
      return axios.post('/customer/finance', qs.stringify(payload))
    },
    [ actions.put.PROPERTY_PERSON ] (context, payload) {
      return axios.put('/customer/finance/' + payload.idNumber, qs.stringify(payload))
    },

    // 业务信息
    [ actions.get.BUSINESS_PERSON ] ({ commit }, idNumber) {
      return axios.get('/customer/business/' + idNumber).then(({ data }) => {
        return data
      })
    },

    // 标签信息
    [ actions.get.TAGALL_LIST ] (context, idNumber) {
      let link = `/super/tag/list?pageNum=1&pageSize=50`
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [ actions.get.MYTAG_LIST ] ({ commit }, idNumber) {
      let link = '/customer/' + idNumber + '/tag/list'
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [ actions.post.MYTAG_PERSON ] (context, payload) {
      return axios.post('/customer/' + payload.idNumber + '/tag', qs.stringify(payload))
    },
    // [ actions.delete.MYTAG_PERSON ] (context, tagId) {
    //     return axios.delete('/customer/tag/'+tagId)
    // },
    [ actions.delete.MYTAG_PERSON ] (context, payload) {
      return axios.delete('/customer/' + payload.idNumber + '/tag/' + payload.tagId)
    },
    [ actions.get.CUSTOMER_POORINFO ] (context, idNumber) {
      let link = '/customer/poorinfo/' + idNumber
      return axios.get(link).then(({ data }) => {
        return data
      })
    },

    // 信誉信息
    [ actions.get.CREDIT_PERSON ] ({ commit }, idNumber) {
      return axios.get('/customer/credit/' + idNumber).then(({ data }) => {
        commit(mutations.CREDIT_PERSON, data)
        return data
      })
    },
    // 影响资料
    [ actions.get.IMAGE_LIST ] (context, payload) {
      let link = '/customer/image/list/' + payload.idNumber
      if ('type' in payload) link += '?type=' + payload.type
      if ('creditDetailId' in payload) link += '&creditDetailId=' + payload.creditDetailId
      return axios.get(link)
    },
    [ actions.post.IMAGE_PERSON ] (context, payload) {
      return axios.post('customer/image', payload)
    },
    [ actions.delete.IMAGE_PERSON ] (context, id) {
      return axios.delete('/customer/image/' + id)
    },
    // 失信人详情
    [ actions.post.DISHONEST_PERSON ] ({ commit }, payload) {
      return axios.post('/customer/dishonesty', qs.stringify(payload)).then(({ data }) => {
        commit(mutations.DISHONEST_PERSON, data)
        return data
      })
    },
    // 'BATCH_PERSON',//客户批签审核
    [ actions.put.BATCH_PERSON ] (context, payload) {
      return axios.put('/customer/info/status/batch', payload)
    }
  }
}
