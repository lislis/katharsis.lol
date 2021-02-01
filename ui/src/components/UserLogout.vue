<template>
  <button @click.prevent="logout">
    <slot></slot>
  </button>
</template>
<script>
 import axios from 'axios'
 import { deleteUserFromStorage } from '@/lib/storage'

 export default {
   name: 'UserLogout',
   methods: {
     async logout() {
       await axios.delete(`${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`);
       let chat = {}
       chat.room = this.$root.$data.mainRoom._id;
       chat.nickname = this.$root.$data.user._id;
       chat.message = `${this.$root.$data.user.nickname} ${this.$t('user.notice.leave')}`;
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
