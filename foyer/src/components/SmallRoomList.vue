<template>
  <div v-if="roomList.length > 0">
    <ul v-for="room in roomList" :key="room._id">
      <li>
        <h3><span v-if="room.main">👑</span> {{room.room_name}}</h3>
        <router-link
          :to="{name: 'room', params: { roomid: room._id}}">Ansehen</router-link>
      </li>
    </ul>
  </div>
  <slot v-else></slot>
</template>
<script>
 export default {
   name: "SmallRoomList",
   props: ["roomList"],
 }
</script>
<style>

</style>
