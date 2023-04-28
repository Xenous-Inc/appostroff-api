FROM node:18-alpine as node_modules
WORKDIR /tmp/
COPY package.json ./
COPY prisma/ prisma/
RUN yarn install

FROM node:18-alpine as dist
WORKDIR /tmp/
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY package.json tsconfig.json tsconfig.build.json  ./
COPY src/ src/
RUN yarn run build

FROM node:18-alpine as runner
WORKDIR /usr/local/app
COPY --from=dist /tmp/dist ./dist
COPY --from=dist /tmp/node_modules ./node_modules
COPY package.json tsconfig.json tsconfig.build.json  ./

CMD [ "yarn", "run", "start:prod" ]
