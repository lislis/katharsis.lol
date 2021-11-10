<template>
  <div class="socketwrapper">
    <slot />
  </div>
</template>
<script>
import { removeByAttr } from '@/lib/utils';
import {
  saveUserToStore,
  deleteUserFromStorage } from '@/lib/storage';

export default {
  name: "SocketWrapper",
  created() {

    this.$root.$data.socket.on('new-user', (data) => {
      this.$root.$data.otherPeople.push(data.message);
    });

    this.$root.$data.socket.on('delete-user', (data) => {
      let u = this.$root.$data.otherPeople.find(x => x._id === data.message.user)
      let character = u.character;

      this.removeMyselfFromStorage(data.message);
      console.log(this.$root.$data.otherPeople);
      this.$root.$data.otherPeople = [
        ...this.$root.$data.otherPeople.filter(x => x._id !== data.message.user),
        { character }
      ]
      console.log(this.$root.$data.otherPeople);
    });

    this.$root.$data.socket.on('new-message', (data) => {
      this.$root.$data.chats.push(data.message);
    });

    this.$root.$data.socket.on('delete-message', (data) => {
      this.$root.$data.chats = removeByAttr(this.$root.$data.chats, '_id', data.message._id);
    });

    this.$root.$data.socket.on('new-character', (data) => {
      let p = this.$root.$data.otherPeople.find(x => x._id === data.message.user) || {};
      p.character = data.message;

      this.$root.$data.otherPeople = [
        ...this.$root.$data.otherPeople.filter(x => x._id !== data.message.user),
        p
      ]
    });

    this.$root.$data.socket.on('delete-character', (data) => {
      this.$root.$data.otherPeople = [
        ...this.$root.$data.otherPeople.filter(x => x.character._id !== data.message.character)
      ]
    });

    this.$root.$data.socket.on('character-to-stage', (data) => {
      this.updatePermissionInUserStorage(data.message);
      this.isMyselfOnStage(data.message);
      saveUserToStore(this.$root.$data.user);
    });

    this.$root.$data.socket.on('characters-all-off-stage', () => {
      if (this.$root.$data.user.character.hasPermission) {
        this.$root.$data.user.character.hasPermission = false;
        this.$root.$data.notifications.push(this.$t('user.notification.offstage'));
      }
      this.$root.$data.characters = this.$root.$data.otherPeople.map(p => {
        p.character.hasPermission = false;
        return p;
      });
      saveUserToStore(this.$root.$data.user);
    });

    this.$root.$data.socket.on('user-2-mod', (data) => {
      this.updateModInPersonStorage(data.message);
      this.isMyselfAMod(data.message);
      saveUserToStore(this.$root.$data.user);
    });

    this.$root.$data.socket.on('mod-2-user', (data) => {
      this.updateModInPersonStorage(data.message);
      this.isMyselfAMod(data.message);
      saveUserToStore(this.$root.$data.user);
    });

    this.$root.$data.socket.on('clear-stage', (data) => {
      this.$root.$data.chats = this.$root.$data.chats.filter(m => {
        return m.room !== data.message._id;
      })
    });

    this.$root.$data.socket.on('clear-everything', () => {
      this.$root.$data.chats = [];
    });

    this.$root.$data.socket.on('started-typing', (data) => {
      this.updateRoomIsTyping(data, true);
    });

    this.$root.$data.socket.on('stopped-typing', (data) => {
       this.updateRoomIsTyping(data, false);
     });
   },
   methods: {
     isMyselfOnStage(data) {
       if (data._id === this.$root.$data.user.character._id) {
         this.$root.$data.user.character.hasPermission = !data.hasPermission;
         let note = this.$root.$data.user.character.hasPermission ? this.$t('user.notification.onstage') : this.$t('user.notification.offstage');
         this.$root.$data.notifications = [note];
       }
     },
     isMyselfAMod(data) {
       if (data._id === this.$root.$data.user._id) {
         this.$root.$data.user.isMod = !data.isMod;
         let note = this.$root.$data.user.isMod ? this.$t('user.notification.isMod') : this.$t('user.notification.isUser');
         this.$root.$data.notifications = [note];
       }
     },
     updatePermissionInUserStorage(updatedCharacter) {
       this.$root.$data.otherPeople = this.$root.$data.otherPeople.map(p => {
         if (p.character._id == updatedCharacter._id) {
           p.character.hasPermission = !updatedCharacter.hasPermission;
         }
         return p;
       });
     },
     updateModInPersonStorage(updatedUser) {
       this.$root.$data.otherPeople = this.$root.$data.otherPeople.map(p => {
         if (p._id == updatedUser._id) {
           p.isMod = !updatedUser.isMod;
         }
         return p;
       });
     },
     updateRoomIsTyping(data, bool) {
       console.log(data);
       if (data.character != this.$root.$data.user.character._id) {
         if (this.$root.$data.mainRoom._id == data.room) {
           this.$root.$data.mainRoom.typing = bool;
         }
         if (this.$root.$data.stage._id == data.room) {
           this.$root.$data.stage.typing = bool;
         }
         this.$root.$data.rooms = this.$root.$data.rooms.map(r => {
           if (r._id == data.room) {
             r.typing = bool;
           }
           return r;
         });
       }
     },
     removeMyselfFromStorage(user) {
       if (user._id == this.$root.$data.user._id) {
         this.$root.$data.user = {};
         deleteUserFromStorage();
         if (!this.$root.$data.loggedMyselfOut) {
           this.$root.$data.notifications.push(this.$t('user.notification.wasRemoved'));
         }
         this.$router.push({
           name: 'index'
         });
       }
     }
   }
 }
</script>
