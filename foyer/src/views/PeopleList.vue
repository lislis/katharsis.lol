<template>
  <div>
    <h2>People List</h2>
    <ul v-for="p in people">
      <li v-if="p._id != $root.user._id">
        <h3>{{p.nickname}}</h3>
        <p>joined {{p.created_date}}</p>
        <button @click="startChatWith(p)">Privaten Chat starten</button>
      </li>
    </ul>
  </div>
</template>

<script>
 import axios from 'axios'

 export default {
   name: 'PeopleList',
   data () {
     return {
       people: [],
       errors: [],
       newPrivRoom: {}
     }
   },
   created () {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     axios.get(`http://${this.$root.$data.restServer}/api/user/`)
          .then(response => {
            //debugger
            this.people = response.data
          })
          .catch(e => { console.log(e) })

     this.$root.$data.socket.on('new-user', function (data) {
       //debugger
       this.people.push(data.message)
     }.bind(this))

     this.$root.$data.socket.on('delete-user', function (data) {
       //debugger
       this.removeByAttr(this.people, '_id', data.message._id)
       //this.people.remove() push(data.message)
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
       axios.post(`http://${this.$root.$data.restServer}/api/room/`, this.newPrivRoom)
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
