<template>
  <div>
    <OutSideNav />
    <article>
      <header class="inner">
        <h1 class="index__title">Katharsis.lol</h1>
        <p class="index__claim">{{ $t('index.claim')}}</p>
      </header>
      <section class="inner">
        <p class="">Lorem ipsum</p>
        <router-link :to="{ name: 'spectator'}"
                 class="btn">{{ $t('index.watch') }}</router-link>
        <router-link :to="{ name: 'intro'}"
                 class="btn">{{ $t('index.participate') }}</router-link>
      </section>
      <section class="inner">
        <p class="">Lorem ipsum</p>
        <p class="">Lorem ipsum</p>
        <p class="">Lorem ipsum</p>
      </section>

    </article>
  </div>
</template>
<script>
 import OutSideNav from '@/components/OutSideNav'

 export default {
   name: "Index",
   components: {
     OutSideNav
   }
 }
</script>
