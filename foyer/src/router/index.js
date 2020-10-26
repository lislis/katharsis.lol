import { createWebHistory, createRouter } from "vue-router"
import Intro from '@/views/Intro'
import Room from '@/views/Room'

const routes = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  {
    path: '/room',
    name: 'room',
    component: Room
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
