FROM node:20-alpine3.19 AS build
RUN mkdir -p /app
WORKDIR /app
COPY . ./
RUN npm install && \
  npm run build

FROM node:20-alpine3.19 AS runtime
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install --production
COPY --from=build /app/dist /app/dist
RUN npm run build-exec
ENTRYPOINT ["node", "dist/vehicle-cli.js"]
# CMD ["--help"]