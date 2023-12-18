const express = require('express');
const http = require('http');
const logger = require('./logger');
const colors = require('colors')
const url = require('url')
const promBundle = require("express-prom-bundle");
var app = express();

const metricsMiddleware = promBundle({
  includeMethod: true, 
  includePath: true, 
  includeStatusCode: true, 
  includeUp: true,
  customLabels: {project_name: 'hello_world', project_type: 'test_metrics_labels'},
  promClient: {
      collectDefaultMetrics: {
      }
    }
});


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(metricsMiddleware);


app.get('/', (req, res) => {res.send('Hello World');})



function start(){
   logger.info(colors.cyan(`Server running on port ${colors.bold(`4040`)}`));
   http.createServer(app).listen(4040);
}

module.exports = 
{
  start: start
};


