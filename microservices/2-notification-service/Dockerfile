FROM node:22-alpine3.20 AS builder

WORKDIR /app 
COPY package.json  ./
COPY tsconfig.json ./ 
COPY .nmprc ./ 
COPY src ./src 
RUN ls -a 
RUN npm install -g npm@latest 
RUN ci && npm run build 

FROM node:22-alpine3.20 

WORKDIR /app 
RUN apk add --no-cache curl 
COPY package.json  ./
COPY tsconfig.json ./ 
COPY .nmprc ./ 
RUN npm install -g pm2 npm@latest 
RUN npm ci --production
COPY --from=builder /app/build ./build

EXPOSE 4001 

CMD ["npm", "run", "start"]