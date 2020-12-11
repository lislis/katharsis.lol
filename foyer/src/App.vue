<template>
  <div class="app">
    <header class="header" v-if="user.nickname">
      <p>Katharsis.lol</p>
      <UserPanel />
    </header>
    <div class="navigation" v-if="user.nickname">
      <router-link :to="{name: 'main'}">Main</router-link>
      <router-link :to="{name: 'roomlist'}">Räume</router-link>
      <router-link :to="{name: 'peoplelist'}">Leute</router-link></div>
    <main>
      <router-view />
    </main>
    <footer><p>Katharsis.lol by <a href="http://www.sternapau.de/" target="_blank">sterna | pau</a></p></footer>
  </div>
</template>

<script>
 import axios from 'axios'
 import io from 'socket.io-client'
 import UserPanel from '@/components/UserPanel'
 import Loader from '@/components/Loader'
 import { removeByAttr } from '@/lib/utils'
 import { loadUserFromStorage } from '@/lib/storage'

 export default {
   name: 'App',
   components: {
     Loader,
     UserPanel
   },
   data() {
     return {
       user: {},
       otherPeople: [],
       mainRoom: {},
       stage: {},
       chats: [],
       restServer: null,
       socketServer: null,
       botBrain: null,
       socket: null,
       storagePrefix: null
     }
   },
   created() {
     this.setSocketServer()
     this.connectToSocket()
     this.getMainRoom()
     this.getAllPeople()
     this.user = loadUserFromStorage()

     this.$root.$data.socket.on('new-user', function (data) {
       this.$root.$data.otherPeople.push(data.message)
     }.bind(this))

     this.$root.$data.socket.on('delete-user', function (data) {
       removeByAttr(this.$root.$data.otherPeople, '_id', data.message._id)
     }.bind(this))

   },
   methods: {
     getMainRoom() {
       axios.get(`${this.restServer}/api/room/main`)
            .then(response => {
              this.$root.$data.stage = response.data.filter(x => x.locked)[0]
              this.$root.$data.mainRoom = response.data.filter(x => !x.locked)[0]
            })
            .catch(e => { console.log(e) })
     },
     getAllPeople() {
       axios.get(`${this.restServer}/api/user`)
            .then(response => {
              this.otherPeople = response.data
            })
            .catch(e => { console.log(e) })
     },
     setSocketServer() {
       if (process.env.NODE_ENV === 'production') {
         this.socketServer = `https://${process.env.VUE_APP_WS_HOST}`
         this.restServer = `https://${process.env.VUE_APP_API_HOST}`
         this.botBrain = `https://${process.env.VUE_APP_BOTBRAIN}`
       } else {
         this.socketServer = `http://${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`
         this.restServer = `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
         this.botBrain = `http://${process.env.VUE_APP_BOTBRAIN}:${process.env.VUE_APP_BOTBRAIN_PORT}`
       }
     },
     connectToSocket() {
       this.socket = io(this.socketServer)
     }
   }
 }
</script>

<style>
 body {
   overflow: hidden;
 }
 .header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 1rem;
   background-color: #88b378;
 }
 .navigation {
   display: flex;
 }
 .navigation a:first-of-type {
   flex-grow: 1;
 }

 .navigation a {
   display: inline-block;
   margin-right: 1rem;
   padding: 1rem;
 }

 .router-link-active {
   background-color: lightgrey;
 }
 main {
   background-color: lightgrey;
 }
 h2 {
   margin-top: 0;
 }

</style>
