<template>
  <p class="typing-indicator"
     v-if="room.typing">
    {{ $t('ui.form.thereIsTyping')}}
    <span class="typing-indicator__icon">⌨️</span>
  </p>
</template>
<script>
 export default {
   name: "TypingIndicator",
   props: ['room']
 }
</script>
<style scoped>
 .typing-indicator {
   position: absolute;
   top: -1.4rem;
   left: 1rem;
   opacity: 0.3;
   font-size: 0.8rem;
   margin: 0 0 0;
 }

 @keyframes jumping {
   0% {
     transform: translateY(-20%);
   }
   70% {
     transform: translateX(-20%);
   }
   90% {
     transform: translateY(20%);
   }
   100% {
     transform: translateY(20%);
   }
 }

 .typing-indicator__icon {
   display: inline-block;
   margin-left: 0.3rem;
   animation: jumping 500ms infinite alternate-reverse;
 }

</style>
