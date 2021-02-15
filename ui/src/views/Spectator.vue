<template>
  <div class="spectator">
    <OutSideNav />
    <section class="centerstage">
      <h1 class="centerstage__title">{{ $t('spec.title') }}</h1>
      <Loader v-if="!$root.$data.stage"/>
      <Chat v-else
            :messages="messages"
            :username="$root.$data.user.nickname"
            :room="$root.$data.stage"
            :showComposer="false"
            :showTitle="false" />
    </section>
  </div>
</template>
<script>
 import Loader from '@/components/Loader'
 import Chat from '@/components/Chat'
 import OutSideNav from '@/components/OutSideNav'

 export default {
   name: "Index",
   components: {
     Loader,
     Chat,
     OutSideNav
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
