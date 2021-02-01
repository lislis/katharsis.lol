<template>
  <div class="upanel">
    <UserDisplay :user="$root.$data.user" />
    <UserLogout class="btn">{{ $t('intro.leave') }}</UserLogout>
  </div>
</template>
<script>
 import UserDisplay from '@/components/UserDisplay'
 import UserLogout from '@/components/UserLogout'

 export default {
   name: "UserPanel",
   components: {
     UserLogout,
     UserDisplay
   },
   methods: {
   }
 }
</script>
<style scoped>
</style>
