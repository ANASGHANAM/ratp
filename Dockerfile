# ---- Base Node ----
FROM node:16.14.2-alpine AS base
WORKDIR /ratp-technical-test
ENV NODE_ENVIRONMENT=production
COPY package.json yarn.lock ./
RUN apk add --no-cache --virtual .gyp \
  python3 \
  make \
  g++ \
  && YARN_CACHE_FOLDER=/dev/shm/yarn_cache yarn install --no-cache \
  && apk del .gyp

EXPOSE 3300

FROM base AS development
ENV NODE_ENVIRONMENT=development 
RUN YARN_CACHE_FOLDER=/dev/shm/yarn_cache yarn install --no-cache
CMD ["yarn", "watch-and-start"]

FROM development as test
COPY . .

FROM development as compile
COPY . .
RUN yarn compile

FROM base AS release
WORKDIR /ratp-technical-test-release
COPY --from=compile /ratp-technical-testlib/src ./src
COPY --from=base /ratp-technical-testnode_modules/ ./node_modules
ENTRYPOINT ["node", "./src/index.js"]

FROM development AS integration
COPY . .
USER node
CMD jest --config ./jest.config.int.js --verbose --runInBand
