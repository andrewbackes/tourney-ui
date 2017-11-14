#!/bin/bash
cd "$(dirname "$0")"/..
rm -dfr build
mkdir -p build

yarn install
yarn build

cat <<EOF > build/Dockerfile-ui
FROM node
RUN yarn global add serve
COPY build /build
WORKDIR /
CMD ["serve", "-p", "80", "-s", "build"]
EOF

TAG=$(git rev-parse --short HEAD)
docker build -t andrewbackes/tourney-ui:${TAG} -f build/Dockerfile-ui .