FROM node:20-alpine3.19 AS build
COPY ./src/cli /app
WORKDIR /app
RUN npm install && \
  npm run build

FROM node:20-alpine3.19 AS runtime
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install --production

# FROM node:20-alpine3.19
# RUN mkdir -p /app
# WORKDIR /app
# COPY ./package-lock.json ./package.json ./
# RUN npm install --production
# COPY ./src/cli ./cli
# RUN npm run build