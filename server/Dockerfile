FROM node:12

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# RUN yarn install --production=true

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
