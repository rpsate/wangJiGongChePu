import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Directives from '@/directives'

import '@/assets/styles/reset.scss'


let mainApp = createApp(App)
mainApp.use(router)
mainApp.use(Directives)
mainApp.mount('#app')
