FROM node:20-alpine3.20 AS build

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm install

COPY ./ ./

EXPOSE 8081

ENTRYPOINT ["npm", "run web"]