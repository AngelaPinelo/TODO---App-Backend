const mongoose = require('mongoose')

const todo = mongoose.Schema({
	id: {
		type: String,
		require: true,
	},
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	status: {
		type: String,
		require: true,
	},
	date: {
		type: String,
		require: true,
	},
})

module.exports = mongoose.model('todo', todo)
