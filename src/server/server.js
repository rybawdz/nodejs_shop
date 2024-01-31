const express = require('express');
const http = require('http');
const logger = require('./logger');
const colors = require('colors')
const session = require('express-session')
const url = require('url')
const promBundle = require("express-prom-bundle");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
var app = express();
const cors = require('cors')

const mongoString = "mongodb://euser:changesecret@mongo:27017/ecommerce"
const database = mongoose.connection;


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
app.use(cors())
app.use(express.json());
app.set('views', './views');
app.use(metricsMiddleware);
app.use(session({
  secret: 'Replace with your secret key',
  secure: false, // we don't use https
  maxAge: 1000 * 60 * 60, // 1 hour
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: mongoString
  })
}));

const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const userInfo = require('./routes/userinfo');
const userUpdate = require('./routes/userupdate.js');
const userDelete = require('./routes/userdelete');


function isAuthenticated (req, res, next) {
  if (req.session.user) next();
  else res.redirect('/');
}

app.get('/', (req, res) => {
  if(req.session.user){
    res.send('Hello ' + req.session.user);
    return
  }
  res.send('Hello World'); })
app.post('/api/v1/user', signup);
app.post('/api/v1/user/login', login);
app.get('/api/v1/user/logout', isAuthenticated, logout);
app.get('/api/v1/user/info', isAuthenticated, userInfo);
app.put('/api/v1/user/update', isAuthenticated, userUpdate);
app.delete('/api/v1/user/delete', isAuthenticated, userDelete);


function start() {
  logger.info(colors.cyan(`Server running on port ${colors.bold(`4040`)}`));
  http.createServer(app).listen(4040);
  dbconnect();

}

module.exports =
{
  start: start
};


