const { model, Schema } = require('mongoose');

const accessoriesSchema = new Schema({

	accessoriesName: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: null
	},
}, { timestamps: true })

module.exports = model('accessories', accessoriesSchema)