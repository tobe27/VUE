import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
    state: {
        resulttotal: 0,
        resultlist: [],
        resultperson: {}
    },
    mutations: {
        [mutations.RESULT_PERSON](state, payload) {
            state.resultperson = payload.data
        },
        [mutations.RESULT_LIST](state, payload) {
            state.resulttotal = payload.count
            for (var i in payload.data) {
                if ( payload.data[i].attachFlag == 1 || payload.data[i].attachFlag == 3 ) {
                    payload.data[i]._disabled = true
                }
            }
            state.resultlist = payload.data
        },
        [mutations.APPROVAL_LIST](state, payload) {
            state.resulttotal = payload.count
            state.resultlist = payload.data
        }
    },
    actions: {
        [actions.get.RESULT_LIST]({commit}, payload) {
            let link = `/customer/creditdetail/facetalklist?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&accountId=${payload.accountId}`
            if ('customerName' in payload) link += '&customerName=' + payload.customerName
            if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
            if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
            if ('attachFlag' in payload) link += payload.attachFlag == 3 ? ('&attachFlag=' + payload.attachFlag) : (payload.attachFlag == 4 ? '' : '&attachFlag=0')
            return axios.get(link).then(({data}) => {
                commit(mutations.RESULT_LIST, data)
                return data
            })
        },
        [actions.post.RESULT_PERSON](context, payload) {
            return axios.post('/customer/creditdetail', qs.stringify(payload))
        },
        [actions.delete.RESULT_PERSON](context, id) {
            return axios.delete('customer/creditdetail/' + id)
        },
        [actions.get.PREVIEW_PERSON]({commit}, idNumber) {
            return axios.get('/customer/info/idnumber/' + idNumber).then(({data}) => {
                return data
            })
        },
        [actions.post.APPROVAL_RECORD]({commit}, list) {
            return axios.post('/customer/creditapproval', list)
        },
        [actions.get.APPROVAL_RECORD]({commit}, idNumber) {
            return axios.get('/customer/creditapproval/' + idNumber)
        },
        [actions.get.APPROVAL_LIST]({commit}, payload) {
            let link = `/customer/creditdetail/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&status=${payload.status}&roleId=${payload.roleId}&orgCode=${payload.orgCode}&accountId=${payload.accountId}`
            if ('customerName' in payload) link += '&customerName=' + payload.customerName
            if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
            if (null != payload.gridCode) link += '&gridCode=' + payload.gridCode
            if ('attachFlag' in payload) link += payload.attachFlag == 3 ? ('&attachFlag=' + payload.attachFlag) : (payload.attachFlag == 4 ? '' : '&attachFlag=0')
            return axios.get(link).then(({data}) => {
                commit(mutations.APPROVAL_LIST, data)
                return data
            })

        },
        [actions.get.CREDIT_LIST]({commit}, ids) {//获取审批报表信息
            return axios.get('/customer/creditapproval/report/' + ids)
        }
    }
}
