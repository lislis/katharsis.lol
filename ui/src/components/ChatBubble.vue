<template>
  <li class="chat__message"
      :class="allTheClasses">
    <div class="chat__message-inner">
      <fragment v-if="room.locked">
        <div class="chat__message__user-inline" v-if="message.user" :style="styleObject">
          <UserDisplay :user="message.user" />:
        </div>
        <p class="chat__message-bubble chat__message-bubble--inline" v-html="message.message"></p>
      </fragment>
      <fragment v-else>
        <header v-if="message.user">
          <UserDisplay :user="message.user" />
        </header>
        <p class="chat__message-bubble" :style="styleObject" v-html="message.message"></p>
        <aside>
          <time datetime="this.message.created_date" :title="date">{{ date_ago }}</time>
        </aside>
      </fragment>
    </div>
  </li>
</template>
<script>
 import UserDisplay from '@/components/UserDisplay'
 import * as timeago from 'timeago.js'

 export default {
   name: "ChatBubble",
   props: ['message', 'room'],
   components: {
     UserDisplay
   },
   data() {
     return {
       allTheClasses: '',
       date: null,
       date_ago: null,
       styleObject: {}
     }
   },
   created() {
     if (this.message.created_date) {
       let d = new Date(this.message.created_date);
       this.date_ago = timeago.format(d);
       this.date = d.toLocaleString('de-DE');
     }
     window.setInterval(() => {
       let d = new Date(this.message.created_date);
       this.date_ago = timeago.format(d);
     }, 60000);

     this.styleObject.backgroundColor = this.getUserColor(this.message.user);
     this.assignClasses();
   },
   methods: {
     getUserColor(user) {
       if (typeof user === 'string')  {
         if (user === this.$root.$data.user._id) {
           return this.$root.$data.user.colorCode;
         } else {
           const potUser =  this.$root.$data.otherPeople.filter(x => x._id === user);
           return (potUser.length == 1) ? potUser[0].colorCode : '#e5e5e5';
         }
       } else {
         return 'transparent';
       }
     },
     assignClasses() {
       if (this.message.bot == true) {
         this.allTheClasses = 'is-bot';
       } else if (Object.prototype.hasOwnProperty.call(this.message, 'user')) {
         if (this.message.user == null) {
           this.allTheClasses = 'is-gone';
         } else if ((this.message.user._id == this.$root.$data.user._id)
                    || (this.message.user == this.$root.$data.user._id)) {
           this.allTheClasses = 'is-me';
         } else {
           this.allTheClasses = 'is-user';
         }
       } else {
         this.allTheClasses = 'is-note';
       }
     }
   }
 }
</script>
