FROM node:13.13.0-stretch-slim AS build

WORKDIR /usr/src/app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn install --production

COPY . .
COPY prod/.env-prod ./.env

RUN yarn build

FROM nginx:1.17.10-alpine

#RUN adduser learngine --disabled-password
#USER learngine

COPY --from=build /usr/src/app/build /var/www
COPY prod/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]