<template>
  <div class="appheader">
    <header class="header" v-if="$root.$data.user.nickname">
      <p>Katharsis.lol</p>
      <UserPanel />
    </header>
    <div class="notifications">
      <div v-for="(note, id) in notifications" :key="id"  class="note">
        {{note}}
        <button @click.prevent="removeNotification(id)"
                type="button">x</button></div>
    </div>
  </div>
</template>
<script>
 import UserPanel from '@/components/UserPanel'
 import { removeByIndex } from '@/lib/utils'

 export default {
   name: "AppHeader",
   props: ['notifications'],
   components: {
     UserPanel
   },
   watch: {
     '$root.$data.notifications'(newOnes) {
       console.log('node', newOnes)
     }
   },
   methods: {
     removeNotification(ev, id) {
       console.log("rm ", ev)
       removeByIndex(this.$root.$data.notifications, id)
     }
   }
 }
</script>
<style>
 .notifications {
   text-align: center
 }
 .note {
   padding: 1em;
 }
</style>
