<template>
  <div class="archive">
    <OutSideNav />
    <section class="centerstage">
      <h1 class="centerstage__title">{{ $t('archive.title') }}</h1>
      <Loader v-if="!$root.$data.plays.length"/>
      <div v-else class="archive__overflow">
        <ul class="playlist">
          <li v-for="p in plays" :key="p._id">
            <h2 class="center-helper">{{p.title}}</h2>
            <div>
              <p class="comment" v-if="p.comment">{{p.comment}}</p>
              <p class="time" v-if="p.took_place"><time :datetime="p.took_place">{{ pdfDate(p) }}</time></p>

            </div>
            <div class="inline-helper center-helper">
              <router-link :to="{ name: 'singlePlay', params: { id: p._id }}" class="btn">{{ $t('archive.readText') }}</router-link>
              <a class="btn btn--inverted2" :href="pdfLink(p)" target="_blank">{{ $t('archive.pdf') }}</a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
 import Loader from '@/components/Loader'
 import OutSideNav from '@/components/OutSideNav'

 export default {
   name: "Archive",
   components: {
     Loader,
     OutSideNav
   },
   data() {
     return {
       loading: true,
       plays: []
     }
   },
   watch: {
     '$root.$data.plays': {
       handler() {
         this.plays = this.$root.$data.plays.reverse()
       }
     }
   },
   methods: {
     pdfLink(p) {
       return `${this.$root.$data.restServer}/api/play/pdf/${p._id}`;
     },
     pdfDate(p) {
       let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
       let date = new Date(p.took_place);
       return date.toLocaleDateString('de-DE', opt);
     }
   }
 }
</script>
<style scoped>
 .playlist {
   list-style: none;
   padding: 0;
 }
 .playlist li {
   background-color: white;
   margin-bottom: 1rem;
   padding: 1.5rem 1.5rem 1rem;
   border-radius: 30px;
 }

 .playlist h2 {
   margin: 0 0 0.5rem;
 }

 .playlist .inline-helper {
   margin: 1rem;
 }
</style>
