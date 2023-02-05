FROM node:16.19-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "run", "start:prod"]