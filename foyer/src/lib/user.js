import axios from 'axios'
import { deleteUserFromStorage } from '@/lib/storage'

export function logout(ctx) {
    let self = ctx
    axios.delete(`${ctx.$root.$data.restServer}/api/user/${ctx.$root.$data.user._id}`)
        .then(response => {
            let chat = {}
            chat.room = ctx.$root.$data.mainRoom._id;
            chat.nickname = ctx.$root.$data.user._id
            chat.message = `${ctx.$root.$data.user.nickname} ist ausgetreten`

            axios.post(`${ctx.$root.$data.restServer}/api/chat`, chat)
                .then(response => {
                    self.$root.$data.socket.emit('save-message', {
                        ...chat,
                        created_date: new Date()
                    })
                    self.$root.$data.socket.emit('remove-user', self.$root.$data.user)

                    self.$root.$data.user = {}
                    deleteUserFromStorage()

                    self.$router.push({
                        name: 'index'
                    })
                })
                .catch(e => { console.log(e) })
        })
}
