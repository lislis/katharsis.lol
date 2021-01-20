<template>
  <div class="app">
    <SocketWrapper>
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
    </SocketWrapper>
  </div>
</template>

<script>
 import axios from 'axios'
 import io from 'socket.io-client';
 import SocketWrapper from '@/components/SocketWrapper'
 import { loadUserFromStorage } from '@/lib/storage'

 export default {
   name: 'App',
   components: {
     SocketWrapper,
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
     this.setSocketServer();
     this.connectToSocket();
     this.getMainRoom()
     this.getAllPeople()
     this.getAllChats()
     this.user = loadUserFromStorage()
   },
   methods: {
     setSocketServer() {
       if (process.env.NODE_ENV === 'production') {
         this.$root.$data.socketServer = `https://${process.env.VUE_APP_WS_HOST}`
         this.$root.$data.restServer = `https://${process.env.VUE_APP_API_HOST}`
         this.$root.$data.botBrain = `https://${process.env.VUE_APP_BOTBRAIN}`
       } else {
         this.$root.$data.socketServer = `http://${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`
         this.$root.$data.restServer = `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
         this.$root.$data.botBrain = `http://${process.env.VUE_APP_BOTBRAIN}:${process.env.VUE_APP_BOTBRAIN_PORT}`
       }
     },
     connectToSocket() {
       this.$root.$data.socket = io(this.$root.$data.socketServer)
     },
     async getMainRoom() {
       let response = await axios.get(`${this.restServer}/api/room/main`);
       this.$root.$data.stage = response.data.filter(x => x.locked)[0];
       this.$root.$data.mainRoom = response.data.filter(x => !x.locked)[0];
     },
     async getAllPeople() {
       let response = await axios.get(`${this.restServer}/api/user`);
       this.otherPeople = response.data
     },
     async getAllChats() {
       let response = await axios.get(`${this.restServer}/api/chat`)
       this.chats = response.data
     },
   }
 }
</script>

<style>
 @import './assets/reboot.css';
 @import './assets/base.css';

</style>
