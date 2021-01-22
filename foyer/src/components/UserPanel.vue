<template>
  <div class="upanel">
    <span class="upanel__permission"
          v-if="$root.$data.user.hasPermission"
          :aria-label="$t('user.status.stage')"
          :title="$t('user.status.stage')">🎭</span>
    <span class="upanel__permission"
          v-if="$root.$data.user.isMod"
          :aria-label="$t('user.status.mod')"
          :title="$t('user.status.mod')">👑</span>

    <strong class="upanel__uname">{{ $root.$data.user.nickname }}</strong>

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
<style scoped>
 .upanel__permission {
   display: inline-block;
   margin: 0 .3em;
   font-size: 1.4em;
   line-height: 1;
 }
 .upanel__uname {
   display: inline-block;
   margin: 0 2em 0 .3rem;
 }
</style>
