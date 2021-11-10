<template>
<div class="charactersheet">
  <AppHeader :notifications="$root.$data.notifications" />
  <section class="centerstage">
    <h1 class="centerstage__title">{{ $t('character.title') }}</h1>

    <template v-if="$route.name == 'characterSheet'">
      <CharacterMeta />
    </template>
    <router-view v-else></router-view>
  </section>
</div>
</template>
<script>
import AppHeader from '@/components/AppHeader'
import CharacterMeta from '@/components/CharacterMeta'

export default {
  name: "CharacterSheet",
  components: { AppHeader, CharacterMeta },
  created() {
    //if (this.$root.$data.user.character) {
      //this.$router.push({ name: 'main' });
    //}
  }
}
</script>
