import { createWebHistory, createRouter } from "vue-router"
import Index from '@/views/Index'
import Spectator from '@/views/Spectator'
import Intro from '@/views/Intro'
import Main from '@/views/MainRoom'
import DataPage from '@/views/DataPage'
import Archive from '@/views/Archive'
import SinglePlay from '@/views/SinglePlay'
import CharacterSheet from '@/views/CharacterSheet'
import CharacterTree from '@/views/CharacterTree'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/watch',
    name: 'spectator',
    component: Spectator
  },
  {
    path: '/signin',
    name: 'intro',
    component: Intro
  },
  {
    path: '/character',
    name: 'characterSheet',
    component: CharacterSheet,
    children: [
      {
        path: '/',
        name: 'characterName',
        component: CharacterSheet
      },
      {
        path: ':ident',
        name: 'charQuestion',
        component: CharacterTree
    }]
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/dataprotectionnotice',
    name: 'datapage',
    component: DataPage
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/play/:id',
    name: 'singlePlay',
    component: SinglePlay
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
