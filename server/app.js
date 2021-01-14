require('dotenv').config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const pino = require('pino');
const pinoHttp = require('pino-http')();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const room = require('./routes/room');
const chat = require('./routes/chat');
const user = require('./routes/user');
const script = require('./routes/script');

const Chat = require('./models/Chat.js');

const WS_PORT = process.env['WS_PORT'];
const MONGO_DB = process.env['MONGO_DB'];
//const MONGO_PORT = process.env['MONGO_PORT'];
const MONGO_HOST = process.env['MONGO_HOST'];

app.io = io;
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  mixin() {
    return { app: '[server]' }
  }
});

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
logger.info(`[mongodb] mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useUnifiedTopology: true })
        .then(() =>  logger.info('[mongodb] connection successful'))
        .catch((err) => logger.error(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(pinoHttp);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/room', room);
app.use('/api/user', user);
app.use('/api/chat', chat);
app.use('/api/script', script);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


// Socket IO
logger.info(`[socket.io] websocket listen on ${WS_PORT}`)
server.listen(WS_PORT);

app.io.on('connection', (socket) => {
  socket.on('save-message', (data) => {
    Chat.findById(data._id).populate('user').exec((err, chat) => {
      logger.info('[socket.io] new-message ', chat);
      io.emit('new-message', { message: chat });
    });
  });

  socket.on('save-room', (data) => {
    logger.info('[socket.io] new-room ', data);
    io.emit('new-room', { message: data });
  })

  socket.on('save-user', (data) => {
    logger.info('[socket.io] new-user ', data);
    io.emit('new-user', { message: data });
  })

  socket.on('remove-user', (data) => {
    logger.info('[socket.io] delete-user ', data);
    io.emit('delete-user', { message: data });
    io.emit('new-message', { message: data });
  })

  logger.info(`[socket.io] User connected socketID:${socket.id}`);
  io.emit('users-increment')

  socket.on('disconnect', () => {
    logger.info('[socket.io] User disconnected', socket.id);
    io.emit('users-decrement')
  });
});

module.exports = app;
