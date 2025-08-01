import { winstonLogger } from '@lawrencejews/marketplace-shared';
import { config } from "@notification/config";
import { Logger } from 'winston';
import express, { Express } from 'express'
import { start } from "@notification/server";

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationApp', 'debug');

function initialize(): void {
  const app: Express = express();
  start(app);
  log.info('Notification Service Initialized');
}

initialize();