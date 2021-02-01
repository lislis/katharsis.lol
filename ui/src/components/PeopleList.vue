<template>
  <div>
    <button type="button"
    @click="toggle">People</button>
    <div v-if="isOpen">
      <ul>
        <li v-for="p in people"
            :key="p._id"><UserDisplay :user="p" /></li>
      </ul>
    </div>
  </div>
</template>
<script>
 import UserDisplay from '@/components/UserDisplay'

 export default {
   name: "PeopleList",
   props: ['people'],
   components: {
     UserDisplay
   },
   data() {
     return {
       isOpen: false,
     }
   },
   created() {
     this.isOpen = false;
   },
   methods: {
     toggle() {
       this.isOpen = !this.isOpen;
     }
   }
 }
</script>
