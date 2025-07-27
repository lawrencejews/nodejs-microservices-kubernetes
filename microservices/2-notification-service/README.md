### Notification Service 
The market-place application is built with `React`, `Typescript`, `Tailwindcss` for the Frontend and `NodeJS `for the backend
![Notification-Email-Service](notification-email.png)
#### Project Configurations
- Needed `.env` for RabbitMQ, Email-service, client-connection and development environment
```
ENABLE_APM=0 
NODE_ENV=development
CLENT_URL=http://localhost:3300
RABBITMQ_ENDPOINT=amqp://USERNAME:PASSWORD@localhost:5672
SENDER_EMAIL=
SENDER_EMAIL_PASSWORD=
ELASTIC_SEARCH_URL=http://localhost:9200
ELASTIC_APM_SERVER_URL=http://localhost:8200
ELASTIC_APM_SECRET_TOKEN=
```