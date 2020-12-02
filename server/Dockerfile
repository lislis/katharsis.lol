FROM node:12

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
#RUN yarn install

RUN yarn install --production=true

COPY . .

CMD [ "node", "server.js" ]
