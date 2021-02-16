<template>
  <div>
    <OutSideNav />
    <Notifications :notifications="$root.$data.notifications" />
    <article class="index">
      <header class="inner">
        <h2 class="index__claim center-helper" v-html="$t('index.claim')"></h2>
      </header>
      <section class="inner">
        <div class="index__overflow">
          <fragment v-if="loading">
            <Loader />
          </fragment>
          <fragment v-else>
            <fragment v-if="defaultText">
              <p class="default-text">{{ $t('index.defaultText')}}</p>
            </fragment>
            <fragment v-else>
              <p v-for="p in introText" :key="p._id">{{p}}</p>
            </fragment>
          </fragment>
        </div>
        <div class="center-helper spacing-helper">
          <router-link :to="{ name: 'spectator'}"
                       class="btn">{{ $t('index.watch') }}</router-link>
          <router-link :to="{ name: 'intro'}"
                       class="btn">{{ $t('index.participate') }}</router-link>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
 import axios from 'axios'
 import OutSideNav from '@/components/OutSideNav'
 import Notifications from '@/components/Notifications'
 import Loader from '@/components/Loader'

 export default {
   name: "Index",
   components: {
     OutSideNav,
     Notifications,
     Loader
   },
   data() {
     return {
       loading: true,
       defaultText: false,
       introText: []
     }
   },
   created() {
     this.getSettings();
   },
   methods: {
     async getSettings() {
       this.loading = true;
       this.defaultText = false;
       const setObj = await axios.get(`${this.$root.$data.restServer}/api/setting/bykey/introTextUrl`);
       if (setObj.data.length) {
         const textCSV = await axios.get(setObj.data[0].value);
         this.introText = textCSV.data.split('\n').map(x => x.replaceAll('"', ''));
         this.loading = false;
       } else {
         this.loading = false;
         this.defaultText = true;
       }
     }
   }
 }
</script>
<style>

</style>
