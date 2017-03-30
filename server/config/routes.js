var mongoose = require('mongoose');
var Users = require('./../controllers/users.js');
var Buckets = require('./../controllers/buckets.js');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.post('/sessions', Users.login);
	app.get('/users/:id', Users.find);
	app.get('/buckets', Buckets.index);
	app.post('/buckets', Buckets.create);
	app.get('/buckets/:id', Buckets.find);
  app.put('/buckets/:id', Buckets.update);
}
