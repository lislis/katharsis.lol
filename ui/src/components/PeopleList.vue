<template>
  <aside class="peoplelist">
    <button type="button"
            class="peoplelist__button"
            :title="$t('ui.chat.peopleList')"
            :aria-label="$t('ui.chat.peopleList')"
            @click="toggle">👯</button>
    <div v-if="isOpen" class="peoplelist__dialog">
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
   position: relative;
   z-index: 1;
 }
 .peoplelist__dialog {
   position: absolute;
   top: 3rem;
   right: 0;
   min-height: 20rem;
   width: 20rem;

   background-color: white;
   border-radius: 4px;
   padding: 1rem;
   white-space: wrap;
 }
 .peoplelist__list {
   list-style: none;
   padding: 0;
   margin: 0;
 }
 .peoplelist__list li {
   padding: 0.4em 0.3em 0.2em 0.3em;
 }
 .peoplelist__list li .is-you {
   color: var(--bg-document);
 }
 .peoplelist__list li:nth-child(even) {
   background-color: var(--bg-footer);
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

 .dialog__header {
   border-bottom: solid 2px var(--bg-footer);
 }
 .dialog__header h4 {
   margin: 0;
 }
</style>
