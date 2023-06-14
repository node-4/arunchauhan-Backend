const { model, Schema } = require('mongoose');

const serviceTypeSchema = new Schema({

	serviceTypeName: {
		type: String,
		required: true
	},

},
	{
		timestamps: true
	})

module.exports = model('servicetype', serviceTypeSchema)