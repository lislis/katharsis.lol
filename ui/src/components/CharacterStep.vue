<template>
<div>
  <h2>{{ question.text }}</h2>
  <template v-if="isInput">
    <label>
      <input type="text" @change="typeChoice" v-model="freeform"/>
      {{ inputLabel }}
    </label>
  </template>
  <template v-else>
    <ul v-if="question.options && Object.keys(question.options).length">

      <li v-for="o in Object.keys(question.options)" :key="o">
        <label>
          <input type="radio" :name="question.ident" :value="o" @click="choose(question.options[o])">
          {{ question.options[o].text }}

        </label>
      </li>
    </ul>
  </template>

  <div class="center-helper">
    <template v-if="didChoose">
      <router-link v-if="nextIdent"
                   :to="{ name: 'charQuestion', params: { ident: nextIdent }}"
                   class="btn btn-pill">{{ $t('character.questions.nextQuestion') }}</router-link>
      <div v-else>
        <router-link :to="{ name: 'characterSheet'}"
                     class="btn">{{ $t('character.questions.end') }}</router-link>
      </div>
    </template>
  </div>
</div>
</template>
<script>
import { findNextIdent } from '@/lib/characterwalking.js'

export default {
  name: 'CharacterStep',
  props: ['question'],
  data() {
    return {
      didChoose: false,
      choice: null,
      freeform: '',
    }
  },
  watch: {
    $route() {
      this.didChoose = false;
      this.freeform = '';
      this.getNextIdent();
    }
  },
  methods: {
    typeChoice() {
      this.didChoose = true;
      this.choice = this.question.options[Object.keys(this.question.options)[0]];
      let id = this.question.ident.length;
      if (!this.$root.$data.characterProgress[id]) this.$root.$data.characterProgress[id] = []
      if (this.$root.$data.characterProgress[id].length) {
        let prevSelection = this.$root.$data.characterProgress[id].findIndex(v => v.key == this.question.id)
        if (prevSelection !== -1) {
          this.$root.$data.characterProgress[id].splice(prevSelection, 1)
        }
      }
      this.$root.$data.characterProgress[id].push({
        key: this.question.id,
        value: this.freeform,
        ident: this.choice.ident,
        question: this.question.text,
        text: this.freeform,
        altText: this.choice.altText
      })


    },
    choose(opt) {
      this.didChoose = true;
      this.choice = opt
      let id = this.question.ident.length
      if (!this.$root.$data.characterProgress[id]) this.$root.$data.characterProgress[id] = []

      if (this.$root.$data.characterProgress[id].length) {
        let prevSelection = this.$root.$data.characterProgress[id].findIndex(v => v.key == this.question.id)
        if (prevSelection !== -1) {
          this.$root.$data.characterProgress[id].splice(prevSelection, 1)
        }
      }

      this.$root.$data.characterProgress[id].push({
        key: this.question.id,
        value: this.choice.id,
        ident: this.choice.ident,
        question: this.question.text,
        text: this.choice.text,
        altText: this.choice.altText
      })
    },
    getNextIdent() {
      if (this.choice.next && Object.keys(this.choice.next).length) {
        return this.choice.next.ident;
      } else {
        return findNextIdent(this.question.ident, this.$root.$data);
      }
    }
  },
  computed: {
    nextIdent() {
      return this.getNextIdent();
    },
    isInput() {
      return Object.keys(this.question.options).length == 1
    },
    inputLabel() {
      let text = this.question.options[Object.keys(this.question.options)[0]]
      if (text.text === 'FREITEXT') {
        return '';
      } else {
        let matches = [...text.text.matchAll(/#(.+?)#/g)];
        let label = text.text.replace(matches[0][0], '');
        return label;
      }
    }
  }
}
</script>
