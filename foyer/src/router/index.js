import { createWebHistory, createRouter } from "vue-router"
import Index from '@/views/Index'
import Intro from '@/views/Intro'
import Main from '@/views/MainRoom'
import Room from '@/views/Room'
import RoomList from '@/views/RoomList'
import PeopleList from '@/views/PeopleList'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/signin',
    name: 'intro',
    component: Intro
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/peoplelist/',
    name: 'peoplelist',
    component: PeopleList
  },
  {
    path: '/roomlist',
    name: 'roomlist',
    component: RoomList
  },
  {
    path: '/room/:roomid',
    name: 'room',
    component: Room
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
