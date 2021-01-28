<template>
  <div>
    <form @submit.prevent="send">
      <div class="chat__message-compose">
        <input type="text"
               class="form-control"
               v-model="chat.message"
               :placeholder="$t('ui.form.chat')"
               :readonly="!canWrite"
               @input="typing">
        <EmojiPicker v-on:pick-emoji="pickUpEmoji" />
        <button class="btn"
                :title="$t('ui.button.send')"
                :aria-label="$t('ui.button.send')"
                :disabled="!canWrite">
          <fragment v-if="sending">↺</fragment>
          <fragment v-else>→</fragment>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
 import axios from 'axios';
 import EmojiPicker from '@/components/EmojiPicker'

 export default {
   name: 'ChatComposer',
   props: ['room'],
   components: {
     EmojiPicker
   },
   data() {
     return {
       chat: {
         message: ''
       },
       sending: false,
       isTyping: false,
       typingTimeout: null
     }
   },
   methods: {
     send() {
       if (!this.canWrite) return false;
       if (!this.chat.message
           || this.chat.message === ""
           || this.chat.message === " ") return false;

       this.sending = true;
       this.chat.room = this.room._id;
       this.chat.user = this.$root.$data.user._id;
       axios
         .post(`${this.$root.$data.restServer}/api/chat`, this.chat)
         .then(() => {
           this.chat = {};
           this.sending = false;
         })
         .catch(e => {
           this.$root.$data.notifications.push(e)
         })
     },
     pickUpEmoji(emoji) {
       this.chat.message = this.chat.message + emoji;
     },
     typingTimeoutFn() {
       console.log('no tippy')
       this.isTyping = false;
       this.$root.$data.socket.emit('is-not-typing',
                                    { user: this.$root.$data.user._id,
                                      room: this.room._id });
     },
     typing() {
       if (this.isTyping) {
         clearTimeout(this.typingTimeout);
         this.typingTimeout = setTimeout(this.typingTimeoutFn, 1000);
       } else {
         this.isTyping = true;
         console.log('tippy')
         this.$root.$data.socket.emit('is-typing',
                                      { user: this.$root.$data.user._id,
                                        room: this.room._id });
         this.typingTimeout = setTimeout(this.typingTimeoutFn, 1000);
       }
     }
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
