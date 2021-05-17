import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'token'
export default new Vuex.Store({
  state: {
    userToken: getItem(TOKEN_KEY)
  },
  mutations: {
    setUserToken (state, token) {
      state.userToken = token
      setItem(TOKEN_KEY, state.userToken)
    }
  },
  actions: {},
  modules: {}
})
