<template>
  <div class="upanel">
    <span class="upanel__uname">{{ $root.$data.user.nickname }}</span>
    <span class="upanel__permission"
          v-if="$root.$data.user.hasPermission">auf der Bühne</span>
    <button class="upanel__logout" @click="logout">Logout</button>
  </div>
</template>
<script>
 import { logout } from '@/lib/user';

 export default {
   name: "UserPanel",
   methods: {
     logout() {
       logout(this);
     }
   }
 }

</script>
