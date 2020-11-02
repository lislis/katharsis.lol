<template>
  <div>
    <h2>Alle Räume</h2>
    <ul v-for="room in rooms">
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
      <h2>Neuen Raum erstellen</h2>
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
       errors: []
     }
   },
   created () {
     axios.get(`http://${this.$root.$data.restServer}/api/room`)
          .then(response => {
            this.rooms = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
   },
   methods: {
     onSubmit(evt) {
       this.room.main = false
       this.room.public = false
       axios.post(`http://${this.$root.$data.restServer}/api/room`, this.room)
            .then(response => {
              this.$router.push({
                name: 'roomlist'
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
     }
   }
 }
</script>
