<template>
  <div>
    <h2>People List</h2>
    <ul v-for="p in people">
      <li>
        <h3>{{p.nickname}}</h3>
        <p>joined {{p.created_date}}</p>
        <button>Privaten Chat starten</button>
      </li>
    </ul>
  </div>
</template>

<script>
 import axios from 'axios'

 export default {
   name: 'PeopleList',
   data () {
     return {
       people: [],
       errors: []
     }
   },
   created () {
     axios.get(`http://${this.$root.$data.restServer}/api/user/`)
          .then(response => {
            //debugger
            this.people = response.data
          })
          .catch(e => { console.log(e) })

   },
   methods: {

   }
 }
</script>
