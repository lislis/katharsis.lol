# CallMeServer

Node Express + Websocket server

## For development

Have Node installed, and install dependencies with `yarn install`.
Run the server with `node server.js`.

## Production

There is a Dockerfile available, PORT 3000 is exposed.

Build an image
`docker build -t lislis/callmeserver .`

and run it
`docker run -p 49160:3000 -d lislis/callmeserver`
