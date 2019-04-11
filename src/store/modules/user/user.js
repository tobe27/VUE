import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
  state: {
    total: 0,
    list: [],
    person: {},
    userList: [],
    message: ''
  },
  mutations: {
    [mutations.RESIDENT_USER] (state, payload) {
      state.total = payload.count
      state.userList = payload.data
    },
    [mutations.USER_PERSON] (state, payload) {
      state.person = payload.data
    }
  },
  actions: {
    [actions.get.RESIDENT_USER] ({ commit }, userData) {
      let link = '/admin/user/list?pageNum=' + userData.pageNum + '&pageSize=' + userData.pageSize + '&orgCode=' + userData.orgCode
      // let link = '/super/account/list?pageNum=' + userData.pageNum + '&pageSize=' + userData.pageSize
      if ('username' in userData) link += '&username=' + userData.username
      if ('name' in userData) link += '&name=' + userData.name
      return axios.get(link).then(({ data }) => {
        commit(mutations.RESIDENT_USER, data)
        return data
      })
    },
    [actions.get.USER_PERSON] ({ commit }, accountId) {
      let link = '/admin/user/' + accountId
      return axios.get(link).then(({ data }) => {
        commit(mutations.USER_PERSON, data)
        return data
      })
    },
    [actions.get.RESIDENT_USER_ROLEID] ({ commit }, userData) { // 通过角色id获取用户列表
      let link = '/super/account/list/' + userData.roleId + '?pageNum=1&pageSize=1000&orgCode=' + userData.orgCode
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [actions.put.USER_PERSON] ({ commit }, payload) { // 修改密码 修改冻结状态
      console.log(payload)
      let link = '/admin/user/' + payload.id + '/part'
      return axios.put(link, payload)
    },
    [actions.put.USER_SET] ({ commit }, payload) { // 编辑用户信息
      let link = '/super/account/' + payload.id
      return axios.put(link, payload)
    },
    // [actions.put.USER_STATUS] ({ commit }, payload) { // 用户修改冻结状态
    //   let link = '/super/account/' + payload.accountId + '/status/' + payload.status
    //   return axios.put(link, qs.stringify(payload))
    // },
    [actions.post.USER_PERSON] (context, payload) { // 添加用户
      return axios.post('/admin/user', payload)
    }
  }
}
