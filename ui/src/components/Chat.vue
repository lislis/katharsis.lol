<template>
  <section class="chat">
    <div v-if="showTitle" class="chat__room-header">
      <h3>
        {{ room.room_name}}
        <span v-if="room.private" class="chat__room-status">(private)</span>
      </h3>
    </div>
    <div class="chat__message_container">
      <ul class="chat__messages">
        <ChatBubble v-for="message in messages"
                    :message="message"
                    :room="room"
                    :key="message.message" />
      </ul>
      <TypingIndicator :room="room" />
      <ChatComposer v-if="showComposer" :room="room" />
    </div>
  </section>
</template>

<script>
 import ChatBubble from '@/components/ChatBubble.vue'
 import ChatComposer from '@/components/ChatComposer.vue'
 import TypingIndicator from '@/components/TypingIndicator.vue'

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
     TypingIndicator
   },
   data() {
     return {
       firstScroll: true
     }
   },
   created() {
     this.firstScroll = true;
     setTimeout(() => {this.updateScroll()}, 200);

     this.$root.$data.socket.on('new-message', () => {
       this.updateScroll();
     });
   },
   methods: {
     updateScroll() {
       setTimeout(() => {
         const element = this.$el.querySelector('.chat__messages');
         if (element) {
           const eHeight = Math.floor(element.getBoundingClientRect().height);
           const eScrollTop = element.scrollTop;
           const eScrollHeight = element.scrollHeight;
           const maxScroll = Math.floor(eScrollHeight - eHeight);
           let lastMsgHeight = 200; // could be calculated

           if (this.firstScroll) {
             element.scrollTop = eScrollHeight;
             this.firstScroll = false;
           }

           if (eScrollTop + lastMsgHeight > maxScroll) {
             element.scrollTop = eScrollHeight;
           }
         }
       }, 200);
     },

   }
 }
</script>
