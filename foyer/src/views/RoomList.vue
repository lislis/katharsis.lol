<template>
  <div>
    <h2>Alle Räume</h2>
    <ul v-for="room in publicRooms">
      <li>
        <h3><span v-if="room.main">👑</span> {{room.room_name}}</h3>
        <router-link
          v-if="room.main"
          :to="{name: 'room', params: { roomid: room._id}}">Zu {{room.room_name}}</router-link>
        <router-link
          v-else
          :to="{name: 'room', params: { roomid: room._id}}">{{ room.room_name}} beitreten</router-link>
      </li>
    </ul>

    <section>
      <h2>Private Räume</h2>
      <ul v-for="room in privateRooms">
        <li>
          <h3><span v-if="room.main">👑</span> {{room.room_name}}</h3>
          <router-link
            v-if="room.main"
            :to="{name: 'room', params: { roomid: room._id}}">Zu {{room.room_name}}</router-link>
          <router-link
            v-else
            :to="{name: 'room', params: { roomid: room._id}}">In den Chat</router-link>
        </li>
      </ul>
    </section>

    <section>
      <h2>Neuen öffentlichen Raum erstellen</h2>
      <form @submit.prevent="onSubmit">
        <label>
          Raumname
          <input id="room_name" v-model.trim="room.room_name">
        </label>
        <button type="submit">Erstellen und beitreten</button>
      </form>
    </section>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>

 import axios from 'axios'

 export default {
   name: 'RoomList',
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

     axios.get(`http://${this.$root.$data.restServer}/api/room`)
          .then(response => {
            this.rooms = response.data
            this.setPublicRooms()
            this.setPrivateRooms()
          })
          .catch(e => {
            this.errors.push(e)
          })

     this.$root.$data.socket.on('new-room', function (data) {
       console.log(data.message)
       //debugger
       if (!data.message.private) {
         this.publicRooms.push(data.message)
       } else if (data.message.private
                  && data.message.allowed_users.includes(this.$root.user._id)) {
         this.privateRooms.push(data.message)

       }
       //debugger

     }.bind(this))

   },
   methods: {
     onSubmit(evt) {
       this.room.main = false
       this.room.private = false
       axios.post(`http://${this.$root.$data.restServer}/api/room`, this.room)
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
       //debugger
       this.publicRooms = this.rooms.filter(x => !x.private)
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
