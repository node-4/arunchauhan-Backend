const mongoose = require('mongoose');
const review = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    message: {
        type: String,
    },
    rating: {
        type: Number,
        default: 1
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('review', review);