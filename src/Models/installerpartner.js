const { model, Schema } = require("mongoose");

const installingpartnerSchema = new Schema({
    insteller: {
        type: Schema.Types.ObjectId,
        ref: "insteller",
    },
    businessName: {
        type: String
    },
    businessContactNumber: {
        type: String
    },
    businessEmail: {
        type: String,
    },
    activeGstNumber: {
        type: String
    },
    GstNumber: {
        type: Number
    },
    businessAddress: {
        type: String
    },
    panCardNumber: {
        type: Number
    },
    frontSidePanCard: {
        type: String
    },
    personalName: {
        type: String
    },
    personalemail: {
        type: String
    },
    personalNumber: {
        type: String
    },
    personaladdress: {
        type: String
    }
})

module.exports = model('instellingpartner', installingpartnerSchema)