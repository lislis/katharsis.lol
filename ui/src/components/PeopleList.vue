<template>
  <aside class="peoplelist">
    <div  class="peoplelist__dialog">
      <h3 class="dialog__header">{{$t('ui.chat.peopleList.mod')}}</h3>
      <ul class="peoplelist__list">
        <li v-for="p in mods"
            :key="p._id">
          <span class="peoplelist__color" :style="{backgroundColor: p.character?.colorCode}"></span>
          <NameProfile :profile="p.character" />
        </li>
      </ul>
      <h3 class="dialog__header">{{$t('ui.chat.peopleList.backstage')}}</h3>
      <ul class="peoplelist__list">
        <li v-for="p in backstage"
            :key="p._id">
          <span class="peoplelist__color" :style="{backgroundColor: p.character?.colorCode}"></span>
          <NameProfile :profile="p.character" />
        </li>
      </ul>
      <h3 class="dialog__header">{{$t('ui.chat.peopleList.stage')}}</h3>
      <ul class="peoplelist__list">
        <li v-for="p in stage"
            :key="p._id">
          <span class="peoplelist__color" :style="{backgroundColor: p.character?.colorCode}"></span>
          <NameProfile :profile="p.character" />
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
  import NameProfile from '@/components/NameProfile'

export default {
  name: "PeopleList",
  props: ['people'],
  components: { NameProfile },
   computed: {
     mods() {
       return this.people.filter(x => x.isMod);
     },
     backstage() {
       return this.people
         .filter(x => x.character?.user !== null)
         .filter(x => x.character?.hasPermission);
     },
     stage() {
       return this.people
         .filter(x => x.character?.user !== null)
         .filter(x => !x.character?.hasPermission);
     }
   }
 }
</script>
