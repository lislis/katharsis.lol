<template>
  <div>
    <form @submit.prevent="send">
      <div class="chat__message-compose">
        <input type="text"
               class="form-control"
               v-model.trim="chat.message"
               :placeholder="$t('ui.form.chat')"
               :readonly="!canWrite">
        <button class="btn"
          :title="$t('ui.button.send')"
          :aria-label="$t('ui.button.send')"
                :disabled="!canWrite">→</button>
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
       chat: {}
     }
   },
   methods: {
     send() {
       if (!this.canWrite) return false;
       if (!this.chat.message
           || this.chat.message === ""
           || this.chat.message === " ") return false;

       this.chat.room = this.room._id;
       this.chat.user = this.$root.$data.user._id;
       axios
         .post(`${this.$root.$data.restServer}/api/chat`, this.chat)
         .then(() => {
           this.chat.message = ''
         })
         .catch(e => {
           this.$root.$data.notifications.push(e)
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
<style scoped >
 .chat__message-compose {
   max-width: 800px;
   margin: auto;
   display: flex;
   border: 2px solid var(--bg-footer);
   border-radius: 4px;
   background-color: var(--bg-footer);
 }
 .chat__message-compose input {
   display: block;
   width: 100%;
   padding: .5rem 0.8rem 0.3rem;
   background-color: var(--bg-footer);
   border: none;
 }

 .chat__message-compose input:focus {
   outline: none;
 }

 .chat__message-compose:focus-within {
   outline: 2px solid var(--bg-document);
 }

 input[readonly],
 button[disabled] {
   opacity: 0.5;
   cursor: not-allowed;
 }
 .btn {
   font-size: 2em;
   line-height: 1;
   border: 2px solid var(--bg-footer);
 }
</style>
