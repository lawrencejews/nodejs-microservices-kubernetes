import { Application } from 'express';
import { authRoute } from './routes/auth';
import { verifyGatewayRequest } from '@lawrencejews/marketplace-shared';
 
const BASE_PATH = 'api/v1/auth';

export function appRoutes(app: Application): void {

  app.use(BASE_PATH, verifyGatewayRequest, authRoute());
  
}