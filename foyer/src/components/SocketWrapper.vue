<template>
  <div>
    <slot />
  </div>
</template>
<script>
 import { removeByAttr } from '@/lib/utils';
 import { saveUserToStore } from '@/lib/storage';

 export default {
   name: "SocketWrapper",
   created() {

     this.$root.$data.socket.on('new-user', (data) => {
       console.log('new-user', data.message)
       this.$root.$data.otherPeople.push(data.message);
     });

     this.$root.$data.socket.on('delete-user', (data) => {
       console.log('delete-user', data.message)
       removeByAttr(this.$root.$data.otherPeople, '_id', data.message._id);
     });

     this.$root.$data.socket.on('new-message', (data) => {
       this.$root.$data.chats.push(data.message);
     });

     this.$root.$data.socket.on('delete-message', (data) => {
       console.log(data)
       this.$root.$data.chats = removeByAttr(this.$root.$data.chats, '_id', data.message._id);
     });

     this.$root.$data.socket.on('user-to-stage', (data) => {
       this.isMyselfOnStage(data.message);
       saveUserToStore(this.$root.$data.user);
     })

     this.$root.$data.socket.on('user-off-stage', (data) => {
       this.isMyselfOnStage(data.message);
       saveUserToStore(this.$root.$data.user);
     })

     this.$root.$data.socket.on('user-2-mod', (data) => {
       //console.log(data)
       this.$root.$data.otherPeople = this.$root.$data.otherPeople.map(p => {
         if (p._id == data.message._id) {
           p.isMod = !data.message.isMod;
         }
         return p;
       });
       this.isMyselfAMod(data.message);
       saveUserToStore(this.$root.$data.user);
     })
     this.$root.$data.socket.on('mod-2-user', (data) => {
       //console.log(data)
       this.$root.$data.otherPeople = this.$root.$data.otherPeople.map(p => {
         if (p._id == data.message._id) {
           p.isMod = !data.message.isMod;
         }
         return p;
       });
       this.isMyselfAMod(data.message);
       saveUserToStore(this.$root.$data.user);
     })
   },
   methods: {
     isMyselfOnStage(data) {
       if (data._id === this.$root.$data.user._id) {
         this.$root.$data.user.hasPermission = !data.hasPermission;
         let note = this.$root.$data.user.hasPermission ? this.$t('user.notification.onstage') : this.$t('user.notification.offstage');
         this.$root.$data.notifications = [note];
       }
     },
     isMyselfAMod(data) {
       //console.log(data)
       if (data._id === this.$root.$data.user._id) {
         this.$root.$data.user.isMod = !data.isMod;
         let note = this.$root.$data.user.isMod ? this.$t('user.notification.isMod') : this.$t('user.notification.isUser');
         this.$root.$data.notifications = [note];
       }
     }
   }
 }
</script>
