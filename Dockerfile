FROM node:13.8.0-stretch

LABEL version="1.0"
LABEL description="This is an image for the Manifest - Front end"
LABEL maintainer "darshan.kodipalli@gmail.com"

WORKDIR /frontend
COPY . .
RUN npm install -g --silent
RUN npm install react-scripts@3.4.0 -g --silent
ENTRYPOINT ["npm","start"]