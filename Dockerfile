FROM node:10.15.3-alpine

WORKDIR /app/

RUN apk update && apk add --no-cache --virtual .build-tools \
        python \
        make \
        g++

COPY package.json package-lock.json /app/

RUN NODE_ENV=production npm ci \
    && apk del .build-tools

COPY api/ api/
COPY client/ client/
COPY database/ database/
COPY schemas/ schemas/
COPY server/ server/

CMD ["node", "-r", "esm", "server/"]
