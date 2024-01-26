FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node ./src/server/package.json ./



RUN npm install && \
    npm install -g node-gyp && \
    npm i nodemon -g && \ 
    CXX=g++-12 npm install argon2

USER node

