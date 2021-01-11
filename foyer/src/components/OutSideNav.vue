<template>
  <nav class="nav inner">
    <router-link :to="{ name: 'index'}" class="nav__title">Katharsis.lol</router-link>
    <router-link :to="{ name: 'spectator'}">{{ $t('index.watch') }}</router-link>
    <router-link :to="{ name: 'intro'}">{{ $t('index.participate') }}</router-link>
  </nav>
</template>
<script>
 export default {
   name: "OutSideNav",
 }
</script>
