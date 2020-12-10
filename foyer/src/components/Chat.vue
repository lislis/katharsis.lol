<template>
  <div class="chat">
    <div class="chat__room-header">
      <h4>
        {{ room.room_name}}
        <span v-if="room.private" class="chat__room-status">(private)</span>
      </h4>
      <hr>
    </div>
    <div class="chat__message_container">
      <ul class="chat__messages">
        <ChatBubble v-for="message in messages"
                    :message="message"
                    :key="message.message" />
      </ul>
      <div>
        <form @submit.prevent="send">
          <div class="chat__message-compose">
            <input type="text"
                   class="form-control"
                   v-model.trim="chat.message"
                   placeholder="Schreibe etwas"
                   :readonly="room.locked">
            <button title="Send" :disabled="room.locked">🛩</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
 import io from 'socket.io-client'
 import axios from 'axios'
 import ChatBubble from '@/components/ChatBubble.vue'

 export default {
   name: 'Chat',
   props: ['messages', 'username', 'connections', 'room'],
   components: { ChatBubble },
   data() {
     return {
       newMessage: null,
       chat: {}
     }
   },
   watch: {
     '$root.$data.otherPeople': {
       handler() {
       }
     }
   },
   created() {
     this.$root.$data.socket.on('new-user', function (data) {
       this.$root.$data.otherPeople.push(data.message)
     }.bind(this))

     this.$root.$data.socket.on('delete-user', function (data) {
       this.removeByAttr(this.$root.$data.otherPeople, '_id', data.message._id)
     }.bind(this))

   },
   methods: {
     send(evt) {
       evt.preventDefault()
       if (this.chat.message == "") return false;
       this.chat.room = this.room._id
       this.chat.user = this.$root.$data.user._id
       axios.post(`${this.$root.$data.restServer}/api/chat`, this.chat)
                            .then(response => {
                              this.$root.$data.socket.emit('save-message', response.data)
                              this.chat.message = ''
                            })
                            .catch(e => {
                              this.errors.push(e)
                            })
     },
     removeByAttr(arr, attr, value) {
       var i = arr.length;
       while(i--){
         if( arr[i]
          && arr[i].hasOwnProperty(attr)
          && (arguments.length > 2 && arr[i][attr] === value)) {
           arr.splice(i,1);
         }
       }
       return arr;
     }
   }
 }
</script>

<style>
 .chat {
   width: 100%;
 }
 .chat__messages {
   list-style: none;
   margin: 0;
   padding: 0;
   height: 70vh;
   overflow-y: scroll;
 }
 .chat__message-compose {
   max-width: 800px;
   margin: auto;
   display: flex;
 }
 .chat__message-compose input {
   display: block;
   width: 100%;
   padding: 1rem;
 }
 input[readonly],
 button[disabled] {
   opacity: 0.5;
   cursor: not-allowed;
 }
</style>
