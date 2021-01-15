<template>
  <button @click="logout" :class="class"><slot /></button>
</template>
<script>
 import axios from 'axios'
 import { deleteUserFromStorage } from '@/lib/storage'

 export default {
   name: 'UserLogout',
   props: ['class'],
   methods: {
     async logout() {
       const delResp = await axios.delete(`${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`);
       let chat = {}
       chat.room = this.$root.$data.mainRoom._id;
       chat.nickname = this.$root.$data.user._id;
       chat.message = `${this.$root.$data.user.nickname} ${this.$t('user.notice.leave')}`;
       const chatResp = await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);

       /* this.$root.$data.socket.emit('save-message', {
        *   ...chat,
        *   created_date: new Date()
        * });
        */
       this.$root.$data.user = {};
       deleteUserFromStorage();

       this.$router.push({
         name: 'index'
       });
     }
   }
 }
</script>
