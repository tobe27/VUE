import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

import qs from 'qs'

export default {
    state: {
        total: 0,
        list: [],
        person: {},
    },
    mutations: {
        [ mutations.REGION_PERSON ] (state, payload) {
            state.person = payload.data
        },
        [ mutations.REGION_LIST ] (state, payload) {
            state.total = payload.count
            state.list = payload.data
        }
    },
    actions: {
        [ actions.get.REGION_PERSON ] ({ commit }, id) {
            return axios.get('/super/region/' + (id==''?1:id)).then(({ data }) => {
                commit(mutations.REGION_PERSON, data)
            return data
        })
        },
        [ actions.post.REGION_PERSON ] (context, payload) {
            return axios.post('/super/region', qs.stringify(payload))
        },
        [ actions.put.REGION_PERSON ] (context, payload) {
            return axios.put('/super/region/' + payload.id, qs.stringify(payload))
        },
        [ actions.delete.REGION_PERSON ] (context, id) {
            return axios.delete('/super/region/' + id)
        }
    }
}
