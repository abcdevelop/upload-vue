// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import {store} from './store'
import App from './App'

import UploadImage from './components/UploadImage.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-upload-image', UploadImage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>',
  created() {
    firebase.initializeApp({
    })
  }
})
