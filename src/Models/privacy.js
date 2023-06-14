const mongoose = require('mongoose');


const privacy = mongoose.Schema({
    privacy: {
        type: String, 
    }
})


module.exports = mongoose.model('privacy', privacy);