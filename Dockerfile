FROM node:16-buster-slim
RUN apt update && apt upgrade -y && apt install ffmpeg git -y && rm -rf /var/lib/apt/lists/*
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start
