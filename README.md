# Call Me By Any Name

App for a theater experience!


## Development

For development you have to run two processes. First, adust the .env files in both **foyer** and **server** and then run each process. See the individual READMEs for more information.


## Production

We assume a production environment with docker-compose, take a look a the [docker-compose.yml](docker-compose.yml).

Just a few words on what's happening:

**Foyer** builds an image where all assets are served using NGINX, it exposes PORT 80 but we remap that again to 8080.

**Server** builds the socket.io server and has it listening to the given port. Feel free to also adjust the port it exposes (whatever is free on your server).

### Prepare first run

Clone this repository on your server. Adjust your NGINX config and prepare SSL certificates. (depends on your setup) and add DNS. I'm using two subdomains, one for **foyer** and one for **server**.

Copy and adjust the .env for the **foyer** `cp foyer/env.production.sample foyer/.env.production`. HOST should be the url that the **server** is reachable under via standard HTTP or HTTPS ports.

In the docker-compose.yml, adjust WS_SERVER_PORT for the **server** and, optionally, the exposed port (currently set to 3001).

Run `docker-compose up -d`. The first time it will build both images and that will take some time. Once it's done you can check the status with `docker ps`.

The **foyer** should now be available on the address you have configured!

Run `docker-compose down` to shut down the services.
