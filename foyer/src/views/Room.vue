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
       errors: []
     }
   },
   created() {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

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


     //... get history
     axios.get(`http://${this.$root.$data.restServer}/api/chat/${this.$route.params.roomid}`)
          .then(response => {
            this.messages = response.data
          })
          .catch(e => { console.log(e) })

     axios.get(`http://${this.$root.$data.restServer}/api/user/`)
         .then(response => {
           this.connections = response.data.length
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
       this.$root.$data.socket.emit('updatePlayerTarget', {clientX: data.x, clientY: data.y})
     },
     logout() {
       window.localStorage.removeItem(`${process.env.VUE_APP_LS_PREFIX}user`)
       let self = this
       axios.delete(`http://${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`)
             .then(response => {
               //debugger
              self.$root.$data.socket.emit('save-message', {
                room: self.$route.params.roomid,
                nickname: self.$root.$data.user._id,
                message: self.$root.$data.user.nickname + ' hat das Theater verlasssen.',
                created_date: new Date()
              })
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
 body {
   margin: 0
 }
 .room-view {
   display: flex
 }
</style>
