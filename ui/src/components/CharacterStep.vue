<template>
<div>
  <h2>{{ question.text }}</h2>
  <ul v-if="question.options && Object.keys(question.options).length">

    <li v-for="o in Object.keys(question.options)" :key="o">
      <label>
        <input type="radio" :name="question.ident" :value="o" @click="choose(question.options[o])">
        {{ question.options[o].text }}</label>
    </li>
  </ul>

  <template v-if="choice">
    <router-link v-if="nextIdent" :to="{ name: 'charQuestion', params: { ident: nextIdent }}">Nächste Frage</router-link>
    <div v-else>
      create!
    </div>
  </template>

</div>
</template>
<script>
import { findNextIdent } from '@/lib/characterwalking.js'

export default {
  name: "CharacterStep",
  components: {
    //CharacterOption: () => import('@/components/CharacterOption.vue')
  },
  props: ['question'],
  data() {
    return {
      id: null,
      choice: null
    }
  },
  watch: {
    $route() {
      if (this.choice.next && Object.keys(this.choice.next).length) {
        return this.choice.next.ident;
      } else {
        return findNextIdent(this.question.ident, this.$root.$data);
      }
    }
  },
  methods: {
    choose(opt) {
      this.choice = opt
      let id = this.question.ident.length
      if (!this.$root.$data.characterProgress[id]) this.$root.$data.characterProgress[id] = []
      this.$root.$data.characterProgress[id].push({
        key: this.question.id,
        value: this.choice.id
      })
      console.log(this.$root.$data.characterProgress)
    }
  },
  computed: {
    nextIdent() {
      if (this.choice.next && Object.keys(this.choice.next).length) {
        return this.choice.next.ident;
      } else {
        return findNextIdent(this.question.ident, this.$root.$data);
      }
    }
  }
}
</script>
