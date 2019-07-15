var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true});

// MongoDD Schema
var todoSchema = new mongoose.Schema({
	item: String
});

// MongoDB model
var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

	app.get('/todo', (req, res) => {
		// Get data from MongoDB and pass it to view
		Todo.find({}, (err, data) => {
			if (err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, (req, res) => {
		// Get data from the view/form and add to MongoDB
		var newTodo = Todo(req.body).save((err, data) => {
			if (err) throw err;
			res.json({todos: data});
		});
	});

	app.delete('/todo/:item', (req, res) => {
		// Delete requested item from MongoDB
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne((err, data) => {
			if (err) throw err;
			res.json({todos: data});
		});
	});
	
};