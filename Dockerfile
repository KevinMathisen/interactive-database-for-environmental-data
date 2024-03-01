# Build stage
FROM node:20 as build-stage
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/. .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY server/404.html /etc/nginx/nginx.conf
COPY server/500.html /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]