#!/bin/bash
cd "$(dirname "$0")"/..
rm -dfr build
mkdir -p build

yarn install
yarn build

cat <<EOF > build/localhost.conf
server {
    listen 8080;
    server_name localhost;
    root /usr/share/nginx/html;

    gzip_static on;

    #location / {
    #    # Set path
    #    
    #    try_files $uri /index.html =404;
    #}
}
EOF

cat <<EOF > build/tourney.aback.es.conf
server {
    listen 80;
    server_name tourney.aback.es;
    root /usr/share/nginx/html;

    gzip_static on;

    #location / {
    #  try_files $uri $uri/ /index.html;
    #}

    # Attempt to load static files, if not found route to @rootfiles
    #location ~ (.+)\.(html|json|txt|js|css|jpg|jpeg|gif|png|svg|ico|eot|otf|woff|woff2|ttf)$ {
    #  try_files $uri @rootfiles =404;
    #}

    # Check for app route "directories" in the request uri and strip "directories"
    # from request, loading paths relative to root.
    #location @rootfiles {
    #  rewrite ^/(?:foo/bar/baz|foo/bar|foo|tacos)/(.*) /$1 redirect;
    #}
}
EOF

cat <<EOF > build/Dockerfile-ui
FROM nginx:1.13.6
COPY build /usr/share/nginx/html
# COPY build/tourney.aback.es.conf /etc/nginx/conf.d/tourney.aback.es.conf
COPY build/localhost.conf /etc/nginx/conf.d/localhost.conf
EOF

TAG=$(git rev-parse --short HEAD)
docker build -t andrewbackes/tourney-ui:${TAG} -f build/Dockerfile-ui .