<template>
<div class="charactersheet">
  <AppHeader :notifications="$root.$data.notifications" />
  <section class="centerstage">
    <h1 class="centerstage__title">{{ $t('character.title') }}</h1>

    <template v-if="$route.name == 'characterSheet'">
      Name
      <input type="text" v-model="name" />
    </template>
    <router-view v-else></router-view>

    <div class="center-helper spacing-helper">
      <Loader v-if="loading" />
    <button @click="toSheetOne">Next!</button>
    </div>
  </section>
</div>
</template>
<script>
import axios from 'axios';
import AppHeader from '@/components/AppHeader'
//import CharacterQuestion from '@/components/CharacterQuestion'
import Loader from '@/components/Loader'
import { saveUserToStore } from '@/lib/storage'

export default {
  name: "CharacterSheet",
  components: { AppHeader,
                Loader,
                //CharacterQuestion
              },
  data() {
    return {
      name: '',
      loading: false,
    }
  },
  created() {
    if (this.$root.$data.user.character) {
      this.$router.push({ name: 'main' });
    }
  },
  methods: {
    toSheetOne() {
      let firstKey = Object.keys(this.$root.$data.characterTree)[0];
      this.$router.push({ name: 'charQuestion', params: { ident: firstKey }});
    },
    async createCharacter() {
      this.loading = true;
      let char = {
        name: this.name,
        bio: '',
        user: this.$root.$data.user,
        colorCode: this.$root.$data.user.colorCode
      }
      let resp = await axios.post(`${this.$root.$data.restServer}/api/character`, char);
      let u = this.$root.$data.user;
      u.character = resp.data;
      saveUserToStore(u);

      let chat = {};
      chat.room = this.$root.$data.mainRoom._id;
      chat.message = `${this.name} ${this.$t('user.notice.enter')}`;
      await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);
      this.name = '';
      this.bio = '';
      this.loading = false;
      this.$router.push({ name: 'main' });
    }
  }
}
</script>
