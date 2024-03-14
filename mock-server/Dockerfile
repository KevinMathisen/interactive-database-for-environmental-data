FROM node:20
WORKDIR /app
COPY mock-server/package*.json ./
RUN npm install
COPY mock-server/. .
EXPOSE 3000

CMD ["npm", "start"]