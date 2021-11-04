<template>
  <button class="userlogout__button btn btn--pill" @click.prevent="toggleDialog">
    <slot></slot>
  </button>
  <div class="notifications" v-if="isOpen">
    <div class="note">
      <p v-html="$t('user.notification.reallyLeave')"></p>
      <button class="btn userlogout__stay" @click.prevent="toggleDialog">{{ $t('user.notification.back') }}</button>
      <button class="btn btn--inverted2 userlogout__leave" @click.prevent="logout">{{ $t('user.notification.reallyLeaveBtn') }}</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { deleteUserFromStorage } from '@/lib/storage'

export default {
  name: 'UserLogout',
  data() {
    return {
      isOpen: false
    }
  },
  created() {
    this.isOpen = false;
  },
  methods: {
    toggleDialog() {
      this.isOpen = !this.isOpen;
    },
    async logout() {
      this.$root.$data.loggedMyselfOut = true;
      await axios.delete(`${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`);
      let chat = {}
      chat.room = this.$root.$data.mainRoom._id;
      chat.message = `${this.$root.$data.user.character.name} ${this.$t('user.notice.leave')}`;
      await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);

      this.$root.$data.user = {};
      deleteUserFromStorage();

       this.$router.push({
         name: 'index'
       });
     }
   }
 }
</script>
