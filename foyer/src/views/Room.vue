<template>
  <div class="room-view">
    <Chat
      :messages="messages"
      :connections="connections"
      :username="$root.$data.user.nickname"
      :room="room" />
  </div>
</template>
<script>
 import Chat from '@/components/Chat.vue'
 //import Room1 from '@/components/Room1.vue'
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
       room: {}
     }
   },
   watch: {
     '$route.params.roomid': {
       handler(roomid) {
         if (roomid !== undefined) {
           this.getChatHistory()
         }
       }
     }
   },
   created() {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     //... get history
     this.getChatHistory()

     this.$root.$data.socket.on('new-message', function (data) {
       if(data.message.room === this.$route.params.roomid) {
         this.messages.push(data.message)
       }
     }.bind(this))

     this.$root.$data.socket.on('users-increment', function (data) {
       this.connections += 1
     }.bind(this))

     this.$root.$data.socket.on('users-decrement', function (data) {
       this.connections -= 1
     }.bind(this))

     axios.get(`${this.$root.$data.restServer}/api/user/`)
         .then(response => {
           //debugger
           this.connections = response.data.length
         })
         .catch(e => { console.log(e) })

     // keep for later
     //this.socket.on('state', (data) => {
     //  this.players = data
     //})
   },
   methods: {
     getChatHistory() {
       axios.get(`${this.$root.$data.restServer}/api/chat/${this.$route.params.roomid}`)
            .then(response => {
              this.messages = response.data
            })
            .catch(e => { console.log(e) })

       // ideally this would be blocking
       axios.get(`${this.$root.$data.restServer}/api/room/${this.$route.params.roomid}`)
            .then(response => {
              //debugger
              this.room = response.data

              if (this.room.private && !this.room.allowed_users.includes(this.$root.user._id)) {
                console.log('not allowed in room')
                this.$router.push({name: 'roomlist'})
              }
            })
            .catch(e => { console.log(e) })
     },
     updatePlayerTarget(data) {
       console.log(data)
       this.$root.$data.socket.emit('updatePlayerTarget', {clientX: data.x, clientY: data.y})
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
