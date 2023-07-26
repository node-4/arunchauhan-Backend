const mongoose = require('mongoose');


const installerSchema = mongoose.Schema({
    name: {
        type: String 
    },
    image: {
        type: String, 
        default: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
    },
    email: {
        type: String, 
        required: false
    }, 
    otpSecret: {
        type: String, 
        require: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^[+]?[0-9]{10,13}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        }
      },
    password: {
        type: String, 
        require: false, 
    }, 
    orderAcceptance: {
        type: Boolean, 
        default: false
    }, 
    start: {
        Shours: {
            type: String, 
        }, 
        Smin: {
            type: String
        }, 
        SSec: {
            type: String
        }
    }, 
    endtime: {
        Ehours: {
            type: String 
        }, 
        Emin: {
            type: String
        }, 
        Esec: {
            type: String
        }
    }, 
    servies: [],
    location : {
        address: {
            type: String 
        }, 
        long: {
            type: Number,
            default: 0,
        }, 
        late: {
            type: Number, 
            default:0
        },
        Radius:{
            type:Number,
            default:0
        }
    }
})

module.exports = mongoose.model('insteller', installerSchema)