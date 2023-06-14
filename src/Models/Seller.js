const { model, Schema } = require('mongoose');

const sellerSchema = new Schema({

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
	},
	profile: {
		filename: {
			type: String,
			default: null
		},
		filetype: {
			type: String,
			default: null
		},
		filesize: {
			type: String,
			default: null
		},
		url: {
			type: String,
			default: null

		}
	}
},
	{
		timestamps: true
	})

module.exports = model('seller', sellerSchema)