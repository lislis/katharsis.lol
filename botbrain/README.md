# 🤖🧠 BotBrain

Hello, this is botbrain 🤖🧠!

I'm a Node Express Server serving generated realness!

## For development


Have Node installed, and install dependencies with `yarn install`.
Copy and adjust the PORT in the .env file `cp env.sample .env`.
- `PORT` is the api port (default 3003)
- `HOST` is localhost on local development setup
- `MONGO_DB` name of the database
- `MONGO_PORT` port of MongoDB (default 27017)
- `MONGO_HOST` localhost on local development setup, db in the docker setup

Run the server with `yarn start`.

The MongoDB should be shared with `server` (meaning, copy values from `server/.env`), so that I can actually use live users!

## Production

The production setup is done via Docker and docker-compose. See the toplevel [README](../REadme.md) for more information.


## Scripts

You can use scripts in the `scripts` folder to import text fragments for the bot.
Put your data in the `scripts/data` folder as csv. Look at the existing column naming or adjust the scripts accordingly.

The scripts will read each line and make a post request to the corresponding api enddpoint.

eg

``` bash
# pwd botbrain/scripts/

# post to /api/direction
node import_directions.js

# post to /api/word
node import_words.js
```
