<template>
  <div>
    <OutSideNav />
    <article class="index">
      <header class="inner">
        <h1 class="center-helper">{{ $t('legal.gdpr') }}</h1>
      </header>
      <section class="inner">
        <div class="index__overflow">
          <div v-html="$t('legal.gdprCopy')">
          </div>
          <div>
            <h2 id="data-hoster">{{ $t('legal.gdprFurther') }}</h2>
            <p v-if="gdprLink">
              <a
                :href="gdprLink"
                rel="noreferrer"
                target="_blank">{{ $t('legal.gpdrLink') }}</a>
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
