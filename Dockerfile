FROM node:slim AS build

WORKDIR /opt/trincachallenge2/

COPY . .

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "start:test"]