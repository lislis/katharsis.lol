//import Vue from 'vue'
//import Vuex from 'vuex'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import BootstrapVue from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueChatScroll from 'vue-chat-scroll'

createApp(App)
    .use(router)
    .use(VueChatScroll)
  //  .use(BootstrapVue)
    .mount('#app')
