ARG APP_PORT

ARG NODE_ENV

FROM node:slim AS build

WORKDIR /opt/trincachallenge2/

COPY package*.json .

RUN npm install

COPY . .

RUN npm install

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:development"]

# CMD ["npm", "run", "start:${NODE_ENV}"]