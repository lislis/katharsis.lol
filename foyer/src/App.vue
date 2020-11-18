<template>
  <div class="app">
    <header class="header" v-if="user.nickname">
      <p><strong>{{ user.nickname }}</strong></p>
      <button @click="logout">Logout</button>
    </header>
    <div class="navigation">
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
     this.loadUserFromStorage()
   },
   methods: {
     getMainRoom() {
       axios.get(`http://${this.restServer}/api/room/main`)
            .then(response => {
              this.stage = response.data.filter(x => x.locked)[0]
              this.mainRoom = response.data.filter(x => !x.locked)[0]

            })
            .catch(e => { console.log(e) })
     },
     setSocketServer() {
       if (process.env.NODE_ENV === 'production') {
         this.socketServer = `${process.env.VUE_APP_WS_HOST}`
         this.restServer = `${process.env.VUE_APP_API_HOST}`
       } else {
         this.socketServer = `${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`
         this.restServer = `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
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
       axios.delete(`http://${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`)
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
