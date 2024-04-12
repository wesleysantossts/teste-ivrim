FROM node:alpine3.19 AS api

WORKDIR /api
COPY package*.json .
COPY .env ./
COPY prisma ./prisma

RUN npm install
COPY . .

EXPOSE 8080