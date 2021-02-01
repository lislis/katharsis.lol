<template>
  <div class="emojipicker">
    <button class="emojibtn"
            type="button"
            @click.prevent="toggleDisplay">😀</button>

    <div class="dialog" v-if="isopen">
      <div class="groupnav">
        <span v-for="group in emojiGroups"
              :key="group.group"
              @click="pickGroup(group)"
              class="groupnav__item">{{group.description}}</span>
      </div>
      <div v-for="group in emojiData"
           :key="group.group">
        <div class="emoji-group" v-if="activeGroup == group.group">
          <span v-for="(e, i) in group.emojiList"
                :key="i"
                v-html="e.unicode"
                class="emoji"
                @click="pickEmoji(e.unicode)"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import emojigroups from '../data/emojigroups.json';
 import emojidata from '../data/emoji.json';

 export default {
   name: "EmojiPicker",
   data() {
     return {
       isopen: false,
       activeGroup: 0
     }
   },
   methods: {
     toggleDisplay() {
       this.isopen = !this.isopen;
     },
     pickEmoji(evt) {
       this.$emit('pick-emoji', evt);
     },
     pickGroup(g) {
       this.activeGroup = g.group;
     }
   },
   computed: {
     emojiData() {
       return emojidata;
     },
     emojiGroups() {
       return emojigroups;
     }
   }
 }
</script>
<style scoped>
 .emojipicker {
   position: relative;
   z-index: 1;
 }
 .dialog {
   position: absolute;
   bottom: 3.4rem;
   right: 0;
   min-height: 20rem;
   width: 20rem;

   background-color: white;
   border-radius: 4px;
   padding: 1rem;
   white-space: wrap;
 }

 .emojibtn {
   border: none;
   background-color: transparent;
   line-height: 1.7;
   font-size: 1.5rem;
   cursor: pointer;
   border-radius: 2px;
   margin-top: 2px;
 }

 .emojibtn:hover,
 .emojibtn:active,
 .emojibtn:focus {
   background-color: lightgrey;
 }

 .emoji {
   display: inline-block;
   padding: 9px;
   transition: background 100ms ease-in-out;
   cursor: pointer;
   border-radius: 4px;
   line-height: 1;
 }

 .emoji:hover,
 .emoji:active,
 .emoji:focus {
   background-color: lightgrey;
 }

 .emoji-group {
   height: 20rem;
   overflow-y: scroll;
   scrollbar-width: none;
 }

 .groupnav {
   display: flex;
   justify-content: space-between;
   padding-bottom: 4px;
   margin-bottom: 4px;
   border-bottom: 1px solid lightgrey;
 }

 .groupnav__item {
   padding: 5px;
   line-height: 1;
   border-radius: 4px;
 }

 .groupnav__item:hover,
 .groupnav__item:active,
 .groupnav__item:focus  {
   background-color: lightgrey;
 }
</style>
