const mongoose = require('mongoose');

const feedback = mongoose.Schema({
    reting : {
        type: Number,
        default: 0, 
    },
    comment: {
        type: String,
    }
})


module.exports = mongoose.model('feedback', feedback);