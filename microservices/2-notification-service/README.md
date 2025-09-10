### Notification Service 
The market-place application is built with `React`, `Typescript`, `Tailwindcss` for the Frontend and `NodeJS `for the backend
![Notification-Email-Service](notification-email.png)
#### Project Configurations
- Needed `.env` for RabbitMQ, Email-service, client-connection and development environment
```
ENABLE_APM=0 
NODE_ENV=development
CLIENT_URL=http://localhost:3300
RABBITMQ_ENDPOINT=amqp://USERNAME:PASSWORD@localhost:5672
SENDER_EMAIL=
SENDER_EMAIL_PASSWORD=
ELASTIC_SEARCH_URL=http://localhost:9200
ELASTIC_APM_SERVER_URL=http://localhost:8200
ELASTIC_APM_SECRET_TOKEN=
```
#### Email Testing
Ethereal is a fake SMTP service, mostly aimed at `Nodemailer` and `EmailEngine` users. It's a completely free anti-transactional email service where messages never get delivered. Instead, you can generate a vanity email account right from Nodemailer, send an email using that account just as you would with any other SMTP provider and finally preview the sent message here as no emails are actually delivered.`https://ethereal.email/`
RUN the notification-service with `docker compose up -d notifications`
#### Template Copies 
- If you installed the npm module shelljs and it doesn't work properly, you can install and use `fs-extra` instead -> `npm install fs-extra`

Note: If it requires that you install a type, then install it.

Next, Inside the `copyAssets.ts` file, you can use
```
import fs from 'fs-extra';
fs.copySync('src/emails', 'build/src/emails');
```
OR

```import * as fse from 'fs-extra';
fse.copySync('src/emails', 'build/src/emails');
```