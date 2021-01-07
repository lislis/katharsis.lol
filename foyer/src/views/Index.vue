<template>
  <article>
    <header class="inner">
      <h1 class="index__title">Katharsis.lol</h1>
      <p class="index__claim">{{ $t('index.claim')}}</p>
      <p></p>
    </header>
    <section class="inner">
      <p class="">Lorem ipsum</p>
      <router-link :to="{ name: 'index'}"
      class="btn">{{ $t('index.participate') }}</router-link>
      <router-link :to="{ name: 'index'}"
      class="btn">{{ $t('index.watch') }}</router-link>
    </section>
    <section class="inner">
      <p class="">Lorem ipsum</p>
      <p class="">Lorem ipsum</p>
      <p class="">Lorem ipsum</p>
    </section>

  </article>
</template>
<script>
 import axios from 'axios'

  export default {
    name: "Index",
    //data() {},
    created() {},
    methods: {}
  }
</script>
