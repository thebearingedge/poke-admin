FROM node:10.15.3-alpine AS base

WORKDIR /app/

RUN apk add --virtual .build-tools \
        python \
        make \
        g++

COPY package.json package-lock.json ./


FROM base AS dependencies

ENV CYPRESS_INSTALL_BINARY=0

RUN npm ci --only=production
RUN mv node_modules/ production_node_modules/
RUN npm ci


FROM dependencies AS build

COPY client/ client/
COPY schemas/ schemas/

RUN npm run build:client


FROM node:10.15.3-alpine as release

ENV NODE_ENV=production

COPY --from=dependencies /app/production_node_modules/ node_modules/
COPY --from=build /app/client/.next/ client/.next/
COPY --from=build /app/client/create-client.js/ client/create-client.js/
COPY api/ api/
COPY schemas/ schemas/
COPY database/ database/
COPY server/ server/

CMD ["node", "-r", "esm", "server/"]
