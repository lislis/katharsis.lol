const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  mixin() {
    return { app: '[runner]' }
  }});

module.exports = { logger };
