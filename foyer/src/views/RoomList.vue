<template>
  <div>
    <h2>
      Room List
      <router-link to="/addroom">(Add room)</router-link>
    </h2>
    <ul v-for="room in rooms">
      <li>{{room.room_name}} <router-link :to="{name: 'JoinRoom', params: {id: room._id}}">join</router-link></li>
    </ul>

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
       fields: {
         room_name: { label: 'Room Name', sortable: true, 'class': 'text-center' },
         created_date: { label: 'Created Date', sortable: true },
         actions: { label: 'Action', 'class': 'text-center' }
       },
       rooms: [],
       errors: []
     }
   },
   created () {
     //debugger
     axios.get("http://localhost:3000/api/room")
          .then(response => {
            //debugger
            this.rooms = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
   },
   methods: {
     join (id) {
       this.$router.push({
         name: 'JoinRoom',
         params: { id: id }
       })
     }
   }
 }
</script>
