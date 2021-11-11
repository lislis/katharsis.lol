<template>
<div class="charactertree">

  <CharacterStep v-if="currentQ" :question="currentQ" />

</div>
</template>
<script>

import CharacterStep from '@/components/CharacterStep'

export default {
  name: "CharacterTree",
  components: {
    //CharacterQuestion
    CharacterStep
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
    if (this.$route.params.ident.length > 1) {
      this.$router.replace({ name: 'characterSheet' })
    }
  },
  computed: {
    currentQ() {
      let ident = this.$route.params.ident;
      let tree = this.$root.$data.characterTree;

      let thisQ = null;

      if (ident.length == 1) {
        thisQ = tree[ident];
      } else if (ident.length == 3) {
        thisQ = tree[ident[0]].options[ident[1]].next;
      } else if (ident.length == 5) {
        //debugger // eslint-disable-line
        thisQ = tree[ident[0]].options[ident[1]].next.options[ident[3]].next;
      } else {
        thisQ = {}
      }
      return thisQ;
    }
  }
}
</script>
