<template>
  <div>
    <h2>
      Chat Room
      <button @click="logout()">logout</button>
    </h2>
    <div v-for="(item, index) in chats" class="chat" v-chat-scroll>
      <div v-if="item.nickname === nickname">
        <img src="http://placehold.it/50/55C1E7/fff&text=ME" width="75" height="75" alt="img" />
        <strong class="primary-font">{{ item.nickname }}</strong>
        <span class="glyphicon glyphicon-time"></span>{{ item.created_date }}
        <p>{{ item.message }}</p>
      </div>
      <div v-else>
        <img src="http://placehold.it/50/55C1E7/fff&text=U" width="75" height="75" alt="img" />
        <strong class="primary-font">{{ item.nickname }}</strong>
        <span class="glyphicon glyphicon-time"></span>{{ item.created_date }}
        <p>{{ item.message }}</p>
      </div>
    </div>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>

    <form @submit="onSubmit" class="chat-form">
      <label>
        <input id="message" v-model.trim="chat.message">
        <button type="submit">Send</button>
      </label>
    </form>
  </div>
</template>

<script>
 import axios from 'axios'
 import * as io from 'socket.io-client'

 export default {
   name: 'ChatRoom',
   data () {
     return {
       chats: [],
       errors: [],
       nickname: this.$route.params.nickname,
       chat: {},
       socket: io('http://localhost:4000')
     }
   },
   created () {
     axios.get(`http://localhost:3000/api/chat/` + this.$route.params.id)
          .then(response => {
            this.chats = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })

     this.socket.on('new-message', function (data) {
       if(data.message.room === this.$route.params.id) {
         this.chats.push(data.message)
       }
     }.bind(this))
   },
   methods: {
     logout () {
       this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: this.chat.nickname + ' left this room', created_date: new Date() });
       this.$router.push({
         name: 'RoomList'
       })
     },
     onSubmit (evt) {
       evt.preventDefault()
       this.chat.room = this.$route.params.id
       this.chat.nickname = this.$route.params.nickname
       axios.post(`http://localhost:3000/api/chat`, this.chat)
                                .then(response => {
                                  this.socket.emit('save-message', response.data)
                                  this.chat.message = ''
                                })
                                .catch(e => {
                                  this.errors.push(e)
                                })
     }
   }
 }
</script>
