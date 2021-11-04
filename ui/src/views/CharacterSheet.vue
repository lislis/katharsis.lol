<template>
<div class="charactersheet">
  <AppHeader :notifications="$root.$data.notifications" />
  <section class="centerstage">
    <h1 class="centerstage__title">{{ $t('character.title') }}</h1>

    Name
    <input type="text" v-model="name" />

    Steckbrief
    <textarea v-model="bio"></textarea>

    <div class="center-helper spacing-helper">
      <Loader v-if="loading" />
    <button @click="createCharacter">Create!</button>
    </div>
    <div>
      {{name}}<br>
      {{bio}}
    </div>
  </section>
</div>
</template>
<script>
  import axios from 'axios';
import AppHeader from '@/components/AppHeader'
import Loader from '@/components/Loader'
import { saveUserToStore } from '@/lib/storage'

export default {
  name: "CharacterSheet",
  components: { AppHeader, Loader },
  data() {
    return {
      name: '',
      bio: '',
      loading: false,
    }
  },
  created() {
    if (this.$root.$data.user.character) {
      this.$router.push({ name: 'main' });
    }
  },
  methods: {
    async createCharacter() {
      this.loading = true;
      let char = {
        name: this.name,
        bio: this.bio,
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
