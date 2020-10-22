<template>
  <div class="room1">
    <h2>Foyer</h2>
    <div class="" id="p5Canvas"></div>
    <div class="message d-flex justify-content-center">
      {{ message }}
    </div>
  </div>
</template>

<script>
 export default {
   name: 'Room1',
   props: ['players'],
   components: {
   },
   data() {
     return {
       message: "",
       sketch: undefined
     }
   },
   watch: {
     players(value) {
       this.sketch.setState(value)
     }
   },
   mounted() {
     this.sketch = require('@/components/FoyerSketch.js')
     const P5 = require('p5')
     new P5(this.sketch.main)
     this.sketch.setState(this.players)
     this.sketch.setMouseevent(this.mouseevent)
     //this.sketch.setDelegate(this.callbackOnP5);
   },
   methods: {
     callbackOnP5: function(timeStr) {
       this.message = timeStr;
     },
     mouseevent(evt) {
       if (evt.srcElement.localName == 'canvas') {
         this.$emit('update-player-target', evt)
       }

     }
   }
 }
</script>

<style>
 .room1 {
   background-color: darkgrey;
   flex: 1 0 50vw
 }
</style>
