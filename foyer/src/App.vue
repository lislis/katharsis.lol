<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
 export default {
   name: 'App',
   data() {
     return {
       username: 'test',
       user: {},
       mainRoom: {},
       chats: [],
       restServer: null,
       socketServer: null,
     }
   },
   created() {
     if (process.env.NODE_ENV === 'production') {
       this.socketServer = `${process.env.VUE_APP_WS_HOST}`
       this.restServer = `${process.env.VUE_APP_API_HOST}`
     } else {
       this.socketServer = `${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}`
       this.restServer = `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
     }
     if (window.localStorage.getItem(`${process.env.VUE_APP_LS_PREFIX}user`)) {
       this.user = JSON.parse(window.localStorage.getItem(`${process.env.VUE_APP_LS_PREFIX}user`))
     }
   }
 }
</script>

<style>
</style>
