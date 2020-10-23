# foyer

Frontend for chat and fun

## Development

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

There is a Dockerfile available, building the project and serving it via NGINX. PORT 80 is exposed.

`cp env.production.sample .env.production` and adjust HOST and PORT

Build an image
`docker build -t lislis/foyer .`

and run it
`docker run -p 8080:80 -d lislis/foyer`
