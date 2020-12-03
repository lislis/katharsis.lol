<template>
  <div class="app">
    <header class="header" v-if="user.nickname">
      <p><strong>{{ user.nickname }}</strong></p>
      <button @click="logout">Logout</button>
    </header>
    <div class="navigation" v-if="user.nickname">
      <router-link :to="{name: 'room', params: { roomid: this.stage._id}}">{{ stage.room_name }}</router-link>
      <router-link :to="{name: 'room', params: { roomid: this.mainRoom._id}}">{{ mainRoom.room_name }}</router-link>
      <router-link :to="{name: 'roomlist'}">Räume</router-link>
      <router-link :to="{name: 'peoplelist'}">Leute</router-link></div>
    <router-view />
    <footer><p>Call me by any name</p></footer>
  </div>
</template>

<script>
 import axios from 'axios'
 import io from 'socket.io-client'

 export default {
   name: 'App',
   data() {
     return {
       username: 'test',
       user: {},
       otherPeople: [],
       mainRoom: {},
       stage: {},
       chats: [],
       restServer: null,
       socketServer: null,
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
       //debugger
       console.log(`${this.restServer}/api/room/main`)
       axios.get(`${this.restServer}/api/room/main`)
              .then(response => {
                console.log(response);
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
         this.socketServer = `http://${process.env.VUE_APP_WS_HOST}`
         this.restServer = `http://${process.env.VUE_APP_API_HOST}`
       } else {
         this.socketServer = `http://${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`
         this.restServer = `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
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
       window.localStorage.removeItem(`${process.env.VUE_APP_LS_PREFIX}user`)
       let self = this
       axios.delete(`${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`)
            .then(response => {
              self.$root.$data.socket.emit('save-message', {
                room: self.$route.params.roomid,
                nickname: self.$root.$data.user._id,
                message: self.$root.$data.user.nickname + ' ist ausgetreten.',
                created_date: new Date()
              })
              self.$root.$data.socket.emit('remove-user', self.$root.$data.user)

              self.$root.$data.user = {}
              self.$router.push({
                name: 'intro'
              })
            })
     }
   }
 }
</script>

<style>
 .header {
   display: flex;
   justify-content: space-between;
   padding: 0 1rem;
   background-color: pink;
 }
 .navigation {
   padding: 1rem
 }

 .navigation a {
   display: inline-block;
   margin-right: 1rem;
 }
</style>
