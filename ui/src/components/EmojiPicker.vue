<template>
  <div class="emojipicker">
    <button class="emojibtn"
            type="button"
            :title="$t('ui.chat.emojiPicker')"
            :aria-label="$t('ui.chat.emojiPicker')"
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
   margin-right: 0.3em;
   z-index: 1;
 }
 .dialog {
   position: absolute;
   bottom: 5.4rem;
   right: 0;
   min-height: 20rem;
   min-width: 20rem;

   background-color: white;
   border-radius: 4px;
   padding: 1rem;
   white-space: wrap;

   box-shadow: 0px 0px 5px var(--bg-shade)
 }
 .emojibtn {
   border: none;
   background-color: transparent;
   line-height: 1.7;
   font-size: 2rem;
   cursor: pointer;
   border-radius: 18px;
 }


 .emojibtn:hover,
 .emojibtn:active,
 .emojibtn:focus {
   background-color: var(--bg-shade);
   outline: none;
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
   background-color: var(--bg-shade);
 }

 .emoji-group {
   height: 20rem;
   overflow-y: scroll;
   scrollbar-width: none;
 }

 .emoji-group::-webkit-scrollbar{
   width: 0;
 }


 .groupnav {
   display: flex;
   justify-content: space-between;
   padding-bottom: 4px;
   margin-bottom: 4px;
   border-bottom: solid 2px var(--bg-footer);
 }

 .groupnav__item {
   padding: 5px;
   line-height: 1;
   border-radius: 4px;
   cursor: pointer;
 }

 .groupnav__item:hover,
 .groupnav__item:active,
 .groupnav__item:focus  {
   background-color: var(--bg-shade);
 }
</style>
