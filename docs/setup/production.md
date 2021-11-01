---
layout: default
title: Production Setup
nav_exclude: false
---

# Production setup

This document describes a production setup of Katharsis.lol.

For an architecture overview see []().
For a local development setup see []().

## Prerequisite

The production setup of Katharsis.lol makes use of Docker. Each service comes with its own Dockerfile, they are strung together with the Docker Compose.yml.

This guide assumes you have a host with [docker](https://docs.docker.com/engine/) and [docker-compose](https://docs.docker.com/compose/) installed and a webserver (we'll use [NGINX](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) here).

## Configuring and running

Copy the and rename the `docker-compose.yml.sample` to `docker-compose.yml`. You can adjust the exposed ports to what you need, this guide and the example configuration files will assume the default ports.

Copy and rename the `/ui/env.production.sample` to `/ui/.env.production`.

Copy and rename the `/server/env.sample` to `/server/.env`.

Copy and rename the `/botbrain/env.sample` to `/botbrain/.env`.

Copy and rename the `/runner/env.sample` to `/runner/.env`.

Copy and rename the `/runner/static/admin/env.txt.sample` to `/runner/static/admin/env.txt`.

When done with the configuration run `$ docker-compose up -d`. (Force a rebuild with `$ docker-compose up --build -d`).

You can check on the status of the containers using `$ docker ps`.

Shut down everything with `$ docker-compose down`.

Next, configure DNS and your webserver.

See an example  docker-compose.yml here []().
See an example of an NGINX configuration file here []().
