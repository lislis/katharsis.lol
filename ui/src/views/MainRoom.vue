<template>
  <div>
    <AppHeader :notifications="$root.$data.notifications" />
    <div class="mainroom-view">
      <template v-if="!$root.$data.stage">
        <div class="inner">
          <Loader><p style="">{{ $t('main.pleaseWait') }}</p></Loader>
        </div>
      </template>
      <div v-else class="mainroom-split">
        <Loader v-if="loading" />
        <template v-else>
          <Chat
            :messages="stageMessages"
            :username="$root.$data.user.name"
            :room="$root.$data.stage"
            :showComposer="true"
            :showTitle="true" />

          <Chat
            :messages="backstageMessages"
            :username="$root.$data.user.name"
            :room="$root.$data.mainRoom"
            :showComposer="true"
            :showTitle="true" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Chat from '@/components/Chat.vue'
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
      notReady: false
    }
  },
  created() {
    if (!this.$root.$data.user._id) {
      this.$router.push({name: 'intro'})
    }
    if (!this.$root.$data.user.character) {
      this.$router.push({name: 'characterSheet'})
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
