import 'express-async-errors';
import { winstonLogger } from '@lawrencejews/marketplace-shared';
import { Logger } from 'winston';
import { config } from "@notifications/config";
import { Application } from 'express';
import http from 'http';
import { healthRoutes } from '@notifications/rout';
import { checkConnection } from '@notifications/elasticsearch';
import { createConnection } from '@notifications/queues/connection';
import { Channel } from 'amqplib';
import { consumerAuthEmailMessages, consumerOrderEmailMessages } from '@notifications/queues/email.consumer';

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
  const emailChannel: Channel = await createConnection() as Channel;
  await consumerAuthEmailMessages(emailChannel);
  await consumerOrderEmailMessages(emailChannel);
}

function startElasticSearch(): void{
  checkConnection();
}

function startServer(app: Application): void{

  try { 
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notifications server has started`)
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notifications server running on port ${SERVER_PORT}`)
    })
  } catch(error) {
    log.log('error', 'notificationService startService() method', error);
  }

}