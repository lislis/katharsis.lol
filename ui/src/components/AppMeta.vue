<template>
  <footer>
    <div class="inner">
      <p class="subtle-spacing">
        Katharsis.lol by <a href="http://www.sternapau.de/" target="_blank">sterna | pau</a>
        <small>(<a :href="versionLink" target="_blank">Version {{version}}</a>)</small>
        <a v-if="imprintLink"
           :href="imprintLink">{{ $t('legal.imprint') }}</a>
        <a href="#">{{ $t('legal.gdpa') }}</a>


        <select v-model="$i18n.locale">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
        </select>
      </p>

    </div>
  </footer>
</template>
<script>
 import { version, homepage } from '../../package.json'

 export default {
   name: 'AppMeta',
   computed: {
     version() {
       return version;
     },
     versionLink() {
       return `${homepage}/releases/tag/v${this.version}`
     }
   }
  }
</script>
