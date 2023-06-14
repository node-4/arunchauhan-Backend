const mongoose = require('mongoose');


const terms = mongoose.Schema({
    terms: {
        type: String, 
    }
})


module.exports = mongoose.model('terms', terms);