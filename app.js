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
var port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Listening on PORT ${port}`);
});