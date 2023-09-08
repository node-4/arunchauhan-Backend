const { model, Schema } = require('mongoose');

const servicesSchema = new Schema({
	serviceName: {
		type: String,
		required: true
	},
	serviceImg: {
		type: String,
		default: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80"
	},
	serviceTypeId: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: "servicetype"
	},
	title: {
		type: String
	},
	price: {
		type: String,
	},
	discount: {
		type: String,
		default: 0
	},
	desc: {
		type: String
	},
	include: [],
	reting: {
		type: String
	},
	freeService: {
		type: String
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "category"
	},
	status: {
		type: String,
		default: false
	},
	subCategory: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "subCatgory"
	},
	sellerId: {
		type: Schema.Types.ObjectId,
		ref: "seller"
	}
},
	{
		timestamps: true
	})

module.exports = model("Services", servicesSchema)