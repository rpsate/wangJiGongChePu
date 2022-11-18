import { createRouter, createWebHashHistory } from 'vue-router'
import MainWinView from '../views/MainWinView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainWinView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
