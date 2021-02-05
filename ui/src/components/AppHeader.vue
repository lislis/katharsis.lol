<template>
  <div class="">
    <div class="aheader">
      <p><router-link :to="{ name: 'index'}" class="nav__title">Katharsis.lol</router-link></p>
      <UserPanel />
    </div>

    <Notifications :notifications="notifications" />
  </div>
</template>
<script>
 import Notifications from '@/components/Notifications'
 import UserPanel from '@/components/UserPanel'

 export default {
   name: "AppHeader",
   props: ['notifications'],
   components: {
     UserPanel,
     Notifications
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
</style>
