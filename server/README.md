# 💁🏼 Server

Node Express + Websocket server

## For development

Have Node installed, and install dependencies with `yarn install`.
Copy and adjust the PORT in the .env file `cp env.sample .env`.
- `WS_PORT` is the websocket port (default 4000)
- `PORT` is the api port (default 3000)
- `HOST` is localhost on local development setup
- `MONGO_DB` name of the database
- `MONGO_PORT` port of MongoDB (default 27017)
- `MONGO_HOST` localhost on local development setup, db in the docker setup

Run the server with `yarn start`.


## Production

We assume a production setup with Docker and docker-compose. See the toplevel [README](../REadme.md) for more information.
