<template>
  <div class="upanel">
    <div class="upanel__user"  v-if="$root.$data.user?.character">
      <span>{{ $t('user.status.joinedAs')}}</span><br>
      <UserDisplay :userObj="$root.$data.user" />
    </div>
    <UserLogout>{{ $t('intro.leave') }}</UserLogout>
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
   }
 }
</script>
