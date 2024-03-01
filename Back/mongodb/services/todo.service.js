const todo = require('../schemas/todo')

const getAll = async () => {
	try {
		return await todo.find()
	} catch (error) {
		console.error(error)
		return null
	}
}

const postOne = async ({
	id,
	title,
	description,
	status,
	date }) => {
	try {
		return await todo.create({
			id,
			title,
			description,
			status,
			date
		})
	} catch (error) {
		console.error(error)
		return null
	}
}

const deleteOne = async ({ id }) => {
	try {
		return await todo.findOneAndDelete({ id })
	} catch (error) {
		console.error(error)
		return null
	}
}

module.exports = { getAll, postOne, deleteOne }
