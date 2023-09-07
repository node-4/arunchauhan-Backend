const { model, Schema } = require('mongoose');

const productSchema = new Schema({
	Wishlistuser: {
		type: [Schema.Types.ObjectId],
		ref: "user"
	},
	productName: {
		type: String,
	},
	manufactuer: {
		type: String,
	},
	color: {
		type: String,
	},
	size_of_product: {
		type: String,
	},
	size_of_packaing: {
		type: String
	},
	features: [],
	weight_of_packaged_item: {
		type: String,
	},
	warrenty: {
		type: String,

	},
	price: {
		type: String,
	},
	descrption: {
		type: String
	},
	category_id: {
		type: Schema.Types.ObjectId,
		ref: "category"
	},
	brand: {
		type: Schema.Types.ObjectId,
		ref: "brand"
	},
	subCategory: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "subCatgory"
	},
	productImg: [{
		filename: {
			type: String,


		},
		filetype: {
			type: String,

		},
		filesize: {
			type: String,

		},
		url: {
			type: String,

		},
	}],
	status: {
		type: String,
		default: false
	},
	stock: {
		type: Number,
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