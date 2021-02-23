FROM alpine

RUN apk update && apk add --no-cache nmap && \
        echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
        echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
        apk update && \
        apk add --no-cache \
        chromium \
        harfbuzz \
        "freetype>2.8" \
        ttf-freefont \
        yarn \
        nss

WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json ./
COPY yarn.lock ./
#RUN yarn install

RUN yarn install --production=true

COPY . .

CMD [ "yarn", "start" ]
