FROM node:16.14.2-bullseye

RUN npm install

EXPOSE 8092

CMD [ "node", "index.js" ]