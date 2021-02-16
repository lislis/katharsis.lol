<template>
  <aside class="peoplelist">
    <div  class="peoplelist__dialog">
      <h4 class="dialog__header">{{$t('ui.chat.peopleList.mod')}}</h4>
      <ul class="peoplelist__list">
        <li v-for="p in mods"
            :key="p._id"><span class="peoplelist__color" :style="{backgroundColor: p.colorCode}"></span>{{p.nickname}}</li>
      </ul>
      <h4 class="dialog__header">{{$t('ui.chat.peopleList.backstage')}}</h4>
      <ul class="peoplelist__list">
        <li v-for="p in backstage"
            :key="p._id"><span class="peoplelist__color" :style="{backgroundColor: p.colorCode}"></span>{{p.nickname}}</li>
      </ul>
      <h4 class="dialog__header">{{$t('ui.chat.peopleList.stage')}}</h4>
      <ul class="peoplelist__list">
        <li v-for="p in stage"
            :key="p._id"><span class="peoplelist__color" :style="{backgroundColor: p.colorCode}"></span>{{p.nickname}}</li>
      </ul>
    </div>
  </aside>
</template>
<script>
 export default {
   name: "PeopleList",
   props: ['people'],
   computed: {
     mods() {
       return this.people.filter(x => x.isMod);
     },
     backstage() {
       return this.people.filter(x => x.hasPermission);
     },
     stage() {
       return this.people.filter(x => !x.hasPermission);
     }
   }
 }
</script>
