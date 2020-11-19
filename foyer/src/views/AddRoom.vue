<template>
  <div>
      <h2>
        Add Room
        <router-link to="/roomlist">(RoomList)</router-link>
      </h2>
      <form @submit="onSubmit">
          <label>
            Enter Room Name
            <input id="room_name" v-model.trim="room.room_name">
          </label>
        <button type="submit">Save</button>
      </form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'AddRoom',
  data () {
    return {
      room: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/room`, this.room)
      .then(response => {
        this.$router.push({
          name: 'RoomList'
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
