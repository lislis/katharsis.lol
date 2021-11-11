<template>
<form @submit.prevent="onSubmit" autocomplete="off">
  <div class="form-group row">
    <label class="form-elem">
      <span class="a11y-hidden">{{$t('part.ticket')}}</span>
      <input type="text"
             class=""
             required=""
             autocomplete="false"
             v-model.trim="ticketCode"
             :placeholder="$t('part.ticket')">
    </label>
    <div class="center-helper spacing-helper">
      <Loader v-if="loading" />
      <input v-else type="submit" :value="$t('intro.enter')" class="btn">
    </div>
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
      ticketCode: '',
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      let newUser = {
        colorCode: sample(usercolors),
        providedTicketCode: this.ticketCode
      };
      const resp = await axios.post(`${this.$root.$data.restServer}/api/user`, newUser);

      if (resp.data.message && (resp.data.message == 'Invalid code' || resp.data.message == 'Empty code')) {
        this.$root.$data.notifications.push(this.$t('part.invalidTicket'));
        this.loading = false;
      } else if (resp.data.message && (resp.data.message == 'Code expired')) {
        this.$root.$data.notifications.push(this.$t('part.usedTicket'));
        this.loading = false;
      } else {
        this.$root.$data.user = resp.data;
        console.log(resp.data);
        saveUserToStore(resp.data);

        this.$router.push({ name: 'characterSheet' });
      }
    }
  }
}
</script>
