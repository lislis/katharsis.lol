<template>
  <div class="room-view">
    <Chat
      :messages="messages"
      :connections="connections"
      :username="$root.$data.user.nickname" />

    <button @click="logout">Theater verlassen</button>
  </div>
</template>
<script>
 import Chat from '@/components/Chat.vue'
 //import Room1 from '@/components/Room1.vue'
 import io from 'socket.io-client'
 import axios from 'axios'


 export default {
   name: "Room",
   components: {
     Chat,
   //  Room1
   },
   data() {
     return {
       players: {},
       messages: [],
       connections: 0,
       chat: {},
       errors: [],
       socket: null
     }
   },
   created() {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     this.socket = io(this.$root.$data.socketServer)

     this.chat.room = this.$route.params.roomid;
     this.chat.nickname = this.$root.$data.user._id
     this.chat.message = `${this.$root.$data.user.nickname} ist eingetreten`

     //... join it
     axios.post(`http://${this.$root.$data.restServer}/api/chat`, this.chat)
          .then(response => {
            this.socket.emit('save-message', {
              room: this.chat.room,
              nickname: this.chat.nickname,
              message: this.chat.message,
              created_date: new Date()
            })
            // this should probably also announce new player
            //this.socket.emit('newPlayer');
          })
          .catch(e => { this.errors.push(e) })

     //... get history
     axios.get(`http://${this.$root.$data.restServer}/api/chat/${this.$route.params.roomid}`)
          .then(response => {
            console.log(response)
            this.messages = response
          })
          .catch(e => { console.log(e) })

     // keep for later
     //this.socket.on('state', (data) => {
     //  this.players = data
     //})
   },
   methods: {
     updatePlayerTarget(data) {
       console.log(data)
       this.socket.emit('updatePlayerTarget', {clientX: data.x, clientY: data.y})
     },
     logout() {
       window.localStorage.removeItem(`${process.env.VUE_APP_LS_PREFIX}user`)

       axios.delete(`http://${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`)
            .then(response => {
              this.socket.emit('save-message', {
                room: this.$root.$data.mainRoom._id,
                nickname: this.$root.$data.user._id,
                message: this.$root.$data.user.nickname + ' hat das Theater verlasssen.',
                created_date: new Date()
              })
              this.$root.$data.user = {}
              this.$router.push({
                name: 'intro'
              })
            })
     }
   }
 }
</script>
<style>
 body {
   margin: 0
 }
 .room-view {
   display: flex
 }
</style>
