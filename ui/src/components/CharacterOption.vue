<template>
<li>
  <label><input type="checkbox" name="" id=""> {{ option.text }}</label>

  <!-- <div v-if="option.next && Object.keys(option.next).length"> -->
  <!--   <CharacterQuestion v-if="false" :question="option.next" /> -->

  <!--   <router-link :to="{ name: 'charQuestion', params: { ident: option.next.ident }}">Nächste Frage</router-link> -->
  <!-- </div> -->
</li>

</template>
<script>
//import CharacterQuestion from '@/components/CharacterQuestion'

export default {
  name: "CharacterOption",
  components: {
    //CharacterQuestion
  },
  props: ['option']

}
</script>
