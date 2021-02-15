<template>
  <div class="appheader outsidenav">
    <router-link :to="{ name: 'index'}" class="outsidenav__logo"><Logo /></router-link>
    <UserPanel />
    <Notifications :notifications="notifications" />
  </div>
</template>
<script>
 import Logo from '@/components/Logo'
 import Notifications from '@/components/Notifications'
 import UserPanel from '@/components/UserPanel'

 export default {
   name: "AppHeader",
   props: ['notifications'],
   components: {
     Logo,
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
