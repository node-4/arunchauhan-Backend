const { model, Schema } = require("mongoose");

const periodicService = new Schema({


  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,

  },
  realPrice: {
    type: Number,
    required: true
  },
  pickupCharge: {
    type: String,
  },
  time: {
    type: String,
    required: true
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

  }

},
  {
    timestamps: true
  })

//hello
module.exports = model('periodicService', periodicService)