import { createWebHistory, createRouter } from "vue-router"
import Intro from '@/views/Intro'
import Room from '@/views/Room'
import RoomList from '@/views/RoomList'
import AddRoom from '@/views/AddRoom'
import JoinRoom from '@/views/JoinRoom'
import ChatRoom from '@/views/ChatRoom'

const routes = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  //{
  //  path: '/peoplelist/:roomid',
  //  name: 'PeopleList',
  //  component: PeopleList
  //},
  {
    path: '/roomlist',
    name: 'RoomList',
    component: RoomList
  },
  {
    path: '/addroom',
    name: 'AddRoom',
    component: AddRoom
  },
  {
    path: '/joinroom/:id',
    name: 'JoinRoom',
    component: JoinRoom
  },
  {
    path: '/chatroom/:id/:nickname',
    name: 'ChatRoom',
    component: ChatRoom
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
