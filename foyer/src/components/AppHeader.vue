<template>
  <div class="">
    <div class="aheader">
      <p><router-link :to="{ name: 'index'}" class="nav__title">Katharsis.lol</router-link></p>
      <UserPanel />
    </div>

    <div class="notifications">
      <div v-for="(note, id) in notifications" :key="id"  class="note">
        {{note}}
        <button @click.prevent="removeNotification(id)"
                type="button"
                class="btn"
                :aria-label="$t('ui.button.close')">❌</button></div>
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
   methods: {
     removeNotification(ev, id) {
       removeByIndex(this.$root.$data.notifications, id)
     }
   }
 }
</script>
<style scoped>
 .aheader {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   padding: 0 1rem;
 }
 .notifications {
   text-align: center
 }
 .note {
   padding: 1em;
 }
</style>
