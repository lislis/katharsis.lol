<template>
  <div class="notifications" v-if="notifications.length">
    <div v-for="(note, id) in notifications" :key="id"  class="note">
      <p>{{note}}</p>
      <button @click.prevent="removeNotification(id)"
              type="button"
              class="btn"
              :aria-label="$t('ui.button.close')">{{ $t('ui.button.accept') }}</button></div>
  </div>
</template>
<script>
 import { removeByIndex } from '@/lib/utils'
  export default {
    name: 'Notifications',
    props: ['notifications'],
    methods: {
      removeNotification(ev, id) {
        removeByIndex(this.$root.$data.notifications, id)
      }
    }
  }
</script>
<style scoped>
 .notifications {
   text-align: center;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(100, 100, 100, 0.8);
   z-index: 10;

 }
 .note {
   padding: 1em;
   position: absolute;
   background-color: white;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: white;
   border-radius: 4px;
 }
</style>
