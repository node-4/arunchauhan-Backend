const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
   // required: true,
  },

  product:[],
  quantity: {
    type:Number
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
      //required: true,
      },
      quantity: {
        type: Number,
        default:0,
       // required: true,
      },
      price: {
        type: Number,
        default:0,
       // required: true,
      },
    },
  ],

//   services: [
//     {
//       product: {
//         type: Schema.Types.ObjectId,
//         ref: "product",
//       //required: true,
//       },
//       quantity: {
//         type: Number,
//         default:0,
//        // required: true,
//       },
//       price: {
//         type: Number,
//         default:0,
//        // required: true,
//       },
//     },
//   ],

  shippingAddress: {
    address: {
      type: String,
      //required: true,
    },
    city: {
      type: String,
      //required: true,
    },
    postalCode: {
      type: String,
     // required: true,
    },
    country: {
      type: String,
      //required: true,
    },
  },
  paymentMethod: {
    type: String,
   // required: true,
  },
  paymentResult: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    update_time: {
      type: String,
    },
    email_address: {
      type: String,
    },
  },
  itemsPrice: {
    type: Number,
    //required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
  //  required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
   // required: true,
    default: 0.0,
  },
  totalPrice: {
    type:Number,
  ///  required: true,
  
  },
  isPaid: {
    type: Boolean,
  //  required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
  //  required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  grandTotal:{
    type:Number,
  },
  Status:{
    type:String
  },
}, {
  timestamps: true,
});

module.exports = model("Order", orderSchema);
