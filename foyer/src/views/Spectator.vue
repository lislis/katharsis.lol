<template>
  <article>
    <OutSideNav />
    <header class="inner">
      <h1 class="spec__title">{{ $t('spec.title') }}</h1>
    </header>
    <section class="inner">
      <Loader v-if="!$root.$data.stage"/>
      <Chat v-else
            :messages="messages"
            :username="$root.$data.user.nickname"
            :room="$root.$data.stage"
            :showComposer="false"
            :showTitle="false" />
    </section>
  </article>
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
   data() {
     return {
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
