<template>
  <li class="chat__message"
      :style="{textAlign: hasPosition}"
      :class="allTheClasses">
    <div class="chat__message-inner">
      <header v-if="message.user">
        <span>{{getUserName(message.user)}}</span>
        <span v-if="message.user.isMod"
              title="Moderator"
              aria-label="Moderator"> (🦮)</span>
      </header>
      <p class="chat__message-bubble" >
        <span>
          {{message.message}}
        </span>
      </p>
      <aside>
        <time datetime="this.message.created_date" :title="date">{{ date_ago }}</time>
      </aside>
    </div>
  </li>
</template>
<script>
 import * as timeago from 'timeago.js'

 export default {
   name: "ChatBubble",
   props: ['message'],
   data() {
     return {
       hasPosition: 'left',
       allTheClasses: '',
       date: null,
       date_ago: null
     }
   },
   created() {
     if (this.message.created_date) {
       let d = new Date(this.message.created_date);
       this.date_ago = timeago.format(d);
       this.date = d.toLocaleString('de-DE');
     }

     if (this.message.bot == true) {
       this.allTheClasses = 'is-bot';
       this.hasPosition = 'center';
     } else if (this.message.hasOwnProperty('user')) {
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
   },
   methods: {
     getUserName(user) {
       if (typeof user !== 'string') {
         return user.nickname;
       } else {
         if (this.$root.$data.otherPeople.length) {
           let userInfo = this.$root.$data.otherPeople.filter(x => x._id === user)
           if (userInfo.length) {
             return userInfo[0].nickname
           } else {
             return user
           }
         } else {
           return user
         }
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
 .is-gone .chat__message-bubble {
   background-color: #88b378;
 }

 .is-user .chat__message-bubble {
   background-color: #88b378;
 }

 .is-me .chat__message-bubble {
   background-color: cornflowerblue;
 }

 time {
   opacity: 0.5;
   font-size: 0.8em;
 }

</style>
