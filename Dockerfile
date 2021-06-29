FROM node:16-alpine

WORKDIR /app
COPY . .
RUN yarn

FROM node:16-alpine
WORKDIR /app
COPY --from=0 /app .
