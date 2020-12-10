<template>
  <div class="app">
    <header class="header" v-if="user.nickname">
      <p>Katharsis.lol</p>
      <div>
        <span>{{ user.nickname }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>
    <div class="navigation" v-if="user.nickname">
      <router-link :to="{name: 'main'}">Main</router-link>
      <router-link :to="{name: 'roomlist'}">Räume</router-link>
      <router-link :to="{name: 'peoplelist'}">Leute</router-link></div>
    <main>
      <router-view />
    </main>
    <footer><p>Call me by any name</p></footer>
  </div>
</template>

<script>
 import axios from 'axios'
 import io from 'socket.io-client'
 import Loader from '@/components/Loader'

 export default {
   name: 'App',
   components: {
     Loader
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
     }
   },
   created() {
     this.setSocketServer()
     this.connectToSocket()
     this.getMainRoom()
     this.getAllPeople()
     this.loadUserFromStorage()
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
       //setInterval(() => {}, 5000)
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
     loadUserFromStorage() {
       if (window.localStorage.getItem(`${process.env.VUE_APP_LS_PREFIX}user`)) {
         this.user = JSON.parse(window.localStorage.getItem(`${process.env.VUE_APP_LS_PREFIX}user`))
       }
     },
     connectToSocket() {
       this.socket = io(this.socketServer)
     },
     logout() {
       let self = this
       axios.delete(`${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`)
            .then(response => {

              let chat = {}
              chat.room = this.$root.$data.mainRoom._id;
              chat.nickname = this.$root.$data.user._id
              chat.message = `${this.$root.$data.user.nickname} ist ausgetreten`

              axios.post(`${this.$root.$data.restServer}/api/chat`, chat)
                    .then(response => {
                      self.$root.$data.socket.emit('save-message', {
                        ...chat,
                        created_date: new Date()
                      })
                      self.$root.$data.socket.emit('remove-user', self.$root.$data.user)

                      self.$root.$data.user = {}
                      window.localStorage.removeItem(`${process.env.VUE_APP_LS_PREFIX}user`)

                      self.$router.push({
                        name: 'intro'
                      })
                    })
                    .catch(e => { this.errors.push(e) })
            })
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
   background-color: lime;
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
