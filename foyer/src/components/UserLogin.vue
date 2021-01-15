<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group row">
      <label class="form-elem">
        <span>{{$t('part.label')}}</span>
        <input type="text"
               class=""
               v-model.trim="newUser.nickname"
               placeholder="nickname">
      </label>
      <Loader v-if="loading" />
      <input v-else type="submit" :value="$t('intro.enter')" class="btn">
    </div>
  </form>
</template>
<script>
 import axios from 'axios'
 import { saveUserToStore } from '@/lib/storage'
 import Loader from '@/components/Loader'

 export default {
   name: "UserLogin",
   components: {
     Loader
   },
   data() {
     return {
       loading: false,
       newUser: {},
     }
   },
   methods: {
     async onSubmit(evt) {
       evt.preventDefault();
       this.loading = true;

       const resp = await axios.post(`${this.$root.$data.restServer}/api/user`, this.newUser);
       this.$root.$data.user = resp.data
       saveUserToStore(resp.data)

       let chat = {}
       chat.room = this.$root.$data.mainRoom._id;
       chat.nickname = this.$root.$data.user._id
       chat.message = `${this.$root.$data.user.nickname} ${this.$t('user.notice.enter')}`

       const chatResp = await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);
       /* this.$root.$data.socket.emit('save-message', {
        *   ...chat,
        *   created_date: new Date()
        * }); */
       this.loader = false;
       this.$router.push({ name: 'main' });
     }
   }
 }
</script>
