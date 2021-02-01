//import Vue from 'vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import { messages } from './i18n'


const i18n = createI18n({
    locale: 'de', // set locale
    fallbackLocale: 'de', // set fallback locale
    messages
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
