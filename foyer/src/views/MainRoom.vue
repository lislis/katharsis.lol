<template>
  <div class="mainroom-view">
    <div class="mainroom-split">
      <Loader v-if="loading" />
      <template v-else>
        <Chat
          :messages="stageMessages"
          :username="$root.$data.user.nickname"
          :room="stageRoom" />

        <Chat
          :messages="backstageMessages"
          :username="$root.$data.user.nickname"
          :room="backstageRoom" />
      </template>
    </div>
  </div>
</template>
<script>
 import Chat from '@/components/Chat.vue'
 import axios from 'axios'
 import {saveUserToStore} from '@/lib/storage'

 export default {
   name: "MainRoom",
   components: {
     Chat,
   },
   data() {
     return {
       stageRoom: {},
       backstageRoom: {},
       stageMessages: [],
       backstageMessages: [],
       errors: [],
       messages: [],
       loading: true,
       isOnStage: null
     }
   },
   watch: {
     '$route.params.roomid': {
       handler(roomid) {
         if (roomid !== undefined) {
           this.getChatHistory()
         }
       }
     }
   },
   async created() {
     if (!this.$root.$data.user.nickname) {
       this.$router.push({name: 'intro'})
     }

     this.loading = true;
     axios.get(`${this.$root.$data.restServer}/api/room/main`).then(response => {
       this.$root.$data.stage = response.data.filter(x => x.locked)[0]
       this.$root.$data.mainRoom = response.data.filter(x => !x.locked)[0]

       this.stageRoom = this.$root.$data.stage
       this.backstageRoom = this.$root.$data.mainRoom

       this.loading = false;
       axios.get(`${this.$root.$data.restServer}/api/chat/${this.stageRoom._id}`)
                                .then(x => {
                                  this.stageMessages = x.data
                                })
       axios.get(`${this.$root.$data.restServer}/api/chat/${this.backstageRoom._id}`)
                                .then(x => {
                                  this.backstageMessages = x.data
                                })
     }).catch(e => { console.log(e) })


     this.$root.$data.socket.on('new-message', function (data) {
       if(data.message.room === this.stageRoom._id) {
         this.stageMessages.push(data.message)
       }
       if(data.message.room === this.backstageRoom._id) {
         this.backstageMessages.push(data.message)
       }
     }.bind(this))

     this.$root.$data.socket.on('user-to-stage', function (data) {
       this.isMyselfOnStage(data.message);
       saveUserToStore(this.$root.$data.user);
     }.bind(this))

     this.$root.$data.socket.on('user-off-stage', function (data) {
       this.isMyselfOnStage(data.message);
       saveUserToStore(this.$root.$data.user);
     }.bind(this))

     // should go to runner
     if (Math.random() > 0.5) {
       axios.get(`${this.$root.$data.botBrain}/api/direction/bytype/Technik`)
            .then(x => {
              axios.post(`${this.$root.$data.restServer}/api/chat`, {
                message: x.data[0],
                room: this.$root.$data.stage._id,
                bot: true
              }).then(response => {
                this.$root.$data.socket.emit('save-message', response.data)
              }).catch(e => console.log(e))
            }).catch(e => console.log(e))

     }
   },
   methods: {
     isMyselfOnStage(data) {
       if (data._id === this.$root.$data.user._id) {
         //console.log("I am on stage", !data.hasPermission);
         this.$root.$data.user.hasPermission = !data.hasPermission;
         let note = this.$root.$data.user.hasPermission ? "auf die Bühne!" : "Runter von der Bühne";
         this.$root.$data.notifications = [note]
         //console.log(this.$root.$data.notifications)
       }
     }
   }
 }
</script>
<style scoped>
 .mainroom-split {
   display: flex;
   flex-wrap: nowrap;
 }
 .chat {
   border: 2px solid black;
 }
</style>
