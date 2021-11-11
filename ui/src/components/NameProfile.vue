<template>
<div class="relative-wrapper">
  <div v-if="isOpen" class="popup" :style="{ backgroundColor: profile.colorCode }">
    {{ profile.bio }}
  </div>
  <div class="namehover"
       @click="popUp()"
       :style="{ backgroundColor: hasColor }">
    {{ profile.name }}
  </div>
</div>
</template>
<script>
export default {
  name: "NameProfile",
  props: ['profile'],
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    hasColor() {
      return this.isOpen ? this.profile.colorCode : '';
    }
  },
  methods: {
    popUp() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style scoped>
  .relative-wrapper {
  position: relative;
  display: inline-block;
  }
  .popup {
  position: absolute;
  padding: 1em;
  border-radius: 20px;
  width: 35em;
  bottom: 2em;
  margin: auto;
  z-index: 1;
  white-space: pre-wrap;
  }

  @media (min-width: 800px) {
  .popup {
  right: 0;
  }
  }

  .namehover {
  cursor: pointer
  }
  .namehover:hover,
  .namehover:active {
  font-weight: 600;
  }
</style>
