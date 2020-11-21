import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import msgPlugin from '@/utils/msg.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(msgPlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader) //глобальная регистрация


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAP0yZvhIfJhvn--gNmprYYuyQv7qjAVhc",
  authDomain: "example-vue-crm.firebaseapp.com",
  databaseURL: "https://example-vue-crm.firebaseio.com",
  projectId: "example-vue-crm",
  storageBucket: "example-vue-crm.appspot.com",
  messagingSenderId: "287173384731",
  appId: "1:287173384731:web:60981f41e046dfbd4bb6be"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
