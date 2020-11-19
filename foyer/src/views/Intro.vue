<template>
  <div>
    <h1>Call me by any name</h1>

    <div v-if="$root.$data.user.nickname">
      <p>Dein Name ist
      {{$root.$data.user.nickname}}</p>

      <router-link :to="{ name: 'room',
                   params: { roomid: this.$root.$data.mainRoom._id }}">Zum Raum</router-link>
    </div>

    <template v-else>
      <h4>Was ist dein Name?</h4>
      <form @submit.prevent="onSubmit">
        <div class="form-group row">
          <input type="text" class="" v-model.trim="newUser.nickname"
                 placeholder="Dein Nutzername">
          <input type="submit" value="Eintreten" class="btn">
        </div>
      </form>
    </template>
  </div>
</template>
<script>
 import axios from 'axios'

  export default {
    name: "Intro",
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
             window.localStorage.setItem(
               `${process.env.VUE_APP_LS_PREFIX}user`,
               JSON.stringify(response.data))
             this.$root.$data.user = response.data

             this.$root.$data.socket.emit('save-user', response.data)

             //... join it
             this.chat.room = this.$root.$data.mainRoom._id;
             this.chat.nickname = this.$root.$data.user._id
             this.chat.message = `${this.$root.$data.user.nickname} ist eingetreten`

             axios.post(`${this.$root.$data.restServer}/api/chat`, this.chat)
                  .then(response => {
                    this.$root.$data.socket.emit('save-message', {
                      room: this.chat.room,
                      nickname: this.chat.nickname,
                      message: this.chat.message,
                      created_date: new Date()
                    })
                    // this should probably also announce new player
                    //this.$root.$data.socket.emit('newPlayer');

                    this.$router.push({ name: 'room',
                                        params: { roomid: this.$root.$data.mainRoom._id }})
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
 .btn {
   display: inline-block;
   background-color: hotpink;
   color: black;
   padding: 0.5rem 1rem;
   text-decoration: none;
   border-radius: 4px;
 }
 .btn:hover,
 .btn:active {
   background-color: pink;
 }
</style>
