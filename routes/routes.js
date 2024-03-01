const routes = require('express').Router()

const { getAll, postOne, deleteOne } = require('../mongodb/services/todo.service')

routes.get('/version', (req, res) => {
	res.status(200).send("TODO App Back End")
})

routes.get('/getAll', async (req, res) => {
	const data = await getAll()
	res.status(200).send(data)
})

routes.post('/postOne', async (req, res) => {
	const form = req.body
	const data = await postOne(form)
	res.status(200).send(data)
})

routes.delete('/deleteOne', async (req, res) => {
	const form = req.body
	const data = await deleteOne(form)
	res.status(200).send(data)
})

module.exports = routes
