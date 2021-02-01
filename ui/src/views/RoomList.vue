<template>
  <div>
    <h2>Öffentliche Räume</h2>
    <SmallRoomList :roomList="publicRooms">
      Noch keine öffentliche Räume. Erstelle einen weiter unten!
    </SmallRoomList>

    <section>
      <h2>Private Räume</h2>
      <SmallRoomList :roomList="privateRooms">
        Noch keine privaten Räume. Finde <router-link :to="{name: 'peoplelist'}">Leute</router-link> für private Räume.
      </SmallRoomList>
    </section>

    <section class="border">
      <h2>Neuen öffentlichen Raum erstellen</h2>
      <form @submit.prevent="onSubmit">
        <label>
          Raumname
          <input id="room_name" v-model.trim="room.room_name">
        </label>
        <button type="submit">Erstellen</button>
      </form>
    </section>

    <ul v-if="errors && errors.length">
      <li v-for="(error, key) of errors" :key="key">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
 import SmallRoomList from '@/components/SmallRoomList'
 import axios from 'axios'

 export default {
   name: 'RoomList',
   components: { SmallRoomList },
   data () {
     return {
       room: {},
       rooms: [],
       errors: [],
       publicRooms: [],
       privateRooms: []
     }
   },
   created () {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     axios.get(`${this.$root.$data.restServer}/api/room`)
          .then(response => {
            this.rooms = response.data
            this.setPublicRooms()
            this.setPrivateRooms()
          })
          .catch(e => {
            this.errors.push(e)
          })

     this.$root.$data.socket.on('new-room', function (data) {
       if (!data.message.private) {
         this.publicRooms.push(data.message)
       } else if (data.message.private
                  && data.message.allowed_users.includes(this.$root.user._id)) {
         this.privateRooms.push(data.message)

       }

     }.bind(this))

   },
   methods: {
     onSubmit() {
       this.room.main = false
       this.room.private = false
       axios.post(`${this.$root.$data.restServer}/api/room`, this.room)
            .then(response => {

              this.$root.$data.socket.emit('save-room', response.data)

              this.$router.push({
                name: 'room',
                params: { roomid: response.data._id }
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
     },
     setPublicRooms() {
       this.publicRooms = this.rooms
                              .filter(x => !x.private)
                              .filter(x => !x.main)
     },
     setPrivateRooms() {
       this.privateRooms =  this.rooms
                                .filter(x => x.private)
                                .filter(x => x.allowed_users.includes(this.$root.user._id))
     }
   },
   computed: {
   }
 }
</script>
<style scoped>
 .margin {
   margin-left: 1.3rem;
 }
 .border {
   border: 1px solid black;
   max-width: 50vw;
   padding: 1rem;
 }
</style>
