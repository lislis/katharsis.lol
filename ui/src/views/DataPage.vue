<template>
  <div>
    <OutSideNav />
    <article>
      <header class="inner">
        <h1 class="index__title">{{ $t('legal.gdpr') }}</h1>
      </header>
      <section class="inner">
        <div class="index__inner">
          <div v-html="$t('legal.gdprCopy')">
          </div>
          <div>
            <h2 id="data-hoster">{{ $t('legal.gdprFurther') }}</h2>
            <p v-if="gdprLink">
              <a :href="gdprLink" target="_blank">{{ $t('legal.gpdrLink') }}</a>
            </p>
            <p v-else>{{ $t('legal.gpdrNoLink') }}</p>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
 import OutSideNav from '@/components/OutSideNav'

 export default {
   name: "DataPage",
   components: {
     OutSideNav
   },
   computed: {
     gdprLink() {
       return this.$root.$data.gdprLink;
     }
   }
 }
</script>
<style>

</style>
