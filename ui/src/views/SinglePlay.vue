<template>
  <div class="singleplay">
    <OutSideNav />
    <section class="centerstage">
      <div class="play--back"><router-link :to="{ name: 'archive'}" class="btn btn--pill">{{ $t('archive.title') }}</router-link></div>
      <Loader v-if="loading" />
      <div v-if="play" class="chat__message_container">
        <h1 class="centerstage__title">{{ play.title }}</h1>
        <p v-if="play.comment" class="comment">{{ play.comment }}</p>
        <p v-if="play.took_place" class="time"><time :datetime="play.took_place">{{ formattedDate }}</time></p>
        <ul class="monospace  index__overflow">
          <ChatBubble v-for="message in msgs"
                      :message="message"
                      :room="{ locked: true }"
                      :key="message.message" />

        </ul>
      </div>
      <div v-if="error">
        {{ error }}
      </div>
    </section>
  </div>
</template>
<script>
 import Loader from '@/components/Loader'
 import ChatBubble from '@/components/ChatBubble'
 import OutSideNav from '@/components/OutSideNav'

 export default {
   name: "SinglePlay",
   components: {
     OutSideNav,
     ChatBubble,
     Loader
   },
   watch: {
     '$root.$data.plays': {
       handler() {
         this.getPlay();
       }
     }
   },
   data() {
     return {
       loading: true,
       play: null,
       msgs: [],
       error: null
     }
   },
   created() {
     this.getPlay();
   },
   computed: {
     formattedDate() {
       let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
       let date = new Date(this.play.took_place);
       return date.toLocaleDateString('de-DE', opt);
     }
   },
   methods: {
     getPlay() {
       let filt = this.$root.$data.plays.filter(x => x._id == this.$route.params.id)
       if (filt.length) {
         this.play = filt[0];
         this.msgs = JSON.parse(this.play.the_play);
         this.loading = false;
       } else {
         this.loading = true;
       }
     }
   }
 }
</script>
<style>
 .chat__message_container ul {
   list-style: none;
 }

 .play--back {
   margin-bottom: 2rem;
 }

 @media print {
   .chat__message_container ul {
     list-style: none;
     padding: 1em 2em;
   }

   .outsidenav__link {
     display: none
   }
   .footer > nav,
   .footer > div,
   .play--back {
     display: none !important
   }
   .chat__message {
     font-size: 12px;
     margin-bottom: 0.9em !important;
   }
 }

</style>
