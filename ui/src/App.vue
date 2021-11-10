<template>
<div class="app">
  <SocketWrapper>
    <main>
      <router-view />
    </main>
    <AppMeta />
  </SocketWrapper>
</div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client';
import SocketWrapper from '@/components/SocketWrapper'
import AppMeta from '@/components/AppMeta';
import { loadUserFromStorage } from '@/lib/storage'

export default {
  name: 'App',
  components: {
    SocketWrapper,
    AppMeta
  },
  data() {
    return {
      user: {},
      characterTree: {},
      characterProgress: {},
      ownCharacter: {},
      loggedMyselfOut: false,
      otherPeople: [],
      mainRoom: null,
      stage: null,
      chats: [],
      rooms: [],
      restServer: null,
      socketServer: null,
      botBrain: null,
      socket: null,
      storagePrefix: null,
      imprintLink: null,
      gdprLink: null,
      notifications: [],
      plays: []
    }
  },
  created() {
    this.setSocketServer();
    this.connectToSocket();
    this.getMainRoom();
    this.getAllRooms();
    this.getAllPeople();
    this.getAllChats();
    this.getAllPlays();
    this.getCharacterSheets();
    this.user = loadUserFromStorage();
  },
  methods: {
    setSocketServer() {
      if (process.env.NODE_ENV === 'production') {
        this.$root.$data.socketServer = `https://${process.env.VUE_APP_WS_HOST}`
        this.$root.$data.restServer = `https://${process.env.VUE_APP_API_HOST}`
      } else {
        this.$root.$data.socketServer = `http://${process.env.VUE_APP_WS_HOST}`
        this.$root.$data.restServer = `http://${process.env.VUE_APP_API_HOST}`
      }
      if (process.env.VUE_APP_LINK_IMPRINT && process.env.VUE_APP_LINK_IMPRINT !== "") {
        this.$root.$data.imprintLink = `${process.env.VUE_APP_LINK_IMPRINT}`;
      }
      if (process.env.VUE_APP_LINK_GDPR && process.env.VUE_APP_LINK_GDPR !== "") {
        this.$root.$data.gdprLink = `${process.env.VUE_APP_LINK_GDPR}`;
      }
    },
    connectToSocket() {
      this.$root.$data.socket = io(this.$root.$data.socketServer)
    },
    async getMainRoom() {
      let response = await axios.get(`${this.restServer}/api/room/main`);
      if (response.data.length !== 0) {
        this.$root.$data.stage = response.data.filter(x => x.locked)[0];
        this.$root.$data.mainRoom = response.data.filter(x => !x.locked)[0];
        this.$root.$data.stage.typing = false;
        this.$root.$data.mainRoom.typing = false;
      } else {
        this.$root.$data.stage = null;
        this.$root.$data.mainRoom = null;
        setTimeout(() => {
          this.getMainRoom();
        }, 1000);
      }

    },
    async getAllRooms() {
      let response = await axios.get(`${this.restServer}/api/room`);
      this.rooms = response.data
        .map(x => {x.typing = true; return x})
        .filter(x => !x.main);
    },
    async getAllPeople() {
      let users = await axios.get(`${this.restServer}/api/user`);
      let characters = await axios.get(`${this.restServer}/api/character`);

      this.otherPeople = characters.data.map((x) => {
        let u = users.data.find((y) => { y._id === x.user });
        return u ? u : { character: x }
      })
    },
    async getAllChats() {
      let response = await axios.get(`${this.restServer}/api/chat`)
       this.chats = response.data
     },
     async getAllPlays() {
       let response = await axios.get(`${this.restServer}/api/play`);
       this.plays = response.data;
     },
    async getCharacterSheets() {
      let dataSheet = await axios.get(`${this.$root.$data.restServer}/api/setting/bykey/characterSheet`);
      this.$root.$data.characterTree = JSON.parse(dataSheet?.data[0].value);
    }
   }
 }
</script>

<style>
 @import './assets/main.css';
</style>
