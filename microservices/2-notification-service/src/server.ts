import 'express-async-errors';
import { winstonLogger } from '@lawrencejews/marketplace-shared';
import { Logger } from 'winston';
import { config } from "@notification/config";
import { Application } from 'express';
import http from 'http';
import { healthRoutes } from '@notification/rout';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startServer(app);
  // http://localhost:4001/notification-rout
  app.use('', healthRoutes)
  
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void>{

}

function startElasticSearch(): void{
  
}

function startServer(app: Application): void{

  try { 
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notification server has started`)
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification server running on port ${SERVER_PORT}`)
    })
  } catch(error) {
    log.log('error', 'notificationService startService() method', error);
  }

}