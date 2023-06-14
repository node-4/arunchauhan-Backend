const { model, Schema } = require('mongoose');

const productSchema = new Schema({

	productName: {
		type: String,
		required: false
	},
	manufactuer: {
		type: String,
		required: false,
	},
	color: {
		type: String,
		required: false
	},
	size_of_product: {
		type: String,
		required: false
	},
	size_of_packaing: {
		required: false,
		type: String
	},
	features: [],
	weight_of_packaged_item: {
		type: String,
		required: false
	},
	warrenty: {
		type: String,
		required: false

	},
	price: {
		type: String,
		required: false,
	},
	descrption: {
		required: false,
		type: String
	},
	category_id: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: "category"
	},
	brand: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: "brand"
	},
	subCategory : {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "subCatgory"
	},
	productImg: [{
		filename: {
			type: String,
			required: false

		},
		filetype: {
			type: String,
			required: false
		},
		filesize: {
			type: String,
			required: false
		},
		url: {
			type: String,
			required: false
		},
	}],
	status: {
		type: String, 
		default: false
	},
	stock: {
		type:Number,
		default: 0 
	},
	sellerId: {
		type: Schema.Types.ObjectId,
		ref: "seller"
	}
},
	{
		timestamps: true
	})
module.exports = model("product", productSchema)