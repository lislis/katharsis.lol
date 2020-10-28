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
       socket: io(this.$root.$data.socketServer)
     }
   },
   created() {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     // get main room and ...
     axios.get(`http://${this.$root.$data.restServer}/api/room/main`)
          .then(response => {
            console.log(reponse[0])
            this.$root.$data.mainRoom = response[0];
            this.chat.room = response[0]._id;
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
          })
          .catch(e => { this.errors.push(e)})

     // keep for later
     this.socket.on('state', (data) => {
       this.players = data
     })
   },
   methods: {
     updatePlayerTarget(data) {
       console.log(data)
       this.socket.emit('updatePlayerTarget', {clientX: data.x, clientY: data.y})
     },
     logout() {
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
