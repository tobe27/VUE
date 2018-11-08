import axios from '../../axios'
import actions from '../../action-types'

export default {
    state: {
    },
    mutations: {

    },
    actions: {
        [actions.get.OVER_VIEW]({commit}, payload) {
            let usr=JSON.parse(sessionStorage.getItem('userObj'))
            let roleId = usr.roles[0].roleId
            let role='/president'
            if(roleId==4){
                role='/president'
            }else if(roleId==5){
                role="/middle"
            }else if(payload.role==3){
                role="/basic"
            }
            let link = role + '/home/basicinfo'
            return axios.get(link).then(({ data }) => {
                return data
            })
        },
        [actions.get.HOME_INFORMATION]({commit}, payload) {
            let usr=JSON.parse(sessionStorage.getItem('userObj'))
            let roleId = usr.roles[0].roleId
            let role='/president'
            let amount=0
            if(roleId==4){
                role='/president'
                amount=5000000
            }else if(roleId==5){
                amount=1000000
                role="/middle"
            }else if(payload.role==3){
                amount=100000
                role="/basic"
            }
            let link = role + '/home/warn?pageNum=1&pageSize=8&amount='+amount
            if ('amountType' in payload) link += '&amountType=' + payload.amountType
            return axios.get(link).then(({ data }) => {
                return data
            })
        },
        [actions.get.STATISTICS_CHART]({commit}, payload) {
            let usr=JSON.parse(sessionStorage.getItem('userObj'))
            let roleId = usr.roles[0].roleId
            let role='/president'
            if(roleId==4){
                role='/president'
            }else if(roleId==5){
                role="/middle"
            }else if(payload.role==3){
                role="/basic"
            }
            let link = role + '/home/statistics?orgCode='+ usr.orgCode
            if ('amountType' in payload) link += '&amountType=' + payload.amountType
            // if ('time' in payload) link += '&time=' + payload.time+''
            if ('timeType' in payload) link += '&timeType=' + payload.timeType
            return axios.get(link).then(({ data }) => {
                return data
            })
        },
        [actions.get.RANKING]({commit}, payload) {
            let usr=JSON.parse(sessionStorage.getItem('userObj'))
            let roleId = usr.roles[0].roleId
            let role='/president'
            if(roleId==4){
                role='/president'
            }else if(roleId==5){
                role="/middle"
            }else if(payload.role==3){
                role="/basic"
            }
            let type='/branchinfosort'
            if(type==1){
                type='/accountinfosort'
            }
            let link = role + '/home' + type + '?sortType='+payload.sortType
            return axios.get(link).then(({ data }) => {
                return data
            })
        },
    }
}
