var express = require('express');
var dotenv = require('dotenv').config();
var todoController = require('./controllers/todoController');

var app = express();

// Setting up the template engne
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('./public'));

// Fire Controllers
todoController(app);

// Listen to a port
app.listen(3000, () => {
	console.log('Listening on PORT 3000');
});