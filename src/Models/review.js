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
    rating: {
        type: Number, 
        default: 1
    }
})

module.exports = mongoose.model('review', review);