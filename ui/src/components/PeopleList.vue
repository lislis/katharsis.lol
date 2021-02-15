<template>
  <aside class="peoplelist">
    <div  class="peoplelist__dialog">
      <div class="dialog__header">
        <h4>{{$t('ui.chat.peopleList')}}</h4>
      </div>
      <ul class="peoplelist__list">
        <li v-for="p in people"
            :key="p._id"><UserDisplay :user="p" /></li>
      </ul>
    </div>
  </aside>
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
<style>
 .peoplelist {
   position: absolute;
   top: 1rem;
   right: 3rem;
 }
 .peoplelist__dialog {
   min-height: 20rem;
   min-width: 10rem;
   font-size: 1rem;
   font-family: Courier, monospace;
   background-color: white;
   border-radius: 4px;
   padding: 1rem;
   white-space: wrap;
 }
 .peoplelist__list {
   font-weight: 300;
   list-style: none;
   padding: 0;
   margin: 0;
 }
 .peoplelist__list li .is-you {
   color: var(--primary-color);
 }
 .peoplelist__button {
   border: none;
   background-color: var(--bg-footer);
   cursor: pointer;
   border-radius: 2px;
   margin-top: 2px;
   padding: 0.6em .5em .4em;
   transition: background-color 200ms ease-in-out;
 }

 .peoplelist__button:hover,
 .peoplelist__button:active,
 .peoplelist__button:focus {
   background-color: var(--bg-main);
 }

 .dialog__header h4 {
   font-weight: 600;
   margin: 0;
 }
</style>
