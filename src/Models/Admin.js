const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');


const AdminSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}

}, {
	timestamps: true
})

module.exports = model('admin', AdminSchema)
