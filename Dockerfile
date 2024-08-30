FROM node:16-alpine AS build-stage

WORKDIR /app

ARG VUE_APP_API_URL

ENV VUE_APP_API_URL=$VUE_APP_API_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]