const { sub, mag, normalize } = require('./vectors')

function updatePlayer(p) {
    if (p.target) {
        let dist = sub(p.target, p)
        let norm = normalize(dist)

        p.x += norm.x * 1
        p.y += norm.y * 1

        if (mag(dist) <= 1) {
            p.target = null
        }
    }
}

function updatePlayers(state) {
    Object.keys(state.players).forEach((x, i) => {
        const player = state.players[x]
        updatePlayer(player)
    });
}

function newPlayer(state, id) {
    return {
        x: 250,
        y: 250,
        width: 25,
        height: 25,
        name: "undefined",
        id,
        target: null
    }
}

exports.updatePlayers = updatePlayers
exports.newPlayer = newPlayer
