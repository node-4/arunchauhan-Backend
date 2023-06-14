const { model, Schema } = require('mongoose');

const brandSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	brandImg: {
		filename: {
			type: String,
			default: null
		},
		filesize: {
			type: String,
			default: null
		},
		filetype: {
			type: String,
			default: null
		},
		url: {
			type: String,
			required: null
		},

	}


},
	{
		timestamps: true
	})

module.exports = model('brand', brandSchema)