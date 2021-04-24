import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyBRU-Jzlz9s5iVDVmxFu_csxl-tsu5Ps50",
  authDomain: "card-race.firebaseapp.com",
  projectId: "card-race",
  storageBucket: "card-race.appspot.com",
  messagingSenderId: "97731617444",
  appId: "1:97731617444:web:b037ec3505359f9a25fc31",
  measurementId: "G-MPQ2ET6Y6H"
};

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
