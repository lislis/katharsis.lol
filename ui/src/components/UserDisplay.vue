<template>
  <p class="userdisplay"
     :class="{'is-you': isYou()}">
    <span class="userdisplay__permission"
          v-if="userCharacter.hasPermission"
          :aria-label="$t('user.status.stage')"
          :title="$t('user.status.stage')">🎭</span>
    <span class="userdisplay__permission"
          v-if="userObj.isMod"
          :aria-label="$t('user.status.mod')"
          :title="$t('user.status.mod')">👑</span>
    <strong class="userdisplay__uname" v-if="user">{{ user }}</strong>
    <strong class="userdisplay__uname" v-if="userCharacter">{{ userCharacter.name }}</strong>
  </p>
</template>
<script>
 export default {
   name: "UserDisplay",
   props: ['user', 'userObj', 'noName'],
   methods: {
     isYou() {
       return this.userObj._id == this.$root.$data.user._id;
     }
   },
   computed: {
     userCharacter() {
       return {"name": "Placeholder", "hasPermission": false}
     }
   }
 }
</script>
<style scoped>
 .userdisplay {
   display: inline-block;
   margin: 0;
 }

 .userdisplay__permission {
   display: inline-block;
   margin: 0 .2rem;
   font-size: 1.1rem;
   line-height: 1;
 }
 .userdisplay__uname {
   display: inline-block;
   margin: 0 0.3rem 0 .3rem;
 }
</style>
