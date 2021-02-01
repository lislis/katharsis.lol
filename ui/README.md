# 🎭 Foyer

Frontend for chat and fun

## Development


`cp env.development.sample .env.development` and adjust

- `VUE_APP_WS_HOST` websocket host (default 'localhost')
- `VUE_APP_WS_PORT` websocket port (default 4000)
- `VUE_APP_API_HOST` web host (default 'localhost')
- `VUE_APP_API_PORT` web port (default 3000)
- `VUE_APP_LS_PREFIX` localstorage prefix (default "CMBAN_")

### Dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```


## Production

We assume a production setup with Docker and docker-compose. See the toplevel [README](../README.md) for more information.
