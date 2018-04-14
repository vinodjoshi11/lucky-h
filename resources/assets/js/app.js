 /**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */ 
require('./bootstrap');
 
var $ = require('jquery');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */   
import Vue from 'vue'
import App from './components/App.vue'
import router from './router/index.js'
import store from './utils/store'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import 'vuetify/dist/vuetify.min.css' // This line here
 Vue.use(Vuetify)
 const options = {
  color: '#2196f3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.5s',
    termination: 400
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
 Vue.use(Vuetify, {
     theme: {
         primary: '#3f51b5',
         secondary: '#b0bec5',
         accent: '#8c9eff',
         error: '#b71c1c'
     }
 });
Vue.use(options)
Vue.use(Vuelidate)
Vue.config.productionTip = false
 window.Store = store
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
