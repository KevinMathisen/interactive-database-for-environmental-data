# Build stage
FROM node:20 as build-stage
WORKDIR /app
# Copy and install files into the container
COPY client/package*.json ./
RUN npm install
COPY client/. .
# Inject environment variable into .env
ARG VITE_POSTGREST_URL
RUN if [ -n "$VITE_POSTGREST_URL" ]; then echo "VITE_POSTGREST_URL=${VITE_POSTGREST_URL}" > ./.env; fi
# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
# Copy the build files to the nginx server
COPY --from=build-stage /app/build /usr/share/nginx/html
# Inject environment variable into nginx.conf
ARG SERVER_NAME=localhost
COPY server/nginx.conf.template /etc/nginx/nginx.conf.template
RUN envsubst '${SERVER_NAME}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
# Copy error pages
COPY server/404.html /usr/share/nginx/html
COPY server/500.html /usr/share/nginx/html
# Expose port 80 and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
