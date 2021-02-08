<template>
  <footer>
    <div class="inner">
      <p class="subtle-spacing">
        Katharsis.lol by <a href="http://www.sternapau.de/" target="_blank">sterna | pau</a>
        <small>(<a :href="versionLink" target="_blank" class="appmeta__version">Version {{version}}</a>)</small>
        <a v-if="imprintLink"
           :href="imprintLink"
           class="appmeta__imprint">{{ $t('legal.imprint') }}</a>
        <a href="#"
           class="appmeta__gdpa">{{ $t('legal.gdpa') }}</a>

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
     imprintLink() {
       return this.$root.$data.imprintLink;
     },
     versionLink() {
       return `${homepage}/releases/tag/v${this.version}`
     }
   }
  }
</script>
