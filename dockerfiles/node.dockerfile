FROM node:21-alpine
USER node
CMD npm install
CMD npm install -g node-gyp
CMD CXX=g++-12 npm install argon2
