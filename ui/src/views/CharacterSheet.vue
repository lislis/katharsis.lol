<template>
<div class="charactersheet">
  <AppHeader :notifications="$root.$data.notifications" />
  <section class="centerstage">
    <h1 class="centerstage__title">{{ $t('character.title') }}</h1>

    Name
    <input type="text" v-model="name" />

    <template v-if="characterTree">
    <div v-for="q in Object.keys(characterTree)"
         :key="q">
      <CharacterQuestion :question="characterTree[q]" />
    </div>
    </template>

    <div class="center-helper spacing-helper">
      <Loader v-if="loading" />
    <button @click="createCharacter">Create!</button>
    </div>
  </section>
</div>
</template>
<script>
import axios from 'axios';
import AppHeader from '@/components/AppHeader'
import CharacterQuestion from '@/components/CharacterQuestion'
import Loader from '@/components/Loader'
import { saveUserToStore } from '@/lib/storage'

export default {
  name: "CharacterSheet",
  components: { AppHeader, Loader, CharacterQuestion },
  data() {
    return {
      name: '',
      //bio: '',
      characterSheet: null,
      loading: false,
    }
  },
  async created() {
    if (this.$root.$data.user.character) {
      this.$router.push({ name: 'main' });
    } else {
      this.characterSheet = await axios.get(`${this.$root.$data.restServer}/api/setting/bykey/characterSheet`);

    }
  },
  methods: {
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
  },
  computed: {
    characterTree() {
      if (this.characterSheet?.data) {
        return JSON.parse(this.characterSheet?.data[0].value)
      } else {
        return {}
      }
    }
  }

}
</script>
