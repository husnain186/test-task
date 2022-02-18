import { createLogger, format, transports } from 'winston';

const { combine, errors, timestamp, colorize, printf } = format;
const { Console, File } = transports;

const logger = createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp(),
  ),
  transports: [
    new Console({
      format: combine(
        colorize(),
        printf(({ timestamp: ts, level, message, stack }) => `${ts} - ${level}: ${message}${stack && process.env.NODE_ENV !== 'production' ? '\n' + stack : ''}`),
      ),
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
    new File({
      filename: 'debug.log',
      format: printf(({ timestamp: ts, level, message, stack }) => `${ts} - ${level}: ${message}${stack ? '\n' + stack : ''}`),
      level: 'debug',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
