FROM node:14

RUN npm install -g @puppet/uikit

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "npm","start" ]