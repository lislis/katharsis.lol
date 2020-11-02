<template>
  <div id="chat">
    <div>
      <h4>Foyer chat <span>{{connections}} online</span></h4>
    </div>
    <div>
      <ul class="messages">
        <li class="message"
            :class="[{'center no-bubble': !message.user}, { 'right': message.user == $root.$data.user._id}]"
          v-for="message in messages"
          :key="message.message">
          <div class="message--bubble" >
            <template v-if="message.user">
              <span>{{message.user}} sagt: </span><br>
            </template>
            <span>
              {{message.message}}
              <br>
              <small>:{{message.created_date}}</small>
            </span>
          </div>
        </li>
      </ul>

      <div>
        <form @submit.prevent="send">
          <div  class="message--compose">
            <input type="text"
                   class="form-control"
                   v-model.trim="chat.message"
                   placeholder="Schreibe etwas">
            <button title="Send">🛩</button>
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
 .messages {
   list-style: none;
   margin: 0;
   padding: 0;
 }
 .message {
   margin-bottom: 1rem;
 }
 .message:not(.no-bubble) .message--bubble {
   background-color: lime;
   display: inline-block;
   padding: .3rem;
   border-radius: 4px;
 }

 .no-bubble .message--bubble {
   opacity: 0.7;
 }

 .message--compose {
   max-width: 800px;
   margin: auto;
   display: flex;
 }
 .message--compose input {
   display: block;
   width: 100%;
   padding: 1rem;
 }
</style>
