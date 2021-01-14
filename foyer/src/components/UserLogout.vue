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
     logout() {
       let self = this
       axios.delete(`${this.$root.$data.restServer}/api/user/${this.$root.$data.user._id}`)
            .then(response => {
              let chat = {}
              chat.room = this.$root.$data.mainRoom._id;
              chat.nickname = this.$root.$data.user._id;
              chat.message = `${this.$root.$data.user.nickname} ist ausgetreten`;
              console.log(chat)

              axios.post(`${this.$root.$data.restServer}/api/chat`, chat)
                   .then(response => {
                     self.$root.$data.socket.emit('save-message', {
                       ...chat,
                       created_date: new Date()
                     })
                     self.$root.$data.socket.emit('remove-user', self.$root.$data.user)

                     self.$root.$data.user = {}
                     deleteUserFromStorage()

                     self.$router.push({
                       name: 'index'
                     })
                   })
                   .catch(e => { console.log(e) })
            })
     }
   }
 }
</script>
