
print('Start ###################################################################################################################################################################################################' );
var db = db.getSiblingDB('admin');
var authResult = db.auth('root', 'example');
db.createUser({
  user: 'euser',
  pwd: 'changesecret',
  roles: [
    { role: 'readWrite', db: 'ecommerce' }
  ]
});
db = db.getSiblingDB('ecommerce');


db.createCollection('users');
db.createCollection('products');
db.createCollection('invoices');
db.createCollection('reviews');
db.createCollection('receipts');
db.createCollection('orders');






