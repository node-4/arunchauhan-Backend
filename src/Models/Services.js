const { model, Schema } = require('mongoose');

const servicesSchema = new Schema({
	serviceName: {
		type: String,
	},
	serviceImg: {
		type: String,
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
	},
	realPrice: {
		type: Number,
	},
	pickupCharge: {
		type: String,
	},
	time: {
		type: String,
	},
	ratings: {
		type: Number,
		default: 0,
	},

	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	periodicServiceImg: {
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
		}

	},
	serviceType: {
		type: String,
	},
},
	{
		timestamps: true
	})

module.exports = model("Services", servicesSchema)