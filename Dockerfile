FROM node:lts-alpine3.15 as builder
ARG BACKEND_URL

WORKDIR /usr/src/app

RUN apk update && apk upgrade

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN cp ./src/assets/config-template.json ./src/assets/config.json
RUN sed -i 's/http:\/\//http:\/\/intensif03.ensicaen.fr:8080/' ./src/assets/config.json

RUN npm run build:prod

FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs

RUN apt update && apt upgrade -y

COPY --from=builder /usr/src/app/dist/passmoilgoss-ui/ ./


