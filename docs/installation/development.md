---
layout: default
title: Development Setup
nav_exclude: false
---

# Development setup

This document describes a local setup of Katharsis.lol for further development.

For an architecture overview see []().
For production and deployment setup see []().

## Prerequisite

There are four main components (or services) to Katharsis.lol.
All components make use of NodeJS or Node-based tooling and build tools. Node version >=12.11 is recommended.

Find out how to install Node on [nodejs.org](https://nodejs.org/en/).

I like to use [yarn](https://yarnpkg.com/) as package manager, but npm would work as well.

We use MongoDB as main database, find an [installation guide here](https://docs.mongodb.com/manual/installation/). I also recommend the [Compass App](https://www.mongodb.com/products/compass) for better insight into what's going on in the database while developing but that is totally optional.

## Configuring and running

### 🎭 UI

The 🎭 **UI** (in `/ui/`) builds the main user interface. It is build with VueJS (version 3) and uses the default vue-cli setup.

Copy and rename the `/ui/env.development.sample` to `/ui/.env.development`. You can adjust the values to your liking, the default values should work for the standard development setup.

Install dependencies with ```$ yarn install```.

Start the development server with ```$ yarn serve```. The default port is `8080`.


### 💁🏼 Server

The 💁🏼 **Server** (in `/server/`) contains the main business logic. It is build using the [Express framework](https://expressjs.com/) for its API, talks to MongoDB for general storage and uses [socket.io](https://socket.io/docs/v3/index.html) to push real time updates to the **UI**.

Copy and rename the `/server/env.sample` to `/server/.env`. You can adjust the values to your liking, the default values should work for the standard development setup.

Install dependencies with ```$ yarn install```.

Start the development server with ```$ yarn start```. The default port is `3000`.

To prettify the logging output you can install [`pino-pretty`](https://github.com/pinojs/pino-pretty) globally and then sttra the service like so `$ yarn start | pino-pretty`.


### 🤖🧠 BotBrain

The 🤖🧠 **BotBrain** (in `/botbrain/`) contains the bot logic. It is build using the [Express framework](https://expressjs.com/) for its API and talks to MongoDB for general storage.

See the [administration guide]() on how to feed the bot.

Copy and rename the `/botbrain/env.sample` to `/botbrain/.env`. You can adjust the values to your liking, the default values should work for the standard development setup.

Install dependencies with ```$ yarn install```.

Start the development server with ```$ yarn start```. The default port is `3003`.

To prettify the logging output you can install [`pino-pretty`](https://github.com/pinojs/pino-pretty) globally and then sttra the service like so `$ yarn start | pino-pretty`.


### 🏃 Runner (and 🎛️Admin)

The 🏃 **Runner** (in `/runner/`) contains the scheduling logic and hosts the administrative interface. It is build using the [Express framework](https://expressjs.com/) for its API.

See the [administration guide]() on how to run a schedule.
See the [administration guide]() on what can be configured in the admin interface.

Copy and rename the `/runner/env.sample` to `/runner/.env`. You can adjust the values to your liking, the default values should work for the standard development setup.

Copy and rename the `/runner/static/admin/env.txt.sample` to `/runner/static/admin/env.txt`. You can adjust the values to your liking, the default values should work for the standard development setup. This is for the 🎛️**Admin** interface exclusively.

Install dependencies with ```$ yarn install```.

Start the development server with ```$ yarn start```. The default port is `3006`.

To prettify the logging output you can install [`pino-pretty`](https://github.com/pinojs/pino-pretty) globally and then sttra the service like so `$ yarn start | pino-pretty`.

You can find 🎛️**Admin** under `localhost:3006/admin`.
