<template>
  <div class="upanel">
    <span class="upanel__uname">{{ $root.$data.user.nickname }}</span>
    <span class="upanel__permission"
          v-if="$root.$data.user.hasPermission">auf der Bühne</span>

    <UserLogout class="btn">{{ $t('intro.leave') }}</UserLogout>
  </div>
</template>
<script>
 import UserLogout from '@/components/UserLogout'

 export default {
   name: "UserPanel",
   components: { UserLogout },
   methods: {
   }
 }

</script>
