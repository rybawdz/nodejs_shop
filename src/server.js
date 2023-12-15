const logger = require('./logger');
const client = require('prom-client')
const colors = require('colors')
startTime = Date.now()

function start(){
   logger.info(colors.cyan(`Server running on port ${colors.bold(`4040`)}`));

   var http = require("http");
   http.createServer(function (request, response) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('Hello World\n');
   }).listen(4040);

}

module.exports = 
{
  start: start
};


