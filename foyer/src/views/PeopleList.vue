<template>
  <div>
    <h2>People List</h2>
    <ul v-for="p in $root.$data.otherPeople" v-if="$root.$data.otherPeople.length > 1">
      <li v-if="p._id != $root.user._id">
        <h3>{{p.nickname}}</h3>
        <p>joined {{p.created_date}}</p>
        <button @click="startChatWith(p)">Privaten Chat starten</button>
      </li>
    </ul>
    <p v-else>Keine anderen Leute online.</p>
  </div>
</template>

<script>
 import axios from 'axios'

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
       this.removeByAttr(this.$root.$data.otherPeople, '_id', data.message._id)
     }.bind(this))

   },
   methods: {
     startChatWith(person) {
       console.log(person)
       this.newPrivRoom.main = false
       this.newPrivRoom.private = true
       this.newPrivRoom.allowed_users = [person._id, this.$root.user._id]
       this.newPrivRoom.room_name = `Chat ${person.nickname} - ${this.$root.user.nickname}`
       //debugger
       axios.post(`${this.$root.$data.restServer}/api/room/`, this.newPrivRoom)
            .then(response => {
              //debugger
              this.$root.$data.socket.emit('save-room', response.data)
              console.log(response)
              this.$router.push({
                name: 'room',
                params: { roomid: response.data._id}
              })
            })
            .catch(e => {
              this.errors.push(e)
              console.log(e)
            })
     },
     removeByAttr(arr, attr, value) {
       var i = arr.length;
       while(i--){
         if( arr[i]
          && arr[i].hasOwnProperty(attr)
          && (arguments.length > 2 && arr[i][attr] === value)) {
           arr.splice(i,1);
         }
       }
       return arr;
     }
   }
 }
</script>
