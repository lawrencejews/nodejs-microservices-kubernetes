import http from 'http';

import { CustomError, IErrorResponse, winstonLogger } from '@lawrencejews/marketplace-shared';
import { Application, json, Request, Response, NextFunction, urlencoded } from 'express';
import { Logger } from 'winston';
import cookieSession from 'cookie-session';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { config } from '@gateway/config';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'apiGatewayServer', 'debug');

export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware();
    this.startElasticSearch();
    this.errorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'MarketCookieSession',
        keys: [
          `${config.SECRET_KEY_ONE}`,
          `${config.SECRET_KEY_TWO}`
        ],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development' //update with value from config
        //sameSite: none
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(cors(
      {
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    ));
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
  }

  private routesMiddleware(): void {

  }

  private startElasticSearch(): void {

  }

  private errorHandler(app: Application): void {

    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.' });
      next();

    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.log('error', `GatewayService ${error.comingFrom}:`, error);
      if (error instanceof CustomError) { 
        res.status(error.statusCode).json(error.serializeError());
      };
      next();
    }); 
  }

  private async startServer(app: Application): Promise<void>{

    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.log('error', 'GatewayService startServer() error method', error);
    }

  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {

    try {
      log.info(`GatewayServer has started with process id ${process.pid}`);
      httpServer.listen(SERVER_PORT, () => {
        log.info(`GatewayServer running on port ${SERVER_PORT}`);
      });
    } catch (error) {
      log.log('error', 'GatewayService startServer() error method: ', error);
    }

  }
}