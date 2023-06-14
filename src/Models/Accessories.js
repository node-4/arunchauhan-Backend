const { model, Schema } = require('mongoose');

const accessoriesSchema = new Schema({

	accessoriesName: {
		type: String,
		required: true
	},

	accessoriesImg: {
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

module.exports = model('accessories', accessoriesSchema)