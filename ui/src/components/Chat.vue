<template>
  <section class="chat" :class="{ 'is-onit': mainStageHighlight }">
    <h2 v-if="showTitle" class="centerstage__title">{{ room.room_name}}</h2>
    <div class="chat__message_container">
      <PeopleList :people="$root.$data.otherPeople" v-if="isBackstage"  />
      <ul class="chat__messages monospace" :class="{'more-space': isBackstage}">
        <ChatBubble v-for="message in messages"
                    :message="message"
                    :room="room"
                    :key="message.message" />
      </ul>
      <button class="chat__scrolldown"
              type="button"
              v-if="hasNewMessage"
              :aria-label="$t('ui.chat.scrollDown')"
              :title="$t('ui.chat.scrollDown')"
              @click="scrollDown"></button>
      <div class="relative">
        <TypingIndicator :room="room" />
        <ChatComposer v-if="showComposer" :room="room" />
      </div>
    </div>
  </section>
</template>

<script>
 import ChatBubble from '@/components/ChatBubble.vue'
 import ChatComposer from '@/components/ChatComposer.vue'
 import TypingIndicator from '@/components/TypingIndicator.vue'
 import PeopleList from '@/components/PeopleList.vue'

 export default {
   name: 'Chat',
   props: ['messages',
           'username',
           'connections',
           'room',
           'showComposer',
           'showTitle'
   ],
   components: {
     ChatBubble,
     ChatComposer,
     TypingIndicator,
     PeopleList
   },
   data() {
     return {
       element: undefined,
       firstScroll: true,
       hasNewMessage: false
     }
   },
   created() {
     this.firstScroll = true;
     this.hasNewMessage = false;

     setTimeout(() => {
       this.element = this.$el.querySelector('.chat__messages');
       this.updateScroll();
     }, 200);

     this.$root.$data.socket.on('new-message', (data) => {
       if (data.message.room == this.room._id) {
         const maxScroll = Math.floor(this.element.scrollHeight - this.element.getBoundingClientRect().height);
         if (this.element.scrollTop < maxScroll) {
           this.hasNewMessage = true;
         }
         this.updateScroll();
       }
     });
   },
   methods: {
     updateScroll() {
       setTimeout(() => {
         if (this.element) {
           const eHeight = Math.floor(this.element.getBoundingClientRect().height);
           const eScrollTop = this.element.scrollTop;
           const eScrollHeight = this.element.scrollHeight;
           const maxScroll = Math.floor(eScrollHeight - eHeight);
           let lastMsgHeight = 200; // could be calculated

           if (this.firstScroll) {
             this.element.scrollTop = eScrollHeight;
             this.firstScroll = false;
           }

           if (eScrollTop + lastMsgHeight > maxScroll) {
             this.element.scrollTop = eScrollHeight;
             this.hasNewMessage = false;
           }
         }
       }, 200);
     },
     scrollDown() {
       if (this.element) {
         this.element.scrollTop = this.element.scrollHeight;
         this.hasNewMessage = false;
       }
     }
   },
   computed: {
     mainStageHighlight() {
       if (!this.room.locked) return false;
       if (!this.$root.$data.user.hasPermission) return false;
       return true;
     },
     isBackstage() {
       return this.room.main && !this.room.locked;
     }
   }
 }
</script>
