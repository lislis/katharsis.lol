<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group row">
      <p v-html="$t('intro.callMeByAnyName')"></p>
      <label class="form-elem">
        <span class="a11y-hidden">{{$t('part.label')}}</span>
        <input type="text"
               class=""
               v-model.trim="newUser.nickname"
               :placeholder="$t('part.label')">
      </label>
      <label class="form-elem">
        <span class="">{{$t('part.ticket')}}</span>
        <input type="text"
               class=""
               v-model.trim="ticketCode"
               :placeholder="$t('part.ticket')">
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
       ticketCode: '',
     }
   },
   methods: {
     async onSubmit(evt) {
       evt.preventDefault();
       this.loading = true;
       this.newUser.colorCode = sample(usercolors);
       this.newUser.providedTicketCode = this.ticketCode;
       console.log(this.newUser)
       const resp = await axios.post(`${this.$root.$data.restServer}/api/user`, this.newUser);

       if (resp.data.message && (resp.data.message == 'Invalid code' || resp.data.message == 'Empty code')) {
         this.$root.$data.notifications.push(this.$t('part.invalidTicket'));
         this.loading = false;
       } else if (resp.data.message && (resp.data.message == 'Code expired')) {
         this.$root.$data.notifications.push(this.$t('part.usedTicket'));
         this.loading = false;
       } else {
         this.$root.$data.user = resp.data;
         saveUserToStore(resp.data);

         let chat = {};
         chat.room = this.$root.$data.mainRoom._id;
         chat.nickname = this.$root.$data.user._id;
         chat.message = `${this.$root.$data.user.nickname} ${this.$t('user.notice.enter')}`;

         await axios.post(`${this.$root.$data.restServer}/api/chat`, chat);
         this.loading = false;
         this.$router.push({ name: 'main' });
       }
     }
   }
 }
</script>
