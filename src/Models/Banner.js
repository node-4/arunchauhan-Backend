const { model, Schema } = require("mongoose");

const bannerSchema = new Schema({

    title: {
        type: String
    }, 
    image: {
        type: String
    }
})

module.exports = model('banner', bannerSchema)

