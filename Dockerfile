FROM node:alpine as base


WORKDIR /usr/app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . . 

EXPOSE 3000

CMD ["yarn", "dev"] 

FROM base as production

ENV NODE_PATH=./build

RUN yarn build