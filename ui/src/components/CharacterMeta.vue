<template>
<div>
  <template v-if="hasCreatedButton">

    <h3>{{ $root.$data.ownCharacter.name }}</h3>

    <template v-for="lvl in Object.keys($root.$data.characterProgress)"
         :key="lvl">
      <div v-for="obj in $root.$data.characterProgress[lvl]"
           :key="obj.key">
        <strong>{{ obj.question }}</strong><br>{{ obj.text }}
      </div>
    </template>

    <div class="center-helper">
      <button  @click="createCharacter" class="btn btn--pill">
        {{ $t('character.questions.confirm') }}</button>
      <button
        class="btn btn--pill"
        @click="deleteProgress">
        {{ $t('character.questions.beginAgain') }}</button>
    </div>
  </template>

  <template v-else>
    <label>
      {{ $t('character.questions.nameLabel') }}
      <input type="text" v-model="name" @blur="saveCurrent" />
    </label>

    <div class="center-helper spacing-helper">
      <Loader v-if="loading" />
      <router-link v-if="firstSheet"
                   :to="{ name: 'charQuestion', params: { ident: firstSheet}}"
                   class="btn btn--pill">
        {{ $t('character.questions.nextQuestion') }}</router-link>

    </div>
  </template>
</div>
</template>
<script>
import axios from 'axios';
import Loader from '@/components/Loader'
import { saveUserToStore } from '@/lib/storage'

export default {
  name: 'CharacterMeta',
  components: { Loader },
  data() {
    return {
      name: '',
      loading: false
    }
  },
  created() {
    if (this.$root.$data.ownCharacter.name) {
      this.name = this.$root.$data.ownCharacter?.name;
    }
  },
  methods: {
    saveCurrent() {
      this.$root.$data.ownCharacter.name = this.name;
    },
    deleteProgress() {
      this.$root.$data.characterProgress = {};
      this.$router.push({ name: 'charQuestion', params: { ident: this.firstSheet}})
    },
    async createCharacter() {
      this.loading = true;
      let char = {
        name: this.name,
        characterProgress: this.$root.$data.characterProgress,
        user: this.$root.$data.user,
        colorCode: this.$root.$data.user.colorCode
      }
      let resp = await axios.post(`${this.$root.$data.restServer}/api/character`, char);
      let u = this.$root.$data.user;
      u.character = resp.data;
      this.$root.$data.ownCharacter = resp.data;
      saveUserToStore(u);

      let chat = {};
      chat.room = this.$root.$data.mainRoom._id;
      chat.message = `${this.name} ${this.$t('user.notice.enter')}`;
      await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);
      this.name = '';
      this.loading = false;
      this.$router.push({ name: 'main' });
    }
  },
  computed: {
    firstSheet() {
      return Object.keys(this.$root.$data.characterTree)[0];
    },
    hasCreatedButton() {
      return Object.keys(this.$root.$data.characterProgress).length > 0
    }
  }
}
</script>
