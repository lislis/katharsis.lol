<template>
  <li class="chat__message"
      :style="{textAlign: hasPosition}"
      :class="allTheClasses">
    <div class="chat__message-inner">
      <header v-if="message.user">
        <UserDisplay :user="message.user" />
      </header>
      <p class="chat__message-bubble" :style="styleObject" v-html="message.message">

      </p>
      <aside>
        <time datetime="this.message.created_date" :title="date">{{ date_ago }}</time>
      </aside>
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
       hasPosition: 'left',
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
           return (potUser.length == 1) ? potUser[0].colorCode : '#ffffff';
         }
       } else {
         return 'transparent';
       }
     },
     assignClasses() {
       if (this.message.bot == true) {
         this.allTheClasses = 'is-bot';
         this.hasPosition = 'center';
       } else if (Object.prototype.hasOwnProperty.call(this.message, 'user')) {
         if (this.message.user == null) {
           this.allTheClasses = 'is-gone';
           this.hasPosition = 'left';
         } else if ((this.message.user._id == this.$root.$data.user._id)
                    || (this.message.user == this.$root.$data.user._id)) {
           this.allTheClasses = 'is-me';
           this.hasPosition = 'right';
         } else {
           this.allTheClasses = 'is-user';
           this.hasPosition = 'left';
         }
       } else {
         this.allTheClasses = 'is-note';
         this.hasPosition = 'center';
       }
     }
   }
 }
</script>
<style>

 .chat__message {
   margin: 0 1rem 1.5em 1rem;
 }
 .chat__message-inner {
   display: inline-block;
 }

 .chat__message-bubble {
   display: inline-block;
   padding: 1rem;
   margin: 0;
   border-radius: 4px;
 }

 .chat__status {
   margin-right: .3rem;
 }

 .no-bubble .chat__message-bubble {
   opacity: 0.7;
 }

 .is-note {
   opacity: 0.5;
 }

 .is-note .chat__message-bubble {
   padding: 0;
 }

 .is-gone {
   opacity: 0.5;
 }

 time {
   opacity: 0.5;
   font-size: 0.8em;
 }

</style>
