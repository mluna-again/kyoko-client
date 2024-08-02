FROM docker.io/node:22-alpine AS build

WORKDIR /app

ARG SERVER=http://localhost:4000
ARG WEBSOCKET=ws://localhost:4000/socket

COPY package*.json ./

ENV VITE_SERVER_URL=${SERVER}
ENV VITE_SERVER_SOCKET_URL=${WEBSOCKET}

RUN npm install

COPY . .

RUN npm run build

FROM docker.io/nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
