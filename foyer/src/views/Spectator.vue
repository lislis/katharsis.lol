<template>
  <article>
    <OutSideNav />
    <header class="inner">
      <h1 class="spec__title">{{ $t('spec.title') }}</h1>
    </header>
    <section class="inner">
      <Loader v-if="loading"/>
      <ul v-else class="chat__messages">
        <ChatBubble v-for="message in messages"
                    :message="message"
                    :key="message._id" />
      </ul>
    </section>
  </article>
</template>
<script>
 import axios from 'axios'
 import Loader from '@/components/Loader'
 import ChatBubble from '@/components/ChatBubble'
 import OutSideNav from '@/components/OutSideNav'

 export default {
   name: "Index",
   components: {
     Loader,
     ChatBubble,
     OutSideNav
   },
   data() {
     return {
       stage: {},
       messages: [],
       loading: true
     }
   },
   created() {
     this.fetchMainRoom();

     this.$root.$data.socket.on('new-message', (data) => {
       if(data.message.room === this.stage._id) {
         this.messages.push(data.message)
       }

       this.updateScroll()
     })
   },
   methods: {
     fetchMainRoom() {
       this.loading = true;
       axios.get(`${this.$root.$data.restServer}/api/room/main`)
            .then(response => {
              this.stage = response.data.filter(x => x.locked)[0];

              axios.get(`${this.$root.$data.restServer}/api/chat/${this.stage._id}`)
                   .then(x => {
                     this.loading = false;
                     this.messages = x.data
                   })
            }).catch(e => { console.log(e) })

     },
     updateScroll(){
       setTimeout(() => {
         var element = this.$el.querySelector('.chat__messages');
         element.scrollTop = element.scrollHeight;
       }, 500);
     }
   }
 }
</script>
