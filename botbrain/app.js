require('dotenv').config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const pino = require('pino');
const pinoHttp = require('pino-http');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

const direction = require('./routes/direction');
const word = require('./routes/word');

const MONGO_DB = process.env['MONGO_DB']
//const MONGO_PORT = process.env['MONGO_PORT']
const MONGO_HOST = process.env['MONGO_HOST']

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
logger.info(`[mongodb] mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useUnifiedTopology: true })
      .then(() =>  logger.info('[mongodb] connection succesful'))
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

app.use('/api/direction', direction);
app.use('/api/word', word);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
