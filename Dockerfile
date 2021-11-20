FROM node:16-alpine
RUN apk update && apk upgrade && apk add ffmpeg git && rm -rf /var/cache/apk/*
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start
