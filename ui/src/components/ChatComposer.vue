<template>
  <div>
    <form @submit.prevent="send">
      <div class="chat__message-compose">
        <div v-if="isStage" class="chat__message-type">
          <label class="chat__message-type-option">
            <input type="radio" v-model="messageType" id="say" value="say" checked  class="a11y-hidden">
            <span :title="$t('ui.form.directSpeech')"
                 :aria-label="$t('ui.form.directSpeech')">🗣</span>
          </label>
          <label class="chat__message-type-option">
            <input type="radio" v-model="messageType" id="do" value="do" class="a11y-hidden">
            <span :title="$t('ui.form.stageInstruction')"
                 :aria-label="$t('ui.form.stageInstruction')">📝</span>
          </label>
        </div>
        <input type="text"
               class="form-control"
               v-model="chat.message"
               :placeholder="fittingPlaceholder"
               :readonly="!canWrite"
               @input="typing">
        <EmojiPicker v-if="canWrite" v-on:pick-emoji="pickUpEmoji" />
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
       chat: {},
       messageType: 'say',
       sending: false,
       isTyping: false,
       typingTimeout: null
     }
   },
   created() {
     this.chat.message = '';
   },
   methods: {
     send() {
       if (!this.canWrite) return false;
       if (!this.chat.message
           || this.chat.message === ""
           || this.chat.message === " ") return false;

       this.sending = true;
       this.chat.room = this.room._id;
       if (this.messageType === 'say') {
         this.chat.user = this.$root.$data.user._id;
       } else {
         this.chat.bot = true;
       }

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
     },
     isStage() {
       return this.room.locked;
     },
     fittingPlaceholder() {
       if (this.messageType == 'do') {
         return this.$t('ui.form.placeholderInstruction');
       } else {
         return this.$t('ui.form.placeholderSpeech');
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
   align-items: center;
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

 .is-onit .chat__message-compose:focus-within {
   outline: 2px solid var(--bg-shade);
 }

 .chat__message-type-option {
   display: block;
   cursor: pointer;
 }

 .chat__message-type-option span {
   display: block;
   padding: 0.3em 0.3em 0em;
   text-align: center;
   border-radius: 2px;
 }

 .chat__message-type-option input[type="radio"]:checked + span {
   background-color: var(--bg-shade)
 }

 .a11y-hidden {
   position: absolute;
   width: 1px;
   height: 1px;
   margin: -1px;
   border: 0;
   padding: 0;
   clip: rect(0 0 0 0);
   overflow: hidden;
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
