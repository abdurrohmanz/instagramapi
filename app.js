const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const personRoutes = require('./routes/person');

var url = "mongodb://abdurrohmanz:abdurrohmanz@cluster0-shard-00-00-xb6tu.mongodb.net:27017,cluster0-shard-00-01-xb6tu.mongodb.net:27017,cluster0-shard-00-02-xb6tu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

mongoose.connect(url);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/person', personRoutes);

app.use((req, res, next)=>{
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;