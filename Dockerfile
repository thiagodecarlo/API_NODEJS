FROM node:18-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3300
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USER=postgresql
ENV DB_PASSWORD=123456
ENV DB_DATABASE=db_rural

CMD ["npm", "start"]
