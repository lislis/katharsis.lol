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
 import usercolors from '@/data/usercolors.json'
 import { sample } from '@/lib/utils'

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
       this.newUser.colorCode = sample(usercolors);
       const resp = await axios.post(`${this.$root.$data.restServer}/api/user`, this.newUser);
       this.$root.$data.user = resp.data;
       saveUserToStore(resp.data);

       let chat = {};
       chat.room = this.$root.$data.mainRoom._id;
       chat.nickname = this.$root.$data.user._id;
       chat.message = `${this.$root.$data.user.nickname} ${this.$t('user.notice.enter')}`;

       await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);
       this.loader = false;
       this.$router.push({ name: 'main' });
     }
   }
 }
</script>
