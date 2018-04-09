import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {shared}
})
