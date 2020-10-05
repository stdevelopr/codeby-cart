FROM node:14

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]