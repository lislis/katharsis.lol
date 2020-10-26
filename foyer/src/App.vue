<template>
  <div class="app">
    <Room1
      :players="players"
      :username="username"
      v-on:update-player-target="updatePlayerTarget" />
    <Chat
          :messages="messages"
          :connections="connections"
          :username="username"
          :ready="ready"
          :info="info"
          v-on:send-message="send"
          v-on:add-user="addUser"/>
  </div>
</template>

<script>
 import Chat from './components/Chat.vue'
 import Room1 from './components/Room1.vue'
 import io from 'socket.io-client'
 if (process.env.NODE_ENV === 'production') {
   const socket = io(`${process.env.VUE_APP_WS_HOST}`)
 } else {
   const socket = io(`${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`)
 }


 export default {
   name: 'App',
   components: {
     Chat,
     Room1
   },
   data() {
     return {
       players: {},
       newMessage: null,
       messages: [],
       typing: false,
       username: null,
       ready: false,
       info: [],
       connections: 0,
     }
   },
   created() {
     window.onbeforeunload = () => {
       socket.emit('leave', this.username);
     }

     socket.emit('newPlayer');

     socket.on('chat-message', (data) => {
       //debugger
       this.messages.push({
         message: data.message,
         type: 1,
         user: data.user,
       });
     });

     socket.on('typing', (data) => {
       this.typing = data;
     });

     socket.on('stopTyping', () => {
       this.typing = false;
     });

     socket.on('joined', (data) => {
       this.info.push({
         username: data,
         type: 'joined'
       });

       setTimeout(() => {
         this.info = [];
       }, 5000);
     });

     socket.on('leave', (data) => {
       this.info.push({
         username: data,
         type: 'left'
       });

       setTimeout(() => {
         this.info = [];
       }, 5000);
     });

     socket.on('connections', (data) => {
       this.connections = data;
     });

     socket.on('state', (data) => {
       //console.log(data)
       this.players = data
     })
   },
   watch: {
     newMessage(value) {
       value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
     }
   },
   methods: {
     send(data) {
       this.messages.push({
         message: data,
         type: 0,
         user: 'Me',
       });

       socket.emit('chat-message', {
         message: data,
         user: this.username
       });
     },
     addUser(data) {
       this.ready = true;
       this.username = data
       socket.emit('joined', data)
     },
     updatePlayerTarget(data) {
       //debugger
       console.log(data)
       socket.emit('updatePlayerTarget', {clientX: data.x, clientY: data.y})
     }
   }
 }
</script>

<style>
 body {
   margin: 0
 }
 .app {
   display: flex
 }
</style>
