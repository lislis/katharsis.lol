<template>
  <div>
    <AppHeader :notifications="$root.$data.notifications" />
    <div class="mainroom-view">
      <div class="mainroom-split">
        <Loader v-if="loading" />
        <template v-else>
          <Chat
            :messages="stageMessages"
            :username="$root.$data.user.nickname"
            :room="$root.$data.stage" />

          <Chat
            :messages="backstageMessages"
            :username="$root.$data.user.nickname"
            :room="$root.$data.mainRoom" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
 import Chat from '@/components/Chat.vue'
 import axios from 'axios'
 import Loader from '@/components/Loader'
 import AppHeader from '@/components/AppHeader'


 export default {
   name: "MainRoom",
   components: {
     Chat,
     Loader,
     AppHeader,

   },
   data() {
     return {
       loading: true,
     }
   },
   created() {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }
     this.loading = false;
   },
   computed: {
     stageMessages() {
       return this.$root.$data.chats
                  .filter(x => {
                    return x.room === this.$root.$data.stage._id
                  });
     },
     backstageMessages() {
       return this.$root.$data.chats
                  .filter(x => {
                    return x.room === this.$root.$data.mainRoom._id
                  });
     }
   }
 }
</script>
