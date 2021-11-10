<template>
<div>
  <h2>{{ question.text }}</h2>
  <ul v-if="question.options && Object.keys(question.options).length">

    <CharacterOption v-for="o in Object.keys(question.options)"
                     :key="o"
                     :option="question.options[o]" />
  </ul>
  <router-link :to="{ name: 'charQuestion', params: { ident: index }}">Nächste Frage</router-link>

</div>
</template>
<script>
//import CharacterOption from '@/components/CharacterOption'

export default {
  name: "CharacterQuestion",
  components: {
    //CharacterOption: () => import('@/components/CharacterOption.vue')
  },

  beforeCreate: function () {
  this.$options.components.CharacterOption = require('@/components/CharacterOption.vue').default
},
  props: ['question', 'index'],


}
</script>
