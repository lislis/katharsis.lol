<template>
  <div>
    <OutSideNav />
    <article>
      <header class="inner">
        <h1 class="index__title">Katharsis.lol</h1>
        <p class="index__claim">{{ $t('index.claim')}}</p>
      </header>
      <section class="inner">
        <div class="index__inner">
        <p class="">{{ $t('index.p1') }}</p>
        <p class="">{{ $t('index.p2') }}</p>
        <p class="">{{ $t('index.p3') }}</p>
        <p class="">{{ $t('index.p4') }}</p>
        <p class="">{{ $t('index.p5') }}</p>
        <p class="">{{ $t('index.haveFun') }}</p>
        <router-link :to="{ name: 'spectator'}"
                 class="btn">{{ $t('index.watch') }}</router-link>
        <router-link :to="{ name: 'intro'}"
                     class="btn">{{ $t('index.participate') }}</router-link>
        </div>
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
<style>

</style>
