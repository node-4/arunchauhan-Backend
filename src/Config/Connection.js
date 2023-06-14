const mongoose = require('mongoose');

module.exports = () => {
	mongoose.connect(process.env.DATABASEURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then(() => {
			console.log("DataBase Connect")
		})
		.catch(error => console.log(error.message))
	mongoose.connection.on('connected', () => {
		console.log("Mongoose connected to mongodb...")
	})

	mongoose.connection.on('error', (err) => {
		console.log(err.message);
	})
	mongoose.connection.on('disconnected', (err) => {
		console.log("Mongoose connection is disconnected")
	})
}
