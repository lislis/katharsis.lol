'use strict'

let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)

const { floor } = require('mathjs')
const { newPlayer, updatePlayers } = require('./game')

// Constants
const PORT = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

http.listen(PORT, () => {
    console.log('Listening on port *: '+ PORT);
});

const gameState = {
    players: {}
}

io.on('connection', (socket) => {
    console.log('a player connected:', socket.id);
    socket.emit('connections', Object.keys(io.sockets.connected).length);

    setInterval(() => {
        updatePlayers(gameState)
        io.sockets.emit('state', gameState);
    }, 1000 / 60);

    socket.on('newPlayer', () => {
        gameState.players[socket.id] = newPlayer(gameState, socket.id)
    })

    socket.on('updatePlayerTarget', (data) => {
        if (gameState.players[socket.id]) {
            gameState.players[socket.id].target = {x: floor(data.clientX),
                                                   y: floor(data.clientY)}
        }
    });

    socket.on('disconnect', () => {
        console.log("A player disconnected");
        delete gameState.players[socket.id]
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        gameState.players[socket.id].name = data;
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });
});
