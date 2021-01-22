<template>
  <article>
    <OutSideNav />
    <header class="inner">
      <h1 class="spec__title">{{ $t('spec.title') }}</h1>
    </header>
    <section class="inner">
      <Loader v-if="loading"/>
      <div v-else class="chat">
      <ul class="chat__messages">
        <ChatBubble v-for="message in messages"
                    :message="message"
                    :key="message._id" />
      </ul>
      </div>
    </section>
  </article>
</template>
<script>
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
       loading: true
     }
   },
   mounted() {
     this.loading = false;
   },
   computed: {
     messages() {
       return this.$root.$data.chats
                  .filter(x => {
                    return x.room === this.$root.$data.stage._id
                  });
     }
   }
 }
</script>
