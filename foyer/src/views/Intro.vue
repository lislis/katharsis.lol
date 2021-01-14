<template>
  <article>
    <OutSideNav />
    <header class="inner">
      <h1 class="part__title">{{ $t('part.title') }}</h1>
      <p>Lorem ipsum</p>
    </header>
    <section class="inner">
      <div v-if="$root.$data.user.nickname">
        <p>{{ $t('intro.yourNameIs') }}
          <strong>{{$root.$data.user.nickname}}</strong>.<br>
          <router-link :to="{ name: 'main' }" class="btn">{{ $t('intro.toRoom') }}</router-link>
        </p>

        <p>
          {{ $t('intro.noMore') }}
          <UserLogout class="link">{{ $t('intro.leave') }}</UserLogout>.
        </p>
      </div>

      <template v-else>
        <form @submit.prevent="onSubmit">
          <div class="form-group row">
            <label class="form-elem">
              <span>{{$t('part.label')}}</span>
              <input type="text" class="" v-model.trim="newUser.nickname"
                     placeholder="nickname">
            </label>
            <input type="submit" :value="$t('intro.enter')" class="btn">
          </div>
        </form>
      </template>
    </section>
  </article>
</template>
<script>
 import axios from 'axios'
 import { saveUserToStore } from '@/lib/storage'
 import OutSideNav from '@/components/OutSideNav'
 import UserLogout from '@/components/UserLogout'
 import { logout } from '@/lib/user'

 export default {
   name: "Intro",
   components: {
     OutSideNav,
     UserLogout,
   },
   data() {
     return {
       hasUser: false,
       newUser: {},
       errors: [],
       chat: {}
     }
   },
   created() {
   },
   methods: {
     onSubmit(evt) {
       evt.preventDefault()
       // ... create a user
       axios.post(`${this.$root.$data.restServer}/api/user`, this.newUser)
          .then(response => {
            saveUserToStore(response.data)
            this.$root.$data.user = response.data
            this.$root.$data.socket.emit('save-user', response.data)

            //... join it
            this.chat.room = this.$root.$data.mainRoom._id;
            this.chat.nickname = this.$root.$data.user._id
            this.chat.message = `${this.$root.$data.user.nickname} ist eingetreten`

            axios.post(`${this.$root.$data.restServer}/api/chat`, this.chat)
                 .then(response => {
                   this.$root.$data.socket.emit('save-message', {
                     ...this.chat,
                     created_date: new Date()
                   })
                   this.$router.push({ name: 'main' })
                 })
                 .catch(e => { this.errors.push(e) })
          })
          .catch(e => {
            console.log(e)
          })
     }
   }
 }
</script>
<style>

</style>
