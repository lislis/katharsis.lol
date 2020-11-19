# Call Me By Any Name

App for a collaborative writing theater experience!


## Development

For development you have to run two processes and a database
Follow the [MongoDB installation instructions](https://docs.mongodb.com/manual/installation/) for a local setup of the database.
Then, adust the .env files in both **foyer** and **server** and run each process.
See the individual READMEs for more information.


## Production

We assume a production environment with docker-compose, take a look a the [docker-compose.yml](docker-compose.yml).

Just a few words on what is happening:

**UI / Foyer** builds an image where all assets are served using NGINX, it exposes PORT 80 but we remap that to 8080.

**Server** builds the socket.io and api server and talks to the database. Feel free to adjust the port it exposes (whatever is free on your server).

**DB** the MongoDB service for storing stuff. What databases do.

### Prepare first run

Clone this repository on your server. Adjust your NGINX config and prepare SSL certificates. (depends on your setup) and add DNS. I'm using two subdomains, one for **foyer** and one for **server**.

Copy and adjust the .env for the **foyer** `cp foyer/env.production.sample foyer/.env.production`.

- `VUE_APP_WS_HOST` url configured in your NGINX for socket traffic
- `VUE_APP_API_HOST` url configured in your NGINX for web traffic
- `VUE_APP_LS_PREFIX` app prefix for local storage

Copy and adjust the .env for **server** `cp server/env.sample server/.env`. The PORT and WS_PORT should match with what you will set in the docker-compose.yml and what you configured in your NGINX. The variables for MongoDB are prefixed MONGO_ and can be left as is.

In the docker-compose.yml adjust the exposed ports to free ports on you host.

Run `docker-compose up -d`. The first time it will build both images and pull the mongo image. That will take some time. Once it's done you can check the status with `docker ps`.

The **foyer** should now be available on the address you have configured!

Run `docker-compose down` to shut down the services.
