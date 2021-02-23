<template>
  <footer class="footer subtle-spacing monospace">
    <p class="subtle-spacing">
      <span>Katharsis.lol by
        <a href="http://www.sternapau.de/"
           rel="noreferrer"
           target="_blank">sterna | pau</a></span>
      <small>(
        <a :href="versionLink"
             rel="noreferrer"
             target="_blank"
           class="appmeta__version">Version {{version}}</a>)</small>
      <router-link :to="{ name: 'archive'}" class="">{{ $t('archive.title') }}</router-link>
    </p>
    <nav class="subtle-spacing">
      <a v-if="imprintLink"
         :href="imprintLink"
         rel="noreferrer"
         class="appmeta__imprint">{{ $t('legal.imprint') }}</a>
      <router-link :to="{ name: 'datapage'}" class="appmeta__gdpa">{{ $t('legal.gdpr') }}</router-link>
    </nav>
    <div>
      <label for="lang-switch" class="a11y-hidden">{{ $t('ui.form.langSwitch') }}</label>
      <select id="lang-switch" v-model="$i18n.locale">
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </select>
    </div>
  </footer>
</template>
<script>
 import { version, homepage } from '../../package.json'

 export default {
   name: 'AppMeta',
   created() {
     console.log(this.$i18n)
   },
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
