import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyDQQCsp7oaLUyN_C8iiz7DS_2Crj4bC2UY",
  authDomain: "vue-contacts-98436.firebaseapp.com",
  databaseURL: "https://vue-contacts-98436.firebaseio.com",
  projectId: "vue-contacts-98436",
  storageBucket: "vue-contacts-98436.appspot.com",
  messagingSenderId: "951014622867",
  appId: "1:951014622867:web:beac35b293a4fbdfc06f66"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


