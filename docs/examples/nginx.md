---
layout: default
title: Example nginx config
nav_exclude: false
---

Assuming TSL certificates via [Let's Encrypt](https://letsencrypt.org/de/)/ [certbot](https://certbot.eff.org/).

Assuming standard ports.

``` nginx

server {
    listen 80;
    listen [::]:80;
    server_name katharsis.lol;

    location / {
        return 301 https://$server_name$request_uri;
    }

    location /.well-known {
        root /var/www/katharsislol;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name katharsis.lol;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/katharsis.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/katharsis.lol/privkey.pem;
    #include /etc/nginx/ssl.conf;

    client_max_body_size 10G;

    gzip on;
    gzip_proxied any;
    proxy_http_version 1.1;

    location / {
        proxy_pass http://localhost:8080;
        proxy_redirect off;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name server.katharsis.lol;

    location / {
        return 301 https://$server_name$request_uri;
    }

    location /.well-known {
        root /var/www/katharsislol;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name botbrain.katharsis.lol;

    location / {
        return 301 https://$server_name$request_uri;
    }

    location /.well-known {
        root /var/www/katharsislol;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name runner.katharsis.lol;

    location / {
        return 301 https://$server_name$request_uri;
    }

    location /.well-known {
        root /var/www/katharsislol;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name botbrain.katharsis.lol;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/katharsis.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/katharsis.lol/privkey.pem;
    #include /etc/nginx/ssl.conf;

    client_max_body_size 10G;

    location / {
        proxy_set_header X-Scheme $scheme;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
        proxy_pass http://localhost:3003;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name runner.katharsis.lol;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/katharsis.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/katharsis.lol/privkey.pem;

    client_max_body_size 10G;

    location /admin {
        auth_basic "Super secret admin area";
	auth_basic_user_file /etc/nginx/.htpasswd;

	proxy_pass http://localhost:3006;
    }

    location / {
        proxy_set_header X-Scheme $scheme;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
        proxy_pass http://localhost:3006;
    }
}


server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name server.katharsis.lol;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/katharsis.lol/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/katharsis.lol/privkey.pem;
    #include /etc/nginx/ssl.conf;

    client_max_body_size 10G;


    location ~* \.io {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy false;

        proxy_pass http://localhost:4000;
        proxy_redirect off;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location / {
        proxy_set_header X-Scheme $scheme;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
	    proxy_pass http://localhost:3000;
    }
}

```
