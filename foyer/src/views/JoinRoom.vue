<template>
  <div>
    <h2>
      Join Room
      <router-link to="/">(Room List)</router-link>
    </h2>
    <form @submit="onSubmit">
      <label>Enter Nickname
        <input id="nickname" v-model.trim="chat.nickname">
      </label>
      <button type="submit">Join</button>
    </form>
  </div>
</template>

<script>
 import * as io from 'socket.io-client'
 import axios from 'axios'

 export default {
   name: 'JoinRoom',
   data () {
     return {
       chat: {},
       socket: io('http://localhost:4000')
     }
   },
   methods: {
     onSubmit (evt) {
       evt.preventDefault()
       this.chat.room = this.$route.params.id
       this.chat.message = this.chat.nickname + ' join the room'
       axios.post(`http://localhost:3000/api/chat`, this.chat)
            .then(response => {
              this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: 'Join this room', created_date: new Date() });
              this.$router.push({
                name: 'ChatRoom',
                params: { id: this.$route.params.id, nickname: response.data.nickname }
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
     }
   }
 }
</script>
