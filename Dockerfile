FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env.docker .env

EXPOSE 3000

RUN sleep 60

CMD [ "npm", "run-script build" ]
CMD [ "npm", "start" ]
