FROM node:22-alpine AS build

WORKDIR /app

ARG SERVER
ARG WEBSOCKET

COPY package*.json ./

ENV VITE_SERVER_URL=${SERVER}
ENV VITE_SERVER_SOCKET_URL=${WEBSOCKET}

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
