const mongoose = require('mongoose');

const subCatgory = mongoose.Schema({
    image: {
        type: String , 
    }, 
    title: {
        type: String 
    }, 
    catgory: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "category", 
        require: true
    }, 
    sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "seller"
	}

})

module.exports = mongoose.model('subCatgory', subCatgory);


