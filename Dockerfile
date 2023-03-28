
FROM node:16-alpine as build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g && yarn install --production
WORKDIR /opt/app
COPY ./ .
RUN NODE_ENV=production yarn build
FROM node:16-alpine
RUN apk add --no-cache vips-dev

FROM node:16-alpine
RUN apk add supervisor openssh nginx --no-cache vips-dev bash
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules
ENV PATH /opt/node_modules/.bin:$PATH
COPY --from=build /opt/app ./
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx_default /etc/nginx/http.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container
EXPOSE 1456
EXPOSE 1337
ENTRYPOINT ["start-container"]
# CMD ["start-container"]
# CMD ["yarn", "start"]