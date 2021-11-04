<template>
  <div>
    <form @submit.prevent="send" autocomplete="off">
      <div class="chat__message-compose">
        <div v-if="isStage" class="chat__message-type">
          <label class="chat__message-type-option">
            <input type="radio"
                   v-model="messageType"
                   id="say"
                   value="say"
                   name="message-type"
                   checked
                   autocomplete="false"
                   :disabled="!canWrite"
                   class="a11y-hidden">
            <span :title="$t('ui.form.directSpeech')"
                 :aria-label="$t('ui.form.directSpeech')">💬</span>
          </label>
          <label class="chat__message-type-option">
            <input type="radio"
                   v-model="messageType"
                   id="do"
                   value="do"
                   name="message-type"
                   :disabled="!canWrite"
                   autocomplete="false"
                   class="a11y-hidden">
            <span :title="$t('ui.form.stageInstruction')"
               :aria-label="$t('ui.form.stageInstruction')">🖋</span>
          </label>
        </div>
        <label>
          <span class="a11y-hidden">{{ fittingPlaceholder }}</span>
          <input type="text"
                 class="form-control"
                 name="message-input"
                 v-model="chat.message"
                 :placeholder="fittingPlaceholder"
                 :readonly="!canWrite"
                 autocomplete="false"
                 @input="typing">
        </label>
        <EmojiPicker v-if="canWrite" v-on:pick-emoji="pickUpEmoji" />
        <button class="btn btn--compose"
                :title="$t('ui.button.send')"
                :aria-label="$t('ui.button.send')"
                :disabled="!canWrite">
          <span v-if="sending">↺</span>
          <span v-else>&#10132;</span>
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
        this.chat.character = this.$root.$data.user.character;

      } else {
        this.chat.bot = true;
        this.chat.user = this.$root.$data.user._id;
      }

      axios
         .post(`${this.$root.$data.restServer}/api/chat`, this.chat)
         .then(() => {
           this.chat = {};
           this.chat.message = '';
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
         if (this.$root.$data.user.character?.hasPermission) {
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
