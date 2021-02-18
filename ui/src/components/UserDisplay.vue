<template>
  <p class="userdisplay"
     v-if="userObj"
     :class="{'is-you': isYou()}">
    <span class="userdisplay__permission"
          v-if="userObj.hasPermission"
          :aria-label="$t('user.status.stage')"
          :title="$t('user.status.stage')">🎭</span>
    <span class="userdisplay__permission"
          v-if="userObj.isMod"
          :aria-label="$t('user.status.mod')"
          :title="$t('user.status.mod')">👑</span>
    <strong class="userdisplay__uname" v-if="userObj.nickname">{{ userObj.nickname }}</strong>
    <strong class="userdisplay__uname" v-else>{{ user }}</strong>
  </p>
</template>
<script>
 export default {
   name: "UserDisplay",
   props: ['user', 'noName'],
   data() {
     return {
       userObj: {}
     }
   },
   created() {
     this.getUserObj();
   },
   methods: {
     getUserObj() {
       if (typeof this.user === 'string')  {
         if (this.user === this.$root.$data.user._id) {
           this.userObj = this.$root.$data.user;
         } else {
           const potUser =  this.$root.$data.otherPeople.filter(x => x._id === this.user);
           this.userObj = (potUser.length == 1) ? potUser[0] : { _id : this.user };
         }
       } else {
         this.userObj = this.user;
       }
     },
     isYou() {
       return this.userObj._id == this.$root.$data.user._id;
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
