FROM node:alpine as builder

WORKDIR /app

COPY ./package*.json /

RUN npm ci
COPY . .
RUN npm test
RUN npm run build
RUN npm ci --production

FROM mhart/alpine-node:slim as app

WORKDIR /app

COPY --from=builder /app/build/src    ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY people.csv ./

RUN ls .
CMD ["node", "build/server.js", "people.csv"]
