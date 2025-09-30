import { IAuthPayload, winstonLogger } from '@lawrencejews/marketplace-shared';
import { Logger } from 'winston';
import { config } from '@auth/config';
import { Application, Request, Response, NextFunction } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import { verify } from 'jsonwebtoken';

const SERVER_PORT = 4002;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authDatabaseServer', 'debug');

export function start(app: Application): void{
  

}

function securityMiddleware(app: Application): void{
  
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(

    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
    
  );

  // Check for the JWT Token
  app.use((req: Request, _res: Response, next: NextFunction) => {

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const payload: IAuthPayload = verify(token, config.JWT_TOKEN!) as IAuthPayload;
      req.currentUser = payload;
    }

    next();
    
  });
}