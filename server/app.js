require('dotenv').config()
const express = require('express');
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
const ticketcode = require('./routes/ticketcode');
const setting = require('./routes/setting');
const play = require('./routes/play');
const character = require('./routes/character');

const WS_PORT = process.env['WS_PORT'];
const MONGO_DB = process.env['MONGO_DB'];
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
app.use(bodyParser.json({ limit: '1mb'}));
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use('/api/room', room);
app.use('/api/user', user);
app.use('/api/chat', chat);
app.use('/api/script', script);
app.use('/api/ticketcode', ticketcode);
app.use('/api/setting', setting);
app.use('/api/play', play);
app.use('/api/character', character);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
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
  logger.info(`[socket.io] User connected socketID: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info('[socket.io] User disconnected', socket.id);
  });

  socket.on('is-typing', (data) => {
    io.emit('started-typing', data);
    logger.info('[socket.io] started typing', socket.id);
  });

  socket.on('is-not-typing', (data) => {
    io.emit('stopped-typing', data);
    logger.info('[socket.io] stopped typing', socket.id);
  });
});

module.exports = app;
