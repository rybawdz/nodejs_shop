const winston = require('winston');

logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    defaultMeta: { service: 'node-shop' },
    transports: [
        new winston.transports.Console({ level: 'info' })
      ],
  });

module.exports = logger


/*
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}
*/