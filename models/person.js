const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	username: String,
	followers: Number
})

var Person = mongoose.model('Person', personSchema);

module.exports = Person;