<template>
  <div>
    <ul v-for="room in roomList" v-if="roomList.length > 0">
      <li>
        <h3><span v-if="room.main">👑</span> {{room.room_name}}</h3>
        <router-link
          :to="{name: 'room', params: { roomid: room._id}}">Ansehen</router-link>
      </li>
    </ul>
    <slot v-else></slot>
  </div>
</template>
<script>
 export default {
   name: "SmallRoomList",
   props: ["roomList"],
 }
</script>
<style>

</style>
