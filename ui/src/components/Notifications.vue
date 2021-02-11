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
