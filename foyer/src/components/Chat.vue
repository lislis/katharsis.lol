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
      <ChatComposer :room="room" />
    </div>
  </div>
</template>

<script>
 import io from 'socket.io-client'
 import axios from 'axios'
 import {removeByAttr} from '@/lib/utils'
 import ChatBubble from '@/components/ChatBubble.vue'
 import ChatComposer from '@/components/ChatComposer.vue'

 export default {
   name: 'Chat',
   props: ['messages', 'username', 'connections', 'room'],
   components: { ChatBubble, ChatComposer },
   created() {
   },
   methods: {
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
</style>
