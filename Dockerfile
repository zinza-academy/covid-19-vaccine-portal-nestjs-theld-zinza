FROM node:18.18.0-alpine3.18

RUN mkdir /api
WORKDIR /api

RUN apk update && apk add yarn

COPY . .

RUN npm i -g @nestjs/cli
RUN yarn install

CMD ["yarn", "run", "start:dev"]
