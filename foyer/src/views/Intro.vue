<template>
  <div>
    <h1>Call me by any name</h1>

    <h4>Was ist dein Name?</h4>
    <form @submit.prevent="addUser">
      <div class="form-group row">
        <input type="text" class="" v-model="newUsername"
               placeholder="Dein Nutzername">
        <input type="submit" value="Eintreten" class="btn">
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    name: "Intro",
    created() {
      //debugger
    },
    data() {
      return {
        newUsername: ''
      }
    },
    methods: {
      addUser() {
        this.$root.$data.username = this.newUsername
        this.$router.push({path: '/room'})
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
