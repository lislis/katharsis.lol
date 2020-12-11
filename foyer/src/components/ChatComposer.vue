<template>
  <div>
    <form @submit.prevent="send">
      <div class="chat__message-compose">
        <input type="text"
               class="form-control"
               v-model.trim="chat.message"
               placeholder="Schreibe etwas"
               :readonly="!canWrite">
        <button title="Send" :disabled="!canWrite">🛩</button>
      </div>
    </form>
  </div>
</template>
<script>
 import axios from 'axios'

 export default {
   name: 'ChatComposer',
   props: ['room'],
   data() {
     return {
       chat: {},
       error: [],
     }
   },
   methods: {
     send(evt) {
       evt.preventDefault()
       if (!this.canWrite) return false;
       if (this.chat.message == "") return false;

       this.chat.room = this.room._id;
       this.chat.user = this.$root.$data.user._id;
       axios
         .post(`${this.$root.$data.restServer}/api/chat`, this.chat)
         .then(response => {
           this.$root.$data.socket.emit('save-message', response.data)
           this.chat.message = ''
         })
         .catch(e => {
           console.log(e)
           this.errors.push(e)
         })
     },
   },
   computed: {
     canWrite() {
       if (this.room.locked) {
         if (this.$root.$data.user.hasPermission) {
           return true
         } else {
           return false
         }
       } else {
         return true
       }
     }
   }
 }
</script>
<style>
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
