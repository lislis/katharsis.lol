---
layout: default
title: Example docker-compose.yml
nav_exclude: false
---

# Example `docker-compose.yml`


``` yaml
version: '3'

services:
  db:
    image: mongo
    restart: unless-stopped
    volumes:
      - './data:/data/db'
    ports:
      - "27017:27017"
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "4000:4000"
      - "3000:3000"
    links:
      - db
  runner:
    build:
      context: ./runner
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "3006:3006"
  botbrain:
    build:
      context: ./botbrain
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "3003:3003"
    links:
      - db
  ui:
    build:
      context: ./ui
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "8080:80"
```

This corresponds to the following in-service configurations of a hypothetical **katharsis.lol** domain and subdomains.


** 🎭 UI** https://katharsis.lol

> Notice how WS_ (websocket) and API_HOST point to the same uri, we can distinguish between them via ports in the NGINX config.

``` bash
VUE_APP_WS_HOST=server.katharsis.lol
VUE_APP_API_HOST=server.katharsis.lol
VUE_APP_API_BOTBRAIN=botbrain.katharsis.lol

VUE_APP_LS_PREFIX="KLOL_"
VUE_APP_LINK_IMPRINT="http://example.org/impressum/"
VUE_APP_LINK_GDPR="https://example.org/data-protection"

```

**💁🏼 Server ** https://server.katharsis.lol

``` bash
WS_PORT=4000
PORT=3000
HOST="localhost"
MONGO_DB="KLOL_"
MONGO_PORT=27017
MONGO_HOST="db"
UI="https://katharsis.lol"
```

**🤖🧠 BotBrain** https://botbrain.katharsis.lol

``` bash
PORT=3003
HOST="localhost"
MONGO_DB="KLOL_"
MONGO_PORT=27017
MONGO_HOST="db"
```
