<template>
<li class="chat__message"
    :class="messageClasses">
  <div class="chat__message-inner">
    <template v-if="room.locked">
      <div class="chat__message__user-inline"
           v-if="message.user" :style="{ 'backgroundColor': messageColor }">
        <strong>{{ messageName }}</strong>:
      </div>
      <p class="chat__message-bubble chat__message-bubble--inline"
         v-html="message.message"></p>
    </template>

    <template v-else>
      <header v-if="message.user">
        <strong>{{ messageName }}</strong>:
      </header>
      <p class="chat__message-bubble" :style="{ 'backgroundColor': messageColor }"
         v-html="message.message"></p>
      <aside>
        <time datetime="this.message.created_date"
              :title="date">{{ date_ago }}</time>
      </aside>
    </template>
  </div>
</li>
</template>
<script>
import * as timeago from 'timeago.js'

export default {
  name: "ChatBubble",
  props: ['message', 'room'],
  data() {
    return {
      date: null,
      date_ago: null,
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
  },
  computed: {
    messageOwner() {
      if (this.message.character) {
        if (this.message.character === this.$root.$data.user.character?._id) return this.$root.$data.user.character;
        return this.$root.$data.otherPeople.find(x => x.character._id === this.message.character);
      } else {
        return null;
      }
    },
    messageColor() {
      if (!this.messageOwner) return 'transparent';
      return this.messageOwner.character ? this.messageOwner.character.colorCode : this.messageOwner.colorCode;
    },
    messageName() {
      if (!this.messageOwner) return '';
      return this.messageOwner.character ? this.messageOwner.character.name : this.messageOwner.name;
    },
    messageClasses() {
      if (this.message.bot == true) {
        return 'is-bot';
      } else if (this.message.user || this.message.character) {
        if ((this.message.user == this.$root.$data.user._id)
            || (this.message.character == this.$root.$data.user.character?._id)) {
          return 'is-me';
        } else {
          return 'is-user';
        }
      } else {
        return  'is-note';
      }
    }
  }
}

</script>
