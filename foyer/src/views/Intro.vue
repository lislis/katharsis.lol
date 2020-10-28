<template>
  <div>
    <h1>Call me by any name</h1>

    <h4>Was ist dein Name?</h4>
    <form @submit.prevent="onSubmit">
      <div class="form-group row">
        <input type="text" class="" v-model.trim="user.nickname"
               placeholder="Dein Nutzername">
        <input type="submit" value="Eintreten" class="btn">
      </div>
    </form>
  </div>
</template>
<script>
 import axios from 'axios'

  export default {
    name: "Intro",
    created() {},
    data() {
      return {
        user: {},
        errors: []
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.post(`http://${this.$root.$data.restServer}/api/user`, this.user)
           .then(response => {
             this.$root.$data.user = response.data
             //debugger
             this.$router.push({ name: 'room' })
           })
           .catch(e => {
             this.errors.push(e)
           })
      }
    }
  }
</script>
<style>
 .btn {
   display: inline-block;
   background-color: hotpink;
   color: black;
   padding: 0.5rem 1rem;
   text-decoration: none;
   border-radius: 4px;
 }
 .btn:hover,
 .btn:active {
   background-color: pink;
 }
</style>
