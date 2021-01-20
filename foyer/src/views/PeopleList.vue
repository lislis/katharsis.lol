<template>
  <div>
    <h2>People List</h2>
    <fragment v-if="$root.$data.otherPeople.length > 1">
      <ul v-for="p in $root.$data.otherPeople"
          :key="p._id">
        <li v-if="p._id != $root.user._id">
          <h3>{{p.nickname}}</h3>
          <p v-if="p.hasPermission">ist auf der Bühne</p>
          <p>joined {{p.created_date}}</p>
          <button @click="startChatWith(p)">Privaten Chat starten</button>
        </li>
      </ul>
    </fragment>
<p v-else>Keine anderen Leute online.</p>
  </div>
</template>

<script>
 import axios from 'axios'
 import { removeByAttr } from '@/lib/utils'

 export default {
   name: 'PeopleList',
   data () {
     return {
       //people: [],
       errors: [],
       newPrivRoom: {}
     }
   },
   created () {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     axios.get(`${this.$root.$data.restServer}/api/user/`)
          .then(response => {
            this.$root.$data.otherPeople = response.data
          })
          .catch(e => { console.log(e) })

     this.$root.$data.socket.on('new-user', function (data) {
       this.$root.$data.otherPeople.push(data.message)
     }.bind(this))

     this.$root.$data.socket.on('delete-user', function (data) {
       removeByAttr(this.$root.$data.otherPeople, '_id', data.message._id)
     }.bind(this))

   },
   methods: {
     startChatWith(person) {
       console.log(person)
       this.newPrivRoom.main = false
       this.newPrivRoom.private = true
       this.newPrivRoom.allowed_users = [person._id, this.$root.user._id]
       this.newPrivRoom.room_name = `Chat ${person.nickname} - ${this.$root.user.nickname}`
       axios.post(`${this.$root.$data.restServer}/api/room/`, this.newPrivRoom)
            .then(response => {
              this.$root.$data.socket.emit('save-room', response.data)
              console.log(response)
              this.$router.push({
                name: 'room',
                params: { roomid: response.data._id}
              })
            })
            .catch(e => {
              this.$root.$data.notifications.push(e)
            })
     }
   }
 }
</script>
