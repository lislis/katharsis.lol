<template>
  <div id="chat">
    <h2>{{username}}</h2>
    <div>
      <h4>Foyer chat <span>{{connections}} online</span></h4>
    </div>
    <div>
      <ul class="">
        <li
          :class="[{'center': !message.user}, { 'right': message.user == $root.$data.user._id}]"
          v-for="message in messages"
          :key="message.message">
          <template v-if="message.user">
            <span>{{message.user}} sagt: </span><br>
          </template>
          <span>
            {{message.message}}
            <br>
            <small>:{{message.created_date}}</small>
          </span>
        </li>
      </ul>

      <div class="card-body">
        <form @submit.prevent="send">
          <div class="form-group">
            <input type="text" class="form-control" v-model.trim="chat.message"
                   placeholder="Enter message here">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
 import io from 'socket.io-client'
 import axios from 'axios'

 export default {
   name: 'Chat',
   props: ['messages', 'username', 'connections'],
   data() {
     return {
       newMessage: null,
       chat: {}
     }
   },
   created() {
   },
   methods: {
     send(evt) {
       evt.preventDefault()
       this.chat.room = this.$route.params.roomid
       this.chat.user = this.$root.$data.user._id
       axios.post(`http://${this.$root.$data.restServer}/api/chat`, this.chat)
                            .then(response => {
                              this.$root.$data.socket.emit('save-message', response.data)
                              this.chat.message = ''
                            })
                            .catch(e => {
                              this.errors.push(e)
                            })
     }
   }
 }
</script>

<style>
 #chat {
   background-color: lightgrey;
   flex: 1 0 50vw
 }
 .center {
   text-align: center;
 }
 .right {
   text-align: right;
 }
</style>
