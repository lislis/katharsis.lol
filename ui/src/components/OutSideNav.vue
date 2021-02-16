<template>
  <nav class="outsidenav">
    <router-link :to="{ name: 'index'}"
                 class="outsidenav__logo"><Logo /></router-link>
    <router-link
      v-if="$route.name !== 'index'"
      :to="{ name: 'index'}"
      class="outsidenav__link btn btn--inverted btn--pill">{{ $t('ui.button.toIndex') }}</router-link>
  </nav>
</template>
<script>
 import Logo from '@/components/Logo';

 export default {
   name: "OutSideNav",
   components: { Logo }
 }
</script>
