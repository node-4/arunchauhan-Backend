const { model, Schema } = require('mongoose');

const CategorySchema = new Schema({

	category: {
		type: String,
		required: true
	},
	categoryImg: {
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

	},
	sellerId: {
		type: Schema.Types.ObjectId,
		ref: "seller"
	}

},
	{
		timestamp: true
	})

module.exports = model("category", CategorySchema)
