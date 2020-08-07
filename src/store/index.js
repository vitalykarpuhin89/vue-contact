import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import contact from './contact'
Vue.use(Vuex)

export default new Vuex.Store({
    getters: {
        error: s => s.error
    },
    modules: [
        auth,
        info,
        contact
    ]
})