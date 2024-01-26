const express = require('express');
const http = require('http');
const logger = require('./logger');
const colors = require('colors')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');
const url = require('url')
const promBundle = require("express-prom-bundle");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const uuid = require('uuid'); 
var app = express();
const mongoString = "mongodb://euser:changesecret@mongo:27017/ecommerce"
const database = mongoose.connection;
const MongoStore = require('connect-mongo');


function dbconnect() {
  mongoose.connect(mongoString);
  database.on('error', (error) => {
    console.log(error)
  })

  database.once('connected', () => {
    console.log('Database Connected');
  })
}

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'hello_world', project_type: 'test_metrics_labels' },
  promClient: {
    collectDefaultMetrics: {
    }
  }
});

app.use(express.json());
app.set('views', './views');
app.use(metricsMiddleware);
app.use(session({
  name: uuidv4(),
  secret: 'Replace with your secret key',
  httpOnly: true,
  secure: false, // we don't use https
  maxAge: 1000 * 60 * 60, // 1 hour
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: mongoString
  })
}));

const login = require('./routes/login');
//const logout = require('./routes/logout');
const signup = require('./routes/signup');
const userInfo = require('./routes/userinfo');
const userUpdate = require('./routes/userupdate.js');
const userDelete = require('./routes/userdelete');




app.get('/', (req, res) => { res.send('Hello World'); })
app.post('/api/v1/user', signup);
app.post('/api/v1/user/login', login);
app.post('/api/v1/user/logout', logout);
/*app.get('/api/v1/user/:id', userInfo());
app.put('/api/v1/user/:id', userUpdate());
app.delete('/api/v1/user/:id', userDelete());
*/

app.use(session({
  name: (req) => {
    return uuid()
  },
  secret: 'Replace with your secret key',
  httpOnly: true,
  secure: false, // not using https
  maxAge: 1000 * 60 * 60, // 1 hour
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: mongoString
  })
}));

function start() {
  logger.info(colors.cyan(`Server running on port ${colors.bold(`4040`)}`));
  http.createServer(app).listen(4040);
  dbconnect();

}

module.exports =
{
  start: start
};


