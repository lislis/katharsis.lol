<template>
  <div class="app">
    <main>
      <router-view />
    </main>
    <footer>
      <div class="inner">
        <p>Katharsis.lol by <a href="http://www.sternapau.de/" target="_blank">sterna | pau</a></p>
        <p><a href="#">{{ $t('legal.imprint') }}</a> | <a href="#">{{ $t('legal.gdpa') }}</a></p>
        <div class="locale-changer">
          <select v-model="$i18n.locale">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
          </select>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
 import axios from 'axios'
 import io from 'socket.io-client'
 import Loader from '@/components/Loader'
 import { removeByAttr } from '@/lib/utils'
 import { loadUserFromStorage } from '@/lib/storage'

 export default {
   name: 'App',
   components: {
     Loader,
   },
   data() {
     return {
       user: {},
       otherPeople: [],
       mainRoom: {},
       stage: {},
       chats: [],
       restServer: null,
       socketServer: null,
       botBrain: null,
       socket: null,
       storagePrefix: null,
       notifications: []
     }
   },
   created() {
     this.setSocketServer()
     this.connectToSocket()
     this.getMainRoom()
     this.getAllPeople()
     this.user = loadUserFromStorage()

     this.$root.$data.socket.on('new-user', function (data) {
       this.$root.$data.otherPeople.push(data.message)
     }.bind(this))

     this.$root.$data.socket.on('delete-user', function (data) {
       removeByAttr(this.$root.$data.otherPeople, '_id', data.message._id)
     }.bind(this))

   },
   methods: {
     getMainRoom() {
       axios.get(`${this.restServer}/api/room/main`)
            .then(response => {
              this.$root.$data.stage = response.data.filter(x => x.locked)[0]
              this.$root.$data.mainRoom = response.data.filter(x => !x.locked)[0]
            })
            .catch(e => { this.notifications.push(e) })
     },
     getAllPeople() {
       axios.get(`${this.restServer}/api/user`)
            .then(response => {
              this.otherPeople = response.data
            })
            .catch(e => { this.notifications.push(e) })
     },
     setSocketServer() {
       if (process.env.NODE_ENV === 'production') {
         this.socketServer = `https://${process.env.VUE_APP_WS_HOST}`
         this.restServer = `https://${process.env.VUE_APP_API_HOST}`
         this.botBrain = `https://${process.env.VUE_APP_BOTBRAIN}`
       } else {
         this.socketServer = `http://${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`
         this.restServer = `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
         this.botBrain = `http://${process.env.VUE_APP_BOTBRAIN}:${process.env.VUE_APP_BOTBRAIN_PORT}`
       }
     },
     connectToSocket() {
       this.socket = io(this.socketServer)
     }
   }
 }
</script>

<style>
 @import './assets/reboot.css';
 @import './assets/base.css';

</style>
