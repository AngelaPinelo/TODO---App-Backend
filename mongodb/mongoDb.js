const mongoose = require('mongoose')

const mongoDb = mongoose
	.connect(process.env.MONGO_DB)
	.then(() => console.log('Connected to atlas'))
	.catch((err) => console.log(`Error: ${err}`))

module.exports = mongoDb
