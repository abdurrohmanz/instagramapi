const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	_id: mongoose.type,
	likes: Number,
	comments: Number,
	time: Date,
})

module.exports = mongoose.model('Post', postSchema);