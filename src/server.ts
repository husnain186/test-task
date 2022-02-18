import app from './app';
import { initDB } from './config/database';
import logger from './util/logger';

/**
 * Start Express server.
 */
(async () => {
  try {
    await initDB();
  }
  catch (err) {
    logger.error(err);
    process.exit(1);
  }

  const server = app.listen(app.get('port'), () => {
    logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    logger.info('Press CTRL-C to stop');
  });
  server.timeout = 300000;
  return server;
})();
