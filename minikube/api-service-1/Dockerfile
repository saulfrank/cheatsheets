FROM node:13.6.0-buster-slim
WORKDIR /
RUN npm install pm2 -g
COPY package.json .
RUN npm install --production
COPY server.js .
COPY pm2.json .
EXPOSE 3000
#CMD node server.js
CMD [ "pm2-runtime", "start", "pm2.json" ]