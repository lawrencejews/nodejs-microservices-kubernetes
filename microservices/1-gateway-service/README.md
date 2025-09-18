### Gateway Service 
The market-place application is built with `React`, `Typescript`, `Tailwindcss` for the Frontend and `NodeJS `for the backend
<!-- ![Notification-Email-Service](notification-email.png) -->
#### Project Configurations
- Needed `.env` for RabbitMQ, Email-service, client-connection and development environment
```
ENABLE_APM=0 
GATEWAY_JWT_TOKEN=
JWT_TOKEN=
NODE_ENV=development
SECRET_KEY_ONE=
SECRET_KEY_TWO=
CLIENT_URL=
AUTH_BASE_URL=http://localhost:4002
USERS_BASE_URL=http://localhost:4003
GIG_BASE_URL=http://localhost:4004
MESSAGE_BASE_URL=http://localhost:4005
ORDER_BASE_USRL=http://localhost:4006
REVIEW_BASE_URL=http://localhost:4007
REDIS_HOST=redis://localhost:6379
ELASTIC_SEARCH_URL=http://localhost:9200
ELASTIC_APM_SERVER_URL=http://localhost:8200
ELASTIC_APM_SECRET_TOKEN=
```
- `GLOBAL TOKEN` for all microservices connected to the `gateway service` -> linux creation from the terminal `date | md5`