<template>
<li>
  <label><input type="checkbox" name="" id=""> {{ option.text }}</label>

  <div v-if="option.next && Object.keys(option.next).length">
    <CharacterQuestion :question="option.next" />
  </div>
</li>

</template>
<script>
import CharacterQuestion from '@/components/CharacterQuestion'

export default {
  name: "CharacterOption",
  components: { CharacterQuestion },
  props: ['option']

}
</script>
