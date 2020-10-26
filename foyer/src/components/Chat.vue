<template>
  <div id="chat">
    <div>
      <p v-for="user in info" :key="user.username">
        {{user.username}} {{user.type}}
      </p>
    </div>

    <h2 >{{username}}</h2>
    <div v-if="ready">
      <div>
        <h4>Foyer chat <span>{{connections}} online</span></h4>
      </div>
      <ul class="list-group list-group-flush text-right">
        <small v-if="typing" class="text-white">{{typing}} is typing</small>
        <li class="list-group-item" v-for="message in messages" :key="message.message">
          <span :class="{'float-left':message.type === 1}">
            {{message.message}}
            <small>:{{message.user}}</small>
          </span>
        </li>
      </ul>

      <div class="card-body">
        <form @submit.prevent="send">
          <div class="form-group">
            <input type="text" class="form-control" v-model="newMessage"
                   placeholder="Enter message here">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

 export default {
   name: 'Chat',
   props: ['messages', 'username', 'ready', 'info', 'connections'],
   data() {
     return {
       newMessage: null,
       newUsername: null,
       typing: false
     }
   },
   created() {
     this.$emit('add-user', this.$root.$data.username)
   },
   methods: {
     send() {
       this.$emit('send-message', this.newMessage)
       this.newMessage = null
     }
   }
 }
</script>

<style>
 #chat {
   background-color: lightgrey;
   flex: 1 0 50vw
 }
</style>
