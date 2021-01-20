<template>
  <section class="chat">
    <div class="chat__room-header">
      <h3>
        {{ room.room_name}}
        <span v-if="room.private" class="chat__room-status">(private)</span>
      </h3>
    </div>
    <div class="chat__message_container">
      <ul class="chat__messages">
        <ChatBubble v-for="message in messages"
                    :message="message"
                    :key="message.message" />
      </ul>
      <ChatComposer :room="room" />
    </div>
  </section>
</template>

<script>
 import ChatBubble from '@/components/ChatBubble.vue'
 import ChatComposer from '@/components/ChatComposer.vue'

 export default {
   name: 'Chat',
   props: ['messages', 'username', 'connections', 'room'],
   components: { ChatBubble, ChatComposer },
   created() {
     this.updateScroll();

     this.$root.$data.socket.on('new-message', () => {
       this.updateScroll();
     })
   },
   methods: {
     updateScroll(){
       setTimeout(() => {
         const element = this.$el.querySelector('.chat__messages');
         if (!element) return false;
         element.scrollTop = element.scrollHeight;
       }, 500);
     }
   }
 }
</script>
