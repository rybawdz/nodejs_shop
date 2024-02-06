const express = require('express');
const http = require('http');
const logger = require('./logger');
const colors = require('colors')
const session = require('express-session')
const url = require('url')
const promBundle = require("express-prom-bundle");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const multer = require('multer');

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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename); // Use the original file name
  },
});

const upload = multer({ storage });

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

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
  }));

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
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    // Other cookie options can be set here
  }
}));
app.use(express.static('uploads'))


const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const userInfo = require('./routes/userinfo');
const userUpdate = require('./routes/userupdate.js');
const userDelete = require('./routes/userdelete');
const product = require('./routes/product');
const productDelete = require('./routes/productdelete');
const productSearch = require('./routes/productsearch');
const productUpdate = require('./routes/productupdate');
const addOrder = require('./routes/addorder.js');
const userOrders = require('./routes/userorders.js');
const addBasket = require('./routes/addbasket.js');
const Basket = require('./routes/basket.js')
const clearBasket = require('./routes/clearbasket.js');
const basketRemove = require('./routes/basketremove.js');
const adminOrders = require ('./routes/adminorders.js');
const baskets = require('./routes/baskets.js');
const users = require('./routes/users.js');

function isAuthenticated (req, res, next) {
  if (req.session.user) 
  {
    next();
  }
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
app.post('/api/v1/product', upload.single('image'), product);
app.get('/api/v1/product/search', productSearch);
app.delete('/api/v1/product/delete', productDelete);
app.put('/api/v1/product/update', productUpdate);
app.post('/api/v1/buy', isAuthenticated, addOrder);
app.get('/api/v1/user/orders', isAuthenticated, userOrders);
app.post('/api/v1/product/basket', isAuthenticated, addBasket);
app.get('/api/v1/user/basket', isAuthenticated, Basket);
app.post('/api/v1/user/basketremove', isAuthenticated, basketRemove);
app.get('/api/v1/user/clearbasket', isAuthenticated, clearBasket);
app.get('/api/v1/admin/orders', isAuthenticated, adminOrders);
app.get('/api/v1/admin/users', isAuthenticated, users);
app.get('/api/v1/admin/baskets', isAuthenticated, baskets);




function start() {
  logger.info(colors.cyan(`Server running on port ${colors.bold(`4040`)}`));
  http.createServer(app).listen(4040);
  dbconnect();

}

module.exports =
{
  start: start
};

